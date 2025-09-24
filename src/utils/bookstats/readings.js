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
