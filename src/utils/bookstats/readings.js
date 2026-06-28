export function getPagesPerYear(books) {
    const byYear = {};

    books.forEach((book) => {
        const readDate = book.fields?.readDate;
        const pages = book.fields?.pages;
        if (!readDate || !pages) return;
        const year = new Date(readDate).getFullYear();
        byYear[year] = (byYear[year] || 0) + pages;
    });

    if (Object.keys(byYear).length === 0) return {};

    const minYear = Math.min(...Object.keys(byYear).map(Number));
    const maxYear = Math.max(...Object.keys(byYear).map(Number));
    const result = {};
    for (let y = minYear; y <= maxYear; y++) {
        result[y] = byYear[y] ?? 0;
    }
    return result;
}

export function getAvgRatingPerYear(books) {
    const byYear = {};

    books.forEach((book) => {
        const readDate = book.fields?.readDate;
        if (!readDate) return;
        const year = new Date(readDate).getFullYear();

        const { eriksGrade, tomasGrade, mathiasGrade } = book.fields;
        const grades = [eriksGrade, tomasGrade, mathiasGrade].filter((g) => typeof g === "number");
        if (grades.length === 0) return;

        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        if (!byYear[year]) byYear[year] = { sum: 0, count: 0 };
        byYear[year].sum += avg;
        byYear[year].count += 1;
    });

    if (Object.keys(byYear).length === 0) return {};

    const minYear = Math.min(...Object.keys(byYear).map(Number));
    const maxYear = Math.max(...Object.keys(byYear).map(Number));
    const result = {};
    for (let y = minYear; y <= maxYear; y++) {
        const entry = byYear[y];
        result[y] = entry ? +(entry.sum / entry.count).toFixed(2) : null;
    }
    return result;
}

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
