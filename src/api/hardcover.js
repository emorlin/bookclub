// /api/hardcover.js
export default async function handler(req, res) {
    // CORS för dev (Vite kör 5173)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(204).end();

    try {
        const r = await fetch("https://api.hardcover.app/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HARDCOVER_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });
        const text = await r.text();
        res.status(r.status).send(text);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
