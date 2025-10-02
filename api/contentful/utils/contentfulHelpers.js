import contentfulManagement from "contentful-management";
import { config as loadEnv } from "dotenv";
import timingSafeEq from "../../utils/timingSafeEq.js";
import safeParseJSON from "../../utils/safeParseJSON.js";

if (!process.env.VERCEL) {
    loadEnv({ path: ".env.local" });
}

// Gemensam parsing och auth-kontroll
export function parseAndValidate(req) {
    const raw = req.body ?? {};
    const body = typeof raw === "string" ? safeParseJSON(raw) : raw;

    const expected = String(process.env.FORM_SECRET_PROD).trim();
    const provided = String(req.headers["x-form-secret"] || body?.secret || "").trim();

    if (!expected || !provided || !timingSafeEq(provided, expected)) {
        return { error: { status: 401, message: "Unauthorized" } };
    }

    return { body };
}

// Setup Contentful client
export async function getContentfulEnv() {
    const mgmt = contentfulManagement.createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });

    const space = await mgmt.getSpace(process.env.CONTENTFUL_SPACE_ID);
    return space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master");
}

// Bygg fields-objekt dynamiskt
export function buildFields(body) {
    const locale = process.env.CONTENTFUL_LOCALE;

    return {
        isbn: body.isbn ? { [locale]: Number(body.isbn) } : undefined,
        bookTitle: body.bookTitle ? { [locale]: body.bookTitle } : undefined,
        author: body.author ? { [locale]: body.author } : undefined,
        pages: body.pages != null ? { [locale]: Number(body.pages) } : undefined,
        pickedBy: body.pickedBy ? { [locale]: body.pickedBy } : undefined,
        eriksGrade: body.eriksGrade != null ? { [locale]: Number(body.eriksGrade) } : undefined,
        tomasGrade: body.tomasGrade != null ? { [locale]: Number(body.tomasGrade) } : undefined,
        mathiasGrade: body.mathiasGrade != null ? { [locale]: Number(body.mathiasGrade) } : undefined,
        goodreadGrade: body.goodreadGrade != null ? { [locale]: Number(body.goodreadGrade) } : undefined,
        readDate: body.readDate ? { [locale]: body.readDate } : undefined,
        bookLink: body.bookLink ? { [locale]: body.bookLink } : undefined,
        authorLink: body.authorLink ? { [locale]: body.authorLink } : undefined,
        authorsSex: body.authorsSex ? { [locale]: body.authorsSex } : undefined,
        country: body.country ? { [locale]: body.country } : undefined,
        releaseYear: body.releaseYear ? { [locale]: body.releaseYear } : undefined,
        coverImage: body.coverImage ? { [locale]: body.coverImage } : undefined,
        genres: body.genres ? { [locale]: body.genres } : undefined,
    };
}
