export function getBooksPerYear(books) {
    const counts = {};

    books.forEach((book) => {
        const readDate = book.fields?.readDate;
        if (!readDate) return;
        const year = new Date(readDate).getFullYear();
        counts[year] = (counts[year] || 0) + 1;
    });

    if (Object.keys(counts).length === 0) return {};

    const minYear = Math.min(...Object.keys(counts).map(Number));
    const maxYear = Math.max(...Object.keys(counts).map(Number));
    const filled = {};
    for (let y = minYear; y <= maxYear; y++) {
        filled[y] = counts[y] ?? 0;
    }
    return filled;
}

// Utility-funktion för att räkna böcker per månad
export function getBooksPerMonth(books) {
    const months = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Julyí",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
    ];

    const counts = months.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
    }, {});

    books.forEach((book) => {
        const readDate = book.fields?.readDate;
        if (!readDate) return;

        const date = new Date(readDate);
        const monthName = months[date.getMonth()];
        counts[monthName]++;
    });

    return counts;
}
