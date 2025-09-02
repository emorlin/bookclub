import { useState } from "react";
import { useBooks } from "../context/BooksContext";
import { getTopRatedBooks, getAverageRating } from "../utils/bookstats/ratings";
import loadingStatus from "../utils/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import sortBooks from "../utils/booksSorter";
import { Rating } from "react-simple-star-rating";

function BookList({ onSelectedBook }) {
    const { books, setBooks, status } = useBooks();
    const [sortConfig, setSortConfig] = useState({ order: "readDate", asc: true });
    console.log(books);
    const handleSort = (order) => {
        let asc = true;
        if (sortConfig.order === order && sortConfig.asc) {
            asc = false; // toggle
        }
        setSortConfig({ order, asc });

        const sorted = sortBooks({ books, order, asc });
        setBooks(sorted);
    };

    if (status !== loadingStatus.loaded) {
        return (
            <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                    <div className="overflow-x-auto">
                        <LoadingIndicator status={status} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                    <div className="overflow-x-auto">
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-2xl mb-4">
                            Alla lästa böcker
                        </h2>
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th
                                        data-sorted={
                                            sortConfig.order === "readDate"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        className="px-4 py-2 whitespace-nowrap text-left align-bottom cursor-pointer"
                                        onClick={() => handleSort("readDate")}>
                                        Läst
                                    </th>
                                    <th
                                        data-sorted={
                                            sortConfig.order === "pickedBy"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap"
                                        onClick={() => handleSort("pickedBy")}>
                                        Vald av
                                    </th>
                                    <th
                                        data-sorted={
                                            sortConfig.order === "title"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap"
                                        onClick={() => handleSort("title")}>
                                        Titel
                                    </th>
                                    <th
                                        data-sorted={
                                            sortConfig.order === "author"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap"
                                        onClick={() => handleSort("author")}>
                                        Författare
                                    </th>
                                    <th
                                        data-sorted={
                                            sortConfig.order === "rating"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap"
                                        onClick={() => handleSort("rating")}>
                                        Bokklubbens betyg
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr
                                        onClick={() => onSelectedBook(book)}
                                        key={book.sys.id}
                                        className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {book.fields.readDate
                                                ? new Date(book.fields.readDate).toLocaleDateString()
                                                : ""}
                                        </td>
                                        <td className="px-4 py-2">{book.fields.pickedBy}</td>
                                        <td className="px-4 py-2">{book.fields.bookTitle}</td>
                                        <td className="px-4 py-2">{book.fields.author}</td>
                                        <td className="px-4 py-2 text-1xl">
                                            <Rating
                                                readonly
                                                allowFraction
                                                initialValue={parseFloat(getAverageRating(book)) || 0}
                                                size={20}
                                                SVGstyle={{ display: "inline-block" }} // för säkerhets skull
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookList;
