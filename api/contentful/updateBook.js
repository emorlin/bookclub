import contentfulManagement from "contentful-management";
import crypto from "node:crypto";
import { config as loadEnv } from "dotenv";

if (!process.env.VERCEL) {
    loadEnv({ path: ".env.local" });
}

const safeParseJSON = (str) => {
    try {
        return JSON.parse(str);
    } catch {
        return {};
    }
};

const timingSafeEq = (a, b) => {
    try {
        const A = Buffer.from(String(a) ?? "");
        const B = Buffer.from(String(b) ?? "");
        if (A.length !== B.length) return false;
        return crypto.timingSafeEqual(A, B);
    } catch {
        return false;
    }
};

export default async function handler(req, res) {
    const raw = req.body ?? {};
    const body = typeof raw === "string" ? safeParseJSON(raw) : raw;

    const expected = String(process.env.FORM_SECRET_PROD).trim();
    const provided = String(req.headers["x-form-secret"] || body?.secret || "").trim();

    if (!expected || !provided || !timingSafeEq(provided, expected)) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
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
        releaseYear,
    } = body || {};

    if (!isbn) {
        return res.status(400).json({ error: "ISBN är obligatoriskt för update" });
    }

    const locale = process.env.CONTENTFUL_LOCALE;
    const contentTypeId = process.env.CONTENTFUL_CONTENT_TYPE_ID;

    try {
        const mgmt = contentfulManagement.createClient({
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        });

        const space = await mgmt.getSpace(process.env.CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master");

        // Hitta boken med ISBN
        const existing = await env.getEntries({
            content_type: contentTypeId,
            "fields.isbn": Number(isbn),
            limit: 1,
        });

        if (existing.items.length === 0) {
            return res.status(404).json({ error: `Ingen bok hittades med ISBN ${isbn}` });
        }

        const entry = existing.items[0];

        // Uppdatera enbart fält som skickats
        if (bookTitle) entry.fields.bookTitle = { [locale]: bookTitle };
        if (author) entry.fields.author = { [locale]: author };
        if (pages != null) entry.fields.pages = { [locale]: Number(pages) };
        if (pickedBy) entry.fields.pickedBy = { [locale]: pickedBy };
        if (eriksGrade != null) entry.fields.eriksGrade = { [locale]: Number(eriksGrade) };
        if (tomasGrade != null) entry.fields.tomasGrade = { [locale]: Number(tomasGrade) };
        if (mathiasGrade != null) entry.fields.mathiasGrade = { [locale]: Number(mathiasGrade) };
        if (goodreadGrade != null) entry.fields.goodreadGrade = { [locale]: Number(goodreadGrade) };
        if (readDate) entry.fields.readDate = { [locale]: readDate };
        if (bookLink) entry.fields.bookLink = { [locale]: bookLink };
        if (authorLink) entry.fields.authorLink = { [locale]: authorLink };
        if (authorsSex) entry.fields.authorsSex = { [locale]: authorsSex };
        if (country) entry.fields.country = { [locale]: country };
        if (releaseYear) entry.fields.releaseYear = { [locale]: releaseYear };

        const updated = await entry.update();
        const published = await updated.publish();

        res.status(200).json({ id: published.sys.id, action: "updated" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Contentful update failed", detail: String(e) });
    }
}
