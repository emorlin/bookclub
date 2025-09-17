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

/**
 * Return an array of all reader keys.
 *
 * @returns {string[]} An array of all reader keys.
 */
export function getAllReaderKeys() {
    // Return an array of all reader keys
    return readers.map((r) => r.key);
}

/**
 * Return an object with all reader keys as properties and their corresponding names as values.
 *
 * @returns {{ [key: string]: string }} An object with all reader keys as properties and their names as values.
 */
export function getAllReaderKeysToObject() {
    // Return an object with all reader keys as properties and their names as values
    return readers.reduce((obj, r) => {
        obj[r.key] = r.name;
        return obj;
    }, {});
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
