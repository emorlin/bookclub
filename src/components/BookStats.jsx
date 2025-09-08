import { useBooks } from "../context/BooksContext";
import { allHighestRatedBooks } from "../utils/bookstats/ratings";

const Bookstats = () => {
    const { books } = useBooks();
    const highestRated = allHighestRatedBooks(books);
    return "";
    //    return <p className="text-white">{highestRated.length}</p>;
};

export default Bookstats;
