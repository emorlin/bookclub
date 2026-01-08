/**
 *
 * @param num
 * @returns
 */

let x: number;
let y: string;

// Tar emot en siffra och formatterar den så att den blir läsbar. 22000 blir "22 000".
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Tar emot ett datum i formatet "YYYY-MM-DD" och returnerar det som "D MMMM YYYY", t.ex. "2023-08-15" → "15 augusti 2023".
export function formatDate(dateStr: string): string {
    const date = new Date(`${dateStr}T00:00:00`);
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    return date.toLocaleDateString("sv-SE", options);
}
