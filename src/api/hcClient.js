// src/api/hcClient.js

const endpoint = "/api/hardcover/hardcover"; // Din proxy-endpoint

/**
 * Minimal GraphQL-klient, via proxy.
 */
export const hcClient = {
    query: async (query, variables = {}) => {
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, variables }),
            });

            // Om proxy returnerar felstatus
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Proxy request failed: ${res.status} ${text}`);
            }

            const data = await res.json();

            // Om GraphQL svarar med "errors" trots att status är 200
            if (data.errors) {
                console.error("GraphQL errors:", data.errors);
                throw new Error(data.errors[0]?.message || "Unknown GraphQL error occurred.");
            }

            return data.data; // returnera endast själva datan
        } catch (error) {
            console.error("hcClient query failed:", error);

            // Kasta ett tydligt fel vidare så frontend kan hantera det
            throw new Error(`Hardcover query failed: ${error.message}`);
        }
    },
};
