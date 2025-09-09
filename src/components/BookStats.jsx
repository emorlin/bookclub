import { useBooks } from "../context/BooksContext";
import { getAllHighestRatedBooks } from "../utils/bookstats/ratings";

const Bookstats = () => {
    const { books } = useBooks();
    const highestRated = getAllHighestRatedBooks(books);
    return "";
    //    return <p className="text-white">{highestRated.length}</p>;
};

export default Bookstats;
