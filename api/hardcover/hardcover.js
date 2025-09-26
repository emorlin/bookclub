// api/hardcover.js
export default async function handler(req, res) {
    const r = await fetch("https://api.hardcover.app/v1/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VITE_HARDCOVER_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body ?? {}),
    });
    const text = await r.text();
    res.status(r.status).send(text);
}
