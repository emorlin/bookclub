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

function avg(sum, count) {
    return count > 0 ? +(sum / count).toFixed(2) : null; // null om ingen data
}

function emptyEntry() {
    return { overall: null, ownPicks: null, othersPicks: null, counts: { overall: 0, ownPicks: 0, othersPicks: 0 } };
}
