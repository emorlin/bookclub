// utils/booksSorter.js
import { getAverageRating } from "./bookstats/ratings";
const sortBooks = ({ books, order, asc = true }) => {
    const sorted = [...books].sort((a, b) => {
        let aVal, bVal;

        switch (order) {
            case "readDate":
                aVal = a.fields.readDate ? new Date(a.fields.readDate) : 0;
                bVal = b.fields.readDate ? new Date(b.fields.readDate) : 0;
                break;
            case "pickedBy":
                aVal = a.fields.pickedBy || "";
                bVal = b.fields.pickedBy || "";
                break;
            case "title":
                aVal = a.fields.bookTitle || "";
                bVal = b.fields.bookTitle || "";
                break;
            case "author":
                aVal = a.fields.author || "";
                bVal = b.fields.author || "";
                break;
            case "rating":
                // Använd funktionen som returnerar snittbetyget
                aVal = parseFloat(getAverageRating(a)) || 0;
                bVal = parseFloat(getAverageRating(b)) || 0;
                break;
            default:
                return 0;
        }

        if (aVal < bVal) return asc ? -1 : 1;
        if (aVal > bVal) return asc ? 1 : -1;
        return 0;
    });

    return sorted;
};

export default sortBooks;
