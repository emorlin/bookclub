/**
 * Returns an object with the number of male and female authors.
 * @param {object[]} books - An array of book objects from the Contentful API.
 * @returns {object} An object with the following properties:
 *   - male: The number of books written by male authors in the array.
 *   - female: The number of books written by female authors in the array.
 */
export function getAuhorSexCount(books) {
    const male = books.filter((b) => b.fields.authorsSex === "Male").length;
    const female = books.filter((b) => b.fields.authorsSex === "Female").length;
    return { male, female };
}
