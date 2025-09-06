// api/contentful/createBook.js
import contentfulManagement from "contentful-management";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
    if (
        !isbn || //required
        !bookTitle || //required
        !author || //required
        !pickedBy || //required
        !eriksGrade || //required
        !tomasGrade || //required
        !mathiasGrade || //required
        !goodreadGrade || //required
        !authorsSex //required
    ) {
        return res.status(400).json({ error: "Alla obigatoria fält måste fyllas i" });
    }

    const {
        isbn,
        bookTitle,
        author,
        pages,
        pickedBy,
        eriksGrade,
        tomasGrade,
        mathiasGrade,
        goodreadGrade,
        readDate,
        bookLink,
        authorLink,
        authorsSex,
        country,
    } = req.body || {};

    const locale = process.env.CONTENTFUL_LOCALE || "en-US";
    const contentTypeId = process.env.CONTENTFUL_CONTENT_TYPE_ID || "book";

    try {
        const mgmt = contentfulManagement.createClient({
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        });

        const space = await mgmt.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master");

        const entry = await env.createEntry(contentTypeId, {
            fields: {
                isbn: isbn ? { [locale]: Number(isbn) } : undefined,
                bookTitle: bookTitle ? { [locale]: bookTitle } : undefined,
                author: author ? { [locale]: author } : undefined,
                pages: pages != null ? { [locale]: Number(pages) } : undefined,
                pickedBy: pickedBy ? { [locale]: pickedBy } : undefined,
                eriksGrade: eriksGrade != null ? { [locale]: Number(eriksGrade) } : undefined,
                tomasGrade: tomasGrade != null ? { [locale]: Number(tomasGrade) } : undefined,
                mathiasGrade: mathiasGrade != null ? { [locale]: Number(mathiasGrade) } : undefined,
                goodreadGrade: goodreadGrade != null ? { [locale]: Number(goodreadGrade) } : undefined,
                readDate: readDate ? { [locale]: readDate } : undefined, // "YYYY-MM-DD"
                bookLink: bookLink ? { [locale]: bookLink } : undefined,
                authorLink: authorLink ? { [locale]: authorLink } : undefined,
                authorsSex: authorsSex ? { [locale]: authorsSex } : undefined,
                country: country ? { [locale]: country } : undefined,
            },
        });

        const published = await entry.publish();
        res.status(200).json({ id: published.sys.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Contentful create failed", detail: String(e) });
    }
}
