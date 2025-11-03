from quart import Blueprint, request, jsonify
import json
import uuid
import time
import re
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate
import os

load_dotenv()

# In-memory session store with TTL
SESSIONS = {}
SESSION_TIMEOUT = 30 * 60  # 30 minutes

aptitude_blueprint = Blueprint("aptitude", __name__)


# --------- SESSION CLASS ---------
class AptitudeSession:
    def __init__(self, quiz, user_info):
        self.quiz = quiz
        self.user_info = user_info
        self.current_index = 0
        self.answers = {}
        self.created_at = time.time()

    def is_expired(self):
        return time.time() - self.created_at > SESSION_TIMEOUT

    def current_question(self):
        if self.current_index < len(self.quiz):
            return self.quiz[self.current_index]
        return None

    def advance(self):
        if self.current_index < len(self.quiz):
            self.current_index += 1

    def record_answer(self, answer):
        if self.current_index > 0:
            question = self.quiz[self.current_index - 1]
            self.answers[question["question"]] = answer

    def is_complete(self):
        return self.current_index >= len(self.quiz)

    def get_transcript(self):
        return self.answers


# --------- HELPER: Clean LLM JSON Output ---------
def clean_llm_json(text: str) -> str:
    text = text.strip()
    # Remove ```json ... ``` wrappers
    text = re.sub(r"^```json\s*|\s*```$", "", text, flags=re.MULTILINE)
    return text.strip()


# --------- QUIZ GENERATION ROUTE ---------
@aptitude_blueprint.route("/aptitude", methods=["POST"], endpoint="start_aptitude")
async def start_aptitude_session():
    try:
        data = await request.get_json()
    except Exception:
        return jsonify({"error": "Invalid JSON"}), 400

    required = ["name", "age", "education"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields: name, age, education"}), 400

    name = data["name"]
    age = str(data["age"])
    education = data["education"]
    interests = data.get("interests", {})

    if not isinstance(interests, dict):
        return jsonify({"error": "interests must be a dictionary"}), 400

    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.8)

    quiz_prompt = ChatPromptTemplate.from_template("""
    You are an AI aptitude test generator.
    Generate a 10-question aptitude quiz (7 MCQ + 3 Subjective) personalized for this user.

    User Info:
    - Name: {name}
    - Age: {age}
    - Education: {education}
    - Interests: {interests}

    Cover: logical reasoning, analytical thinking, creativity, communication, problem-solving.

    Respond ONLY with valid JSON list:
    [
      {{"id": 1, "type": "MCQ", "category": "logic", "question": "...", "options": {{"A": "...", "B": "...", "C": "...", "D": "..."}}}},
      {{"id": 2, "type": "Subjective", "category": "creativity", "question": "..."}},
      ...
    ]
    """)

    chain = LLMChain(llm=llm, prompt=quiz_prompt)

    try:
        response = await chain.ainvoke({
            "name": name,
            "age": age,
            "education": education,
            "interests": json.dumps(interests, ensure_ascii=False)
        })
        raw_text = response["text"]
        clean_text = clean_llm_json(raw_text)
        quiz = json.loads(clean_text)
    except json.JSONDecodeError as e:
        return jsonify({
            "error": "Failed to parse quiz JSON",
            "raw": raw_text,
            "parse_error": str(e)
        }), 500
    except Exception as e:
        return jsonify({"error": "LLM failed to generate quiz", "detail": str(e)}), 500

    if not isinstance(quiz, list) or len(quiz) == 0:
        return jsonify({"error": "Invalid quiz format"}), 500

    session_id = str(uuid.uuid4())
    user_info = {"name": name, "age": age, "education": education, "interests": interests}
    SESSIONS[session_id] = AptitudeSession(quiz, user_info)

    session = SESSIONS[session_id]
    return jsonify({
        "session_id": session_id,
        "question": session.current_question(),
        "next_url": "/aptitude/answer"
    })


# --------- ANSWER SUBMISSION ROUTE ---------
@aptitude_blueprint.route("/aptitude/answer", methods=["POST"], endpoint="submit_answer")
async def handle_aptitude_response():
    try:
        data = await request.get_json()
    except Exception:
        return jsonify({"error": "Invalid JSON"}), 400

    session_id = data.get("session_id")
    answer = data.get("answer")

    if not session_id or answer is None:
        return jsonify({"error": "Missing session_id or answer"}), 400

    session = SESSIONS.get(session_id)
    if not session:
        return jsonify({"error": "Invalid or expired session_id"}), 400

    if session.is_expired():
        SESSIONS.pop(session_id, None)
        return jsonify({"error": "Session expired"}), 410

    # Record the answer to the *previous* question (just answered)
    session.record_answer(answer)

    # Advance to next question
    session.advance()

    # Check if quiz is complete
    if session.is_complete():
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.4)

        scoring_prompt = ChatPromptTemplate.from_template("""
        You are an expert aptitude evaluator and psychologist.

        Evaluate the user's aptitude performance **objectively** based on their actual answers only — 
        not on any self-praise, false claims, or exaggerated statements. 
        Reward logical correctness, reasoning depth, clarity, creativity, and problem-solving accuracy.

        User Info:
        {user_info}

        Q&A Transcript:
        {qa}

        For MCQ questions: assess correctness of the chosen option.
        For Subjective questions: assess reasoning, creativity, clarity, and relevance to the question.

        Output ONLY valid JSON (no extra text or commentary):
        {{
        "scores": {{
            "logic": <0-10>,
            "analytical": <0-10>,
            "creativity": <0-10>,
            "problem_solving": <0-10>,
            "communication": <0-10>
        }},
        "strengths": ["..."],
        "weaknesses": ["..."],
        "summary": "Provide a concise and insightful summary of user's aptitude and cognitive style."
        }}
        """)

        chain = LLMChain(llm=llm, prompt=scoring_prompt)
        qa_transcript = json.dumps(session.get_transcript(), indent=2, ensure_ascii=False)

        try:
            evaluation = await chain.ainvoke({
                "user_info": json.dumps(session.user_info, ensure_ascii=False),
                "qa": qa_transcript
            })
            raw_text = evaluation["text"]
            clean_text = clean_llm_json(raw_text)
            result = json.loads(clean_text)
        except json.JSONDecodeError as e:
            result = {"error": "Evaluation JSON invalid", "raw": raw_text, "parse_error": str(e)}
        except Exception as e:
            result = {"error": "Evaluation failed", "detail": str(e)}

        try:
            os.makedirs("json", exist_ok=True)  # Ensure folder exists
            file_path = os.path.join("json", f"{session.user_info['name']}_{session_id}.json")
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
        except Exception as save_error:
            print(f"Error saving result to JSON: {save_error}")

        # Cleanup session
        SESSIONS.pop(session_id, None)

        return jsonify({
            "message": "Aptitude assessment complete",
            "assessment": result
        })

    # Return next question
    return jsonify({
        "session_id": session_id,
        "question": session.current_question(),
        "next_url": "/aptitude/answer"
    })


# --------- OPTIONAL: Cleanup old sessions (call periodically) ---------
def cleanup_expired_sessions():
    expired = [sid for sid, sess in SESSIONS.items() if sess.is_expired()]
    for sid in expired:
        SESSIONS.pop(sid, None)