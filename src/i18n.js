
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


// import translationEN from './locales/english.json';
// import translationHI from './locales/hindi.json';
// import translationTE from './locales/telugu.json';
// import translationTA from './locales/tamil.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "english",
    resources: {
      english: {
        translation: {
          "hero": {
            "heading1": "Empowering India's youth with",
            "heading2": "Career Clarity & Mentorship",
            "description": "Connect with top industry mentors, explore diverse career paths, and plan your journey with AI-powered insights. Let’s shape a smarter, guided future — together.",
            "button": "Start My Journey",
            "join": "Join 50K+ Learners"
          },
          "stats": {
            "students": "Students Guided",
            "careers": "Career Paths",
            "success": "Success Rate"
          },
          "career": {
            "title": "Explore Career Paths",
            "engineer": "Engineer",
            "doctor": "Doctor",
            "designer": "Designer",
            "teacher": "Teacher",
            "ias": "IAS Officer",
            "lawyer": "Lawyer",
            "salary": {
              "engineer": "₹8L avg salary",
              "doctor": "₹12L avg salary",
              "designer": "₹6L avg salary",
              "teacher": "₹4L avg salary",
              "ias": "₹15L+ total package",
              "lawyer": "₹10L avg salary"
            }
          }
        }
      },
      hindi: {
        translation: {
          "hero": {
            "heading1": "करियर स्पष्टता और मार्गदर्शन के साथ",
            "heading2": "भारत के युवाओं को सशक्त बनाना",
            "description": "शीर्ष उद्योग सलाहकारों से जुड़ें, विविध करियर मार्गों का पता लगाएं और एआई-संचालित अंतर्दृष्टि के साथ अपनी यात्रा की योजना बनाएं। आइए मिलकर एक समझदार और मार्गदर्शित भविष्य बनाएं।",
            "button": "मेरी यात्रा शुरू करें",
            "join": "50K+ शिक्षार्थियों से जुड़ें"
          },
          "stats": {
            "students": "मार्गदर्शन प्राप्त छात्र",
            "careers": "करियर मार्ग",
            "success": "सफलता दर"
          },
          "career": {
            "title": "करियर मार्ग खोजें",
            "engineer": "इंजीनियर",
            "doctor": "डॉक्टर",
            "designer": "डिज़ाइनर",
            "teacher": "शिक्षक",
            "ias": "आईएएस अधिकारी",
            "lawyer": "वकील",
            "salary": {
              "engineer": "₹8L औसत वेतन",
              "doctor": "₹12L औसत वेतन",
              "designer": "₹6L औसत वेतन",
              "teacher": "₹4L औसत वेतन",
              "ias": "₹15L+ कुल पैकेज",
              "lawyer": "₹10L औसत वेतन"
            }
          }
        },
      },
      tamil: {
        translation: {
          "hero": {
            "heading1": "தொழில் தெளிவும் வழிகாட்டுதலுடனும்",
            "heading2": "இந்திய இளைஞர்களை வலுப்படுத்துதல்",
            "description": "சிறந்த தொழில் நுட்ப நிபுணர்களுடன் இணையுங்கள், பல்வேறு தொழில் பாதைகளை ஆராயுங்கள் மற்றும் AI சார்ந்த பார்வைகளுடன் உங்கள் பயணத்தை திட்டமிடுங்கள். நாம் ஒன்றாக ஒரு புத்திசாலியான எதிர்காலத்தை உருவாக்குவோம்.",
            "button": "என் பயணத்தை தொடங்கு",
            "join": "50K+ கற்றவர்கள் சேருங்கள்"
          },
          "stats": {
            "students": "வழிகாட்டப்பட்ட மாணவர்கள்",
            "careers": "தொழில் பாதைகள்",
            "success": "வெற்றி விகிதம்"
          },
          "career": {
            "title": "தொழில் பாதைகளை ஆராயுங்கள்",
            "engineer": "பொறியாளர்",
            "doctor": "மருத்துவர்",
            "designer": "வடிவமைப்பாளர்",
            "teacher": "ஆசிரியர்",
            "ias": "IAS அதிகாரி",
            "lawyer": "வழக்கறிஞர்",
            "salary": {
              "engineer": "₹8L சராசரி சம்பளம்",
              "doctor": "₹12L சராசரி சம்பளம்",
              "designer": "₹6L சராசரி சம்பளம்",
              "teacher": "₹4L சராசரி சம்பளம்",
              "ias": "₹15L+ மொத்த தொகுப்பு",
              "lawyer": "₹10L சராசரி சம்பளம்"
            }
          }
        },
      },
      telugu: {
        translation: {
          "hero": {
            "heading1": "కెరీర్ స్పష్టత మరియు మార్గదర్శకత్వంతో",
            "heading2": "భారత యువతను సాధికారత కల్పించడం",
            "description": "ప్రధాన పరిశ్రమ మెంటర్లతో కనెక్ట్ అవ్వండి, విభిన్న కెరీర్ మార్గాలను అన్వేషించండి, మరియు AI ఆధారిత అంతర్దృష్టులతో మీ ప్రయాణాన్ని ప్రణాళిక చేయండి. మనం కలిసి తెలివైన భవిష్యత్తును రూపుదిద్దుకుందాం.",
            "button": "నా ప్రయాణాన్ని ప్రారంభించండి",
            "join": "50K+ నేర్చుకునేవారితో చేరండి"
          },
          "stats": {
            "students": "విద్యార్థులు మార్గనిర్దేశం చేశారు",
            "careers": "కెరీర్ మార్గాలు",
            "success": "విజయ శాతం"
          },
          "career": {
            "title": "కెరీర్ మార్గాలను అన్వేషించండి",
            "engineer": "ఇంజనీర్",
            "doctor": "డాక్టర్",
            "designer": "డిజైనర్",
            "teacher": "గురువు",
            "ias": "IAS అధికారి",
            "lawyer": "న్యాయవాది",
            "salary": {
              "engineer": "₹8L సగటు జీతం",
              "doctor": "₹12L సగటు జీతం",
              "designer": "₹6L సగటు జీతం",
              "teacher": "₹4L సగటు జీతం",
              "ias": "₹15L+ మొత్తం ప్యాకేజ్",
              "lawyer": "₹10L సగటు జీతం"
            }
          }
        },
      },
    }
  });

export default i18n; 
