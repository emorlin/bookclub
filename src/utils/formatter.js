// tar emot en siffra och formatterar den så att den blir läsbar. 22000 blir 22 000
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// tar emot ett datum i formatet  "YYYY-MM-DD" som en sträng och returnerar det som "D MMMM YYYY", t.ex. 2023-08-15 blir "15 augusti 2023"
export function formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("sv-SE", options);
}
