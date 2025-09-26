import { parseAndValidate, getContentfulEnv, buildFields } from "./utils/contentfulHelpers.js";

export default async function handler(req, res) {
    const { body, error } = parseAndValidate(req);
    if (error) return res.status(error.status).json({ error: error.message });

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const required = [
        "isbn",
        "bookTitle",
        "author",
        "pickedBy",
        "eriksGrade",
        "tomasGrade",
        "mathiasGrade",
        "authorsSex",
    ];
    const missing = required.filter((field) => !body[field]);

    if (missing.length > 0) {
        return res.status(400).json({ error: `Saknar obligatoriska fält: ${missing.join(", ")}` });
    }

    try {
        const env = await getContentfulEnv();
        const entry = await env.createEntry(process.env.CONTENTFUL_CONTENT_TYPE_ID, {
            fields: buildFields(body),
        });
        const published = await entry.publish();

        res.status(200).json({ id: published.sys.id, action: "created" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Contentful create failed", detail: String(e) });
    }
}
