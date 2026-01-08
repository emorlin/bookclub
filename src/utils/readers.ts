// src/utils/readers.ts

export type Reader = {
    key: string;
    name: string;
    field: string;
};

// Håll ordning/namn/nycklar på ett ställe
export const readers: ReadonlyArray<Reader> = [
    { key: "erik", name: "Erik", field: "eriksGrade" },
    { key: "tomas", name: "Tomas", field: "tomasGrade" },
    { key: "mathias", name: "Mathias", field: "mathiasGrade" },
];

// För dropdowns
export function toSelectOptions(): { value: string; label: string }[] {
    return readers.map((r) => ({ value: r.name, label: r.name }));
}
