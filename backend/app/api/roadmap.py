import os
from quart import Blueprint, request, jsonify
import json
import re
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate

load_dotenv()

roadmap_blueprint = Blueprint("roadmap", __name__)


# ---------- Helper to clean LLM JSON wrappers ----------
def clean_llm_json(text: str) -> str:
	text = text.strip()
	text = re.sub(r"^```json\s*|\s*```$", "", text, flags=re.MULTILINE)
	return text.strip()


# ---------- Helper to fetch latest JSON file ----------
def get_latest_json_file(folder_path="json"):
	try:
		files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith(".json")]
		if not files:
			return None
		latest_file = max(files, key=os.path.getmtime)
		with open(latest_file, "r", encoding="utf-8") as f:
			return json.load(f)
	except Exception as e:
		print(f"Error reading latest JSON: {e}")
		return None


# ---------- Route: Generate Roadmap ----------
@roadmap_blueprint.route("/roadmap", methods=["POST"], endpoint="generate_roadmap")
async def generate_roadmap():
	
	
	try:
		data = await request.get_json()
	except Exception:
		return jsonify({"error": "Invalid JSON"}), 400

	# Extract data
	experience=data["experience"]
	education = data["education"]
	dreamjob = data.get("dreamjob", "")
	dreamcompany = data.get("dreamcompany", "")
	dreamsalary = data["dreamsalary"]

	# -------- Fetch latest aptitude result --------
	result = get_latest_json_file("json")
	if not result:
		return jsonify({"error": "No aptitude result JSON found in 'json/' folder"}), 404

	# Debug prints (for development)
	print("Experience:", experience)
	print("Education:", education)
	print("Dream Job:", dreamjob)
	print("Dream Company:", dreamcompany)
	print("Dream Salary:", dreamsalary)
	print("Result:", result)

	# -------- Create LLM prompt --------
	llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.6)

	roadmap_prompt = ChatPromptTemplate.from_template("""
	You are an expert career coach and technical mentor.

	Given the user's profile below, produce a practical, structured, and actionable roadmap to help them reach their target job role and desired salary.

	Input:
	- result: {result}
	- Experience: {experience}
	- Education: {education}
	- Dream Job: {dreamjob}
	- Dream Company: {dreamcompany}
	- Dream Salary: {dreamsalary}

	Produce ONLY valid JSON with this schema (no extra text):
	{{
	  "overview": "A 2-3 sentence high-level recommendation",
	  "roadmap": {{
		 "short_term": ["list of concrete tasks (0-6 months)"],
		 "mid_term": ["concrete tasks (6-24 months)"],
		 "long_term": ["concrete tasks (2-5 years)"]
	  }},
	  "milestones": [{{"name": "", "timeframe": "", "acceptance_criteria": ""}}],
	  "learning_plan": [{{"topic": "", "resources": ["..."], "weekly_hours": ""}}],
	  "job_search_strategy": {{"resume": "", "networking": "", "interviews": ""}},
	  "estimated_salary_progression": [{{"timeframe": "", "expected_salary": ""}}],
	  "notes": "Any special notes, risks, or tradeoffs"
	}}
	""")

	chain = LLMChain(llm=llm, prompt=roadmap_prompt)

	try:
		response = chain.invoke({
			"result": result,
			"education": education,
			"dreamjob": dreamjob,
			"dreamcompany": dreamcompany,
			"dreamsalary": str(dreamsalary),
			"experience": experience
		})

		raw_text = response.get("text") or ""
		clean_text = clean_llm_json(raw_text)
		roadmap = json.loads(clean_text)
		print("Generated Roadmap:", roadmap)

	except json.JSONDecodeError as e:
		return jsonify({
			"error": "Failed to parse roadmap JSON",
			"raw": raw_text,
			"parse_error": str(e)
		}), 500
	except Exception as e:
		return jsonify({"error": "LLM failed to generate roadmap", "detail": str(e)}), 500
    
	return jsonify({"roadmap": roadmap})
