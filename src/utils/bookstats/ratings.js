export function getTopRatedBooks(books, limit = 5) {
    return books
        .map((book) => ({
            ...book,
            avgGrade: (book.fields.eriksGrade + book.fields.tomasGrade + book.fields.mathiasGrade) / 3,
        }))
        .sort((a, b) => b.avgGrade - a.avgGrade) // sortera högst → lägst
        .slice(0, limit);
}

export function getAverageRating(book) {
    if (!book) return null;
    const { eriksGrade, tomasGrade, mathiasGrade } = book.fields;
    const grades = [eriksGrade, tomasGrade, mathiasGrade].filter((g) => typeof g === "number");
    if (grades.length === 0) return null;
    const sum = grades.reduce((acc, val) => acc + val, 0);
    return (sum / grades.length).toFixed(2);
}

export function getAllHighestRatedBooks(books) {
    return books
        .map((book) => ({
            ...book,
            isTopRated: (book.fields.eriksGrade + book.fields.tomasGrade + book.fields.mathiasGrade) / 3 === 5,
        }))
        .filter((book) => book.isTopRated);
}

export function getAllLowestRatedBooks(books) {
    return books
        .map((book) => ({
            ...book,
            isTopRated: (book.fields.eriksGrade + book.fields.tomasGrade + book.fields.mathiasGrade) / 3 <= 2,
        }))
        .filter((book) => book.isTopRated);
}

export function getLongestBook(books) {
    return books.sort((a, b) => b.fields.pages - a.fields.pages)[0];
}

export function getshortestBook(books) {
    return books.sort((a, b) => a.fields.pages - b.fields.pages)[0];
}
