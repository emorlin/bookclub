// api/hardcover.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed. Use POST." });
    }

    try {
        // Kontrollera att body finns
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is missing or empty." });
        }

        const response = await fetch("https://api.hardcover.app/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.VITE_HARDCOVER_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });

        // Försök tolka som JSON
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            // Hardcover svarade med felstatus
            return res.status(response.status).json({
                error: "Hardcover API error",
                status: response.status,
                details: data ?? (await response.text()),
            });
        }

        // Allt OK → returnera data vidare till frontend
        return res.status(200).json(data);
    } catch (error) {
        console.error("Hardcover proxy error:", error);

        // Oväntat fel
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
}
