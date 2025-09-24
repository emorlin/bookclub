import * as contentful from "contentful";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

export const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
});
