import * as contentful from "contentful";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
});

export const getAllBooks = async () => {
    try {
        const response = await client.getEntries();
        return response.items;
    } catch (error) {
        console.error(error);
        return [];
    }
};
