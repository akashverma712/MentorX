// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // 🌐 Navbar
          home: "Home",
          about: "About",
          contact: "Contact",
          dashboard: "Dashboard",
          login: "Log In",

          // 📞 Contact Page
          contact_title: "Get in Touch",
          contact_subtext:
            "We’d love to hear from you! Whether it’s a feature you’d like improved or something you didn’t like — just drop us a message.",
          phone_label: "Phone",
          email_label: "Email",
          name_placeholder: "Name*",
          email_placeholder: "Email*",
          message_placeholder: "Message (Tell us about your problem)",
          send_message: "Send Message",
          message_sent: "Message Sent!",
          error_toast: "Please fill out required fields.",
        },
      },
      hi: {
        translation: {
          // 🌐 Navbar
          home: "मुखपृष्ठ",
          about: "हमारे बारे में",
          contact: "संपर्क करें",
          dashboard: "डैशबोर्ड",
          login: "लॉग इन",

          // 📞 Contact Page
          contact_title: "संपर्क करें",
          contact_subtext:
            "हम आपसे सुनना पसंद करेंगे! चाहे वह कोई फीचर हो जिसे आप बेहतर बनाना चाहते हों या कोई भाग जो आपको पसंद नहीं आया — बस हमें संदेश भेजें।",
          phone_label: "फ़ोन",
          email_label: "ईमेल",
          name_placeholder: "नाम*",
          email_placeholder: "ईमेल*",
          message_placeholder: "संदेश (अपनी समस्या बताएं)",
          send_message: "संदेश भेजें",
          message_sent: "संदेश भेजा गया!",
          error_toast: "कृपया आवश्यक फ़ील्ड भरें।",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
