// src/utils/language.js
export function translateLanguage(lang) {
    if (!lang) return null;
    const map = {
        English: "Engelska",
        Swedish: "Svenska",
    };
    return map[lang] || lang;
}
