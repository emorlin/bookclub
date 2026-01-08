const LANGUAGE_MAP = {
    English: "Engelska",
    Swedish: "Svenska",
} as const;

type KnownLanguage = keyof typeof LANGUAGE_MAP;

/**
 * Översätter ett språknamn (på engelska) till svenska.
 * Om språket inte finns i mappen returneras originalvärdet.
 *
 * @param lang Språknamn (t.ex. "English", "Swedish") eller null/undefined
 * @returns Svensk översättning, originalvärdet eller null om lang saknas
 */

export function translateLanguage(lang?: string | null): string | null {
    if (!lang) return null;

    // Typ-säker kontroll: är lang en nyckel i mappen?
    if (lang in LANGUAGE_MAP) {
        return LANGUAGE_MAP[lang as KnownLanguage];
    }

    // Okänt språk: returnera som det kom in
    return lang;
}
