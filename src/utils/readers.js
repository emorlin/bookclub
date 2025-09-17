// src/utils/readers.js

// Håll ordning/namn/nycklar på ett ställe
export const readers = Object.freeze([
    { key: "erik", name: "Erik", field: "eriksGrade" },
    { key: "tomas", name: "Tomas", field: "tomasGrade" },
    { key: "mathias", name: "Mathias", field: "mathiasGrade" },
]);

// ——— Hämta namn ———
export function getAllReaderNames() {
    return readers.map((r) => r.name);
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
    return getReaderByKey(key)?.name ?? null;
}

export function getGradeFieldByKey(key) {
    return getReaderByKey(key)?.field ?? null;
}

export function getGradeFieldByName(name) {
    if (!name) return null;
    const n = String(name).toLowerCase();
    const hit = readers.find((r) => r.name.toLowerCase() === n);
    return hit?.field ?? null;
}

// För dropdowns
export function toSelectOptions() {
    return readers.map((r) => ({ value: r.name, label: r.name }));
}
