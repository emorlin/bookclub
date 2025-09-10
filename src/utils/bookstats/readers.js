// utils/bookstats/perUserAverages.js

/**
 * Räknar snittbetyg per läsare:
 * - overall: betyg på alla böcker
 * - ownPicks: betyg på böcker läsaren själv valt
 * - othersPicks: betyg på böcker andra valt
 *
 * Returnerar ett objekt:
 * {
 *   Erik:    { overall, ownPicks, othersPicks, counts: { overall, ownPicks, othersPicks } },
 *   Tomas:   { ... },
 *   Mathias: { ... }
 * }
 */
export function getPerUserAverages(books = []) {
    if (!Array.isArray(books) || books.length === 0) {
        return {
            Erik: emptyEntry(),
            Tomas: emptyEntry(),
            Mathias: emptyEntry(),
        };
    }

    const graders = [
        { name: "Erik", field: "eriksGrade" },
        { name: "Tomas", field: "tomasGrade" },
        { name: "Mathias", field: "mathiasGrade" },
    ];

    const res = {};
    for (const { name, field } of graders) {
        let sumAll = 0,
            cntAll = 0;
        let sumOwn = 0,
            cntOwn = 0;
        let sumOth = 0,
            cntOth = 0;

        for (const b of books) {
            const g = Number(b?.fields?.[field]);
            if (!Number.isFinite(g)) continue;

            sumAll += g;
            cntAll++;

            if (String(b?.fields?.pickedBy) === name) {
                sumOwn += g;
                cntOwn++;
            } else {
                sumOth += g;
                cntOth++;
            }
        }

        res[name] = {
            overall: avg(sumAll, cntAll),
            ownPicks: avg(sumOwn, cntOwn),
            othersPicks: avg(sumOth, cntOth),
            counts: { overall: cntAll, ownPicks: cntOwn, othersPicks: cntOth },
        };
    }

    return res;
}

// utils/bookstats/perUserAverages.js
export function getPerUserAveragesRecieved(books = []) {
    if (!Array.isArray(books) || books.length === 0) return [];
    console.log(books);
    const readers = [
        { name: "Erik", field: "eriksGrade" },
        { name: "Tomas", field: "tomasGrade" },
        { name: "Mathias", field: "mathiasGrade" },
    ];

    const rows = readers.map(({ name }) => {
        let sum = 0,
            count = 0;

        for (const b of books) {
            // Bara böcker som den här personen har valt
            const pickedBy = String(b?.fields?.pickedBy ?? "").trim();
            if (pickedBy !== name) continue;

            // Summera alla betyg (mottagna) på dessa böcker
            for (const { field } of readers) {
                const g = Number(b?.fields?.[field]);
                if (Number.isFinite(g)) {
                    sum += g;
                    count++;
                }
            }
        }

        return { name, sum, count, averageScore: avg(sum, count) };
    });

    // Sortera på sum, högst först
    rows.sort((a, b) => b.sum - a.sum);
    return rows;
}

export function getPagesPerUser(books = []) {
    if (!Array.isArray(books) || books.length === 0) return [];

    const readers = [{ name: "Erik" }, { name: "Tomas" }, { name: "Mathias" }];

    const rows = readers.map(({ name }) => {
        let sum = 0;

        for (const b of books) {
            const pickedBy = String(b?.fields?.pickedBy ?? "").trim();
            if (pickedBy !== name) continue;

            const g = Number(b?.fields?.pages);
            if (Number.isFinite(g)) {
                sum += g;
            }
        }

        return { name, sum };
    });

    // Sortera på sum, högst först
    rows.sort((a, b) => b.sum - a.sum);
    return rows;
}

function avg(sum, count) {
    return count > 0 ? +(sum / count).toFixed(2) : null;
}

function emptyEntry() {
    return { overall: null, ownPicks: null, othersPicks: null, counts: { overall: 0, ownPicks: 0, othersPicks: 0 } };
}
