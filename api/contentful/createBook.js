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

    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

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

    if (!isbn || !bookTitle || !author || !pickedBy || !eriksGrade || !tomasGrade || !mathiasGrade || !authorsSex) {
        return res.status(400).json({ error: "Alla obigatoria fält måste fyllas i" });
    }

    const locale = process.env.CONTENTFUL_LOCALE;
    const contentTypeId = process.env.CONTENTFUL_CONTENT_TYPE_ID;
    console.log("contentTypeId");
    console.log(contentTypeId);

    try {
        const mgmt = contentfulManagement.createClient({
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        });

        const space = await mgmt.getSpace(process.env.CONTENTFUL_SPACE_ID);
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
                releaseYear: releaseYear ? { [locale]: releaseYear } : undefined,
            },
        });

        const published = await entry.publish();
        res.status(200).json({ id: published.sys.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Contentful create failed", detail: String(e) });
    }
}
