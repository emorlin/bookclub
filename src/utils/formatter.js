// tar emot en siffra och formatterar den så att den blir läsbar. 22000 blir 22 000
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
