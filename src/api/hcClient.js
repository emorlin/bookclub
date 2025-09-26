// src/api/hcClient.js

const endpoint = "/api/hardcover/hardcover"; // Din proxy-endpoint

/**
 * Minimal GraphQL-klient, via din proxy.
 */
export const hcClient = {
    query: async (query, variables = {}) => {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`Proxy request failed: ${res.status} ${text}`);
        }

        return res.json();
    },
};
