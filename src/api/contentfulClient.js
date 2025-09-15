export const createBook = async (payload) => {
    const res = await fetch("/api/contentful/createBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

export const UpdateBook = async (payload) => {
    const res = await fetch("/api/contentful/updateBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};
