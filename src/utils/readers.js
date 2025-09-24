// src/utils/readers.js

// Håll ordning/namn/nycklar på ett ställe
export const readers = Object.freeze([
    { key: "erik", name: "Erik", field: "eriksGrade" },
    { key: "tomas", name: "Tomas", field: "tomasGrade" },
    { key: "mathias", name: "Mathias", field: "mathiasGrade" },
]);

// För dropdowns
export function toSelectOptions() {
    return readers.map((r) => ({ value: r.name, label: r.name }));
}
