import { client } from "./client";

export const getAllBooks = async () => {
    try {
        const response = await client.getEntries();
        return response.items;
    } catch (error) {
        console.error(error);
        return [];
    }
};
