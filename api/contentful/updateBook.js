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
        console.log("A", A);
        console.log("B", B);
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
        bookId, // Nytt obligatoriskt fält för att identifiera vilken bok som ska uppdateras
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
    } = body || {};

    if (
        !bookId || // bookId är nu obligatoriskt
        !isbn ||
        !bookTitle ||
        !author ||
        !pickedBy ||
        !eriksGrade ||
        !tomasGrade ||
        !mathiasGrade ||
        !goodreadGrade ||
        !authorsSex
    ) {
        return res.status(400).json({ error: "Alla obligatoriska fält inklusive bookId måste fyllas i" });
    }

    const locale = process.env.CONTENTFUL_LOCALE;
    console.log("Uppdaterar bok med ID:", bookId);

    try {
        const mgmt = contentfulManagement.createClient({
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        });

        const space = await mgmt.getSpace(process.env.CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master");

        // Hämta befintlig entry istället för att skapa ny
        const entry = await env.getEntry(bookId);

        // Uppdatera fälten
        const fieldsToUpdate = {
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
        };

        // Uppdatera endast fält som har värden
        Object.keys(fieldsToUpdate).forEach((key) => {
            if (fieldsToUpdate[key] !== undefined) {
                entry.fields[key] = fieldsToUpdate[key];
            }
        });

        // Spara och publicera uppdateringen
        const updatedEntry = await entry.update();
        const published = await updatedEntry.publish();

        res.status(200).json({
            id: published.sys.id,
            message: "Boken uppdaterades framgångsrikt",
        });
    } catch (e) {
        console.error(e);

        // Ge mer specifika felmeddelanden
        if (e.name === "NotFound") {
            res.status(404).json({ error: "Bok med angivet ID hittades inte", detail: String(e) });
        } else if (e.name === "ValidationFailed") {
            res.status(400).json({ error: "Valideringsfel vid uppdatering", detail: String(e) });
        } else {
            res.status(500).json({ error: "Contentful uppdatering misslyckades", detail: String(e) });
        }
    }
}
