import { useState, useMemo, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";
import { getAverageRating } from "../utils/bookstats/ratings";
import loadingStatus from "../utils/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import sortBooks from "../utils/booksSorter";
import { Rating } from "react-simple-star-rating";
import { toSelectOptions } from "../utils/readers";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function BookList() {
    const { books, status } = useBooks();
    const [sortConfig, setSortConfig] = useState({ order: "readDate", asc: false });
    const [filtered, setFiltered] = useState("all");
    const [shownInTable, setShownInTable] = useState();
    const navigate = useNavigate();
    const options = toSelectOptions();

    // Beräkna filtrerad + sorterad lista direkt från `books`
    const visibleBooks = useMemo(() => {
        // Om data inte laddat in eller inte är en array, returnera tom array
        if (status !== loadingStatus.loaded || !Array.isArray(books)) return [];

        const base = filtered === "all" ? books : books.filter((b) => b.fields.pickedBy === filtered);

        return sortBooks({
            books: base,
            order: sortConfig.order,
            asc: sortConfig.asc,
        });
    }, [books, filtered, sortConfig, status]);

    useEffect(() => {
        const message = `Visar ${visibleBooks.length} böcker valda av ${filtered === "all" ? "alla" : filtered}`;
        setShownInTable(message);
    }, [visibleBooks]);

    const handleSort = (order) => {
        const asc = sortConfig.order === order && sortConfig.asc ? false : true; // toggle
        setSortConfig({ order, asc });
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
    }

    return (
        <div
            id="bookstable"
            className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-2xl mb-4">Lästa böcker</h2>

                <label
                    htmlFor="pickedBy"
                    className="block text-sm/6 font-medium text-white mt-4 mb-2">
                    Visa böcker valda av
                </label>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                    id="tableUpdateMessage">
                    {shownInTable}
                </div>
                <div className="mt-2 mb-6 grid grid-cols-1 gap-2  w-full sm:w-70 ">
                    <select
                        aria-controls="booksTable"
                        value={filtered}
                        onChange={(e) => setFiltered(e.target.value)}
                        id="pickedBy"
                        name="pickedBy"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        <option
                            key="001"
                            value="all">
                            Alla
                        </option>
                        {options.map(({ value, label }) => (
                            <option
                                key={value}
                                value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                        <path
                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        />
                    </svg>
                </div>

                <div className="overflow-x-auto">
                    <table
                        id="booksTable"
                        className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th
                                    aria-sort={
                                        sortConfig.order === "readDate"
                                            ? sortConfig.asc
                                                ? "ascending"
                                                : "descending"
                                            : ""
                                    }
                                    className="pr-4 py-2 whitespace-nowrap text-left align-bottom cursor-pointer">
                                    <button
                                        aria-label="Sortera efter datum"
                                        onClick={() => handleSort("readDate")}
                                        data-sorted={
                                            sortConfig.order === "readDate"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        type="button">
                                        Läst
                                    </button>
                                </th>
                                <th
                                    aria-sort={
                                        sortConfig.order === "pickedBy"
                                            ? sortConfig.asc
                                                ? "ascending"
                                                : "descending"
                                            : ""
                                    }
                                    className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap">
                                    <button
                                        aria-label="Sortera efter vem som valt boken"
                                        data-sorted={
                                            sortConfig.order === "pickedBy"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        type="button"
                                        onClick={() => handleSort("pickedBy")}>
                                        Vald av
                                    </button>
                                </th>
                                <th
                                    aria-sort={
                                        sortConfig.order === "title"
                                            ? sortConfig.asc
                                                ? "ascending"
                                                : "descending"
                                            : ""
                                    }
                                    className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap">
                                    <button
                                        aria-label="Sortera efter titel"
                                        type="button"
                                        onClick={() => handleSort("title")}
                                        data-sorted={
                                            sortConfig.order === "title"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }>
                                        Titel
                                    </button>
                                </th>
                                <th
                                    aria-sort={
                                        sortConfig.order === "author"
                                            ? sortConfig.asc
                                                ? "ascending"
                                                : "descending"
                                            : ""
                                    }
                                    className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap">
                                    <button
                                        aria-label="Sortera efter författare"
                                        type="button"
                                        data-sorted={
                                            sortConfig.order === "author"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }
                                        onClick={() => handleSort("author")}>
                                        Författare
                                    </button>
                                </th>
                                <th
                                    aria-sort={
                                        sortConfig.order === "rating"
                                            ? sortConfig.asc
                                                ? "ascending"
                                                : "descending"
                                            : ""
                                    }
                                    className="px-4 py-2 text-left align-bottom cursor-pointer whitespace-nowrap">
                                    <button
                                        aria-label="Sortera efter bokklubbens betyg"
                                        type="button"
                                        onClick={() => handleSort("rating")}
                                        data-sorted={
                                            sortConfig.order === "rating"
                                                ? sortConfig.asc
                                                    ? "asc"
                                                    : "desc"
                                                : "unsorted"
                                        }>
                                        Bokklubbens betyg
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleBooks.map((book) => (
                                <tr
                                    onClick={() => navigate(`/book/${book.fields.isbn}`, { state: { book } })}
                                    key={book.sys.id}
                                    className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
                                    <td className="pr-4 py-2 whitespace-nowrap">
                                        {book.fields.readDate ? String(book.fields.readDate).slice(0, 7) : ""}
                                    </td>
                                    <td className="px-4 py-2">{book.fields.pickedBy}</td>
                                    <td className="px-4 py-2 min-w-2xs underline">
                                        <NavLink
                                            to={`/book/${book.fields.isbn}`}
                                            state={{ book }}
                                            className="underline">
                                            {book.fields.bookTitle}
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">{book.fields.author}</td>
                                    <td className="px-4 py-2 text-1xl">
                                        <span className="sr-only">{parseFloat(getAverageRating(book))} av 5</span>
                                        <Rating
                                            readonly
                                            allowFraction
                                            initialValue={parseFloat(getAverageRating(book)) || 0}
                                            size={20}
                                            SVGstyle={{ display: "inline-block" }}
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

export default BookList;
