// api/contentful/_testCreate.js
import contentfulManagement from "contentful-management";

export default async function handler(req, res) {
    if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
        return res.status(500).json({ error: "Missing CONTENTFUL_MANAGEMENT_TOKEN" });
    }

    try {
        const mgmt = contentfulManagement.createClient({
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        });
        const space = await mgmt.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master");

        const locale = process.env.CONTENTFUL_LOCALE || "sv-SE";
        const contentTypeId = process.env.CONTENTFUL_CONTENT_TYPE_ID || "book";

        // 🔴 HÅRDKODAD TESTDATA — anpassa fältnamnen så de matchar dina field IDs
        const entry = await env.createEntry(contentTypeId, {
            fields: {
                isbn: { [locale]: 9789127163112 },
                bookTitle: { [locale]: "Hårdkodad testbok" },
                author: { [locale]: "Test Författare" },
                pages: { [locale]: 321 },
                pickedBy: { [locale]: "Erik" },
                eriksGrade: { [locale]: 4 },
                tomasGrade: { [locale]: 3 },
                mathiasGrade: { [locale]: 5 },
                goodreadGrade: { [locale]: 4.2 },
                readDate: { [locale]: "2024-11-01" }, // YYYY-MM-DD
                bookLink: { [locale]: "https://example.com/testbok" },
                authorsSex: { [locale]: "Male" },
                country: { [locale]: "Sweden" },
                authorLink: { [locale]: "https://example.com/forfattare" },
            },
        });

        const published = await entry.publish();
        res.status(200).json({ id: published.sys.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Test create failed", detail: String(e) });
    }
}
