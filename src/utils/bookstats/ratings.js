export function getTopRatedBooks(books, limit = 5) {
    return books
        .map((book) => ({
            ...book,
            avgGrade: (book.fields.eriksGrade + book.fields.tomasGrade + book.fields.mathiasGrade) / 3,
        }))
        .sort((a, b) => b.avgGrade - a.avgGrade) // sortera högst → lägst
        .slice(0, limit);
}
