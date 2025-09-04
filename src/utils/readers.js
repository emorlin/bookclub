// src/utils/readers.js

// Håll ordning/namn/nycklar på ett ställe
export const readers = Object.freeze([
    { key: "erik", displayName: "Erik", gradeField: "eriksGrade" },
    { key: "tomas", displayName: "Tomas", gradeField: "tomasGrade" },
    { key: "mathias", displayName: "Mathias", gradeField: "mathiasGrade" },
]);

// ——— Hämta namn ———
export function getAllReaderNames() {
    return readers.map((r) => r.displayName);
}

// ——— Hjälpare (om du behöver) ———
export function getAllReaderKeys() {
    return readers.map((r) => r.key);
}

export function getReaderByKey(key) {
    if (!key) return null;
    const k = String(key).toLowerCase();
    return readers.find((r) => r.key === k) || null;
}

export function getDisplayNameByKey(key) {
    return getReaderByKey(key)?.displayName ?? null;
}

export function getGradeFieldByKey(key) {
    return getReaderByKey(key)?.gradeField ?? null;
}

export function getGradeFieldByName(name) {
    if (!name) return null;
    const n = String(name).toLowerCase();
    const hit = readers.find((r) => r.displayName.toLowerCase() === n);
    return hit?.gradeField ?? null;
}

// För dropdowns
export function toSelectOptions() {
    return readers.map((r) => ({ value: r.key, label: r.displayName }));
}
