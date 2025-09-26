import { parseAndValidate, getContentfulEnv, buildFields } from "./utils/contentfulHelpers.js";

export default async function handler(req, res) {
    const { body, error } = parseAndValidate(req);
    if (error) return res.status(error.status).json({ error: error.message });

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!body.isbn) {
        return res.status(400).json({ error: "ISBN är obligatoriskt för update" });
    }

    try {
        const env = await getContentfulEnv();

        // Hitta boken med ISBN
        const existing = await env.getEntries({
            content_type: process.env.CONTENTFUL_CONTENT_TYPE_ID,
            "fields.isbn": Number(body.isbn),
            limit: 1,
        });

        if (existing.items.length === 0) {
            return res.status(404).json({ error: `Ingen bok hittades med ISBN ${body.isbn}` });
        }

        const entry = existing.items[0];

        // Uppdatera bara fält som skickats
        entry.fields = {
            ...entry.fields,
            ...buildFields(body),
        };

        const updated = await entry.update();
        const published = await updated.publish();

        res.status(200).json({ id: published.sys.id, action: "updated" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Contentful update failed", detail: String(e) });
    }
}
