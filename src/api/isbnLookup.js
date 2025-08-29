import { hcClient } from "./hcClient";

/**
 * Ta emot ett ISBN (10/13, med/utan bindestreck) och returnera bok som JSON (normaliserad).
 * Returnerar `null` om ingen träff. Loggar fel och returnerar `null` vid exception,
 */
export const getBookByIsbn = async (rawIsbn) => {
    try {
        const isbn = normalizeIsbn(rawIsbn);
        if (!isbn) return null;

        const query = `
      query EditionByIsbn($isbn: String!) {
        editions(
          where: {
            _or: [
              { isbn_13: { _eq: $isbn } }
              { isbn_10: { _eq: $isbn } }
            ]
          }
        ) {
          id
          title
          isbn_13
          isbn_10
          pages
          release_date
          physical_format
          language { language }
          reading_format { format }
          publisher { name }
          book {
            id
            title
            rating
            description
            contributions { author { name } }
          }
        }
      }
    `;

        const json = await hcClient.query(query, { isbn });

        const editions = json?.data?.editions ?? [];
        if (editions.length === 0) return null;

        // välj första eller förbättra matchning vid behov
        const e = editions[0];
        return normalizeEdition(e);
    } catch (error) {
        console.error(error);
        return null;
    }
};

// --- interna helpers (privata för modulen) ---

function normalizeIsbn(v) {
    if (!v) return "";
    const cleaned = String(v).trim().replace(/-/g, "").replace(/\s+/g, "");
    const last = cleaned.slice(-1);
    const body = cleaned.slice(0, -1).replace(/\D/g, "");
    if (/^[Xx]$/.test(last)) return body + "X"; // tillåt X i ISBN-10
    return (body + last).replace(/\D/g, "");
}

function normalizeEdition(e) {
    const authors = (e.book?.contributions || []).map((c) => c?.author?.name).filter(Boolean);

    return {
        editionId: e.id ?? null,
        bookId: e.book?.id ?? null,
        title: e.book?.title || e.title || null,
        authors,
        isbn13: e.isbn_13 ?? null,
        isbn10: e.isbn_10 ?? null,
        pages: e.pages ?? null,
        releaseDate: e.release_date ?? null,
        physicalFormat: e.physical_format ?? e.reading_format?.format ?? null,
        publisher: e.publisher?.name ?? null,
        language: e.language?.language ?? null,
        rating: typeof e.book?.rating === "number" ? e.book.rating : null,
        // Behåll rådata om du vill:
        raw: e,
    };
}
export default {
    getBookByIsbn,
};
