import { useState, useMemo, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";
import { getAverageRating } from "../utils/bookstats/ratings";
import loadingStatus from "../utils/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import sortBooks from "../utils/booksSorter";
import { Rating } from "react-simple-star-rating";
import { toSelectOptions } from "../utils/readers";
import { useNavigate, NavLink } from "react-router-dom";

function BookList() {
    const { books, status } = useBooks();
    const [sortConfig, setSortConfig] = useState({ order: "readDate", asc: false });
    const [filtered, setFiltered] = useState("all");
    const [searched, setSearched] = useState("");
    const [shownInTable, setShownInTable] = useState();
    const navigate = useNavigate();
    const options = toSelectOptions();

    const visibleBooks = useMemo(() => {
        if (status !== loadingStatus.loaded || !Array.isArray(books)) return [];

        let base = filtered === "all" ? books : books.filter((b) => b.fields.pickedBy === filtered);

        if (searched && searched.trim() !== "") {
            const lower = searched.toLowerCase();
            base = base.filter((b) => {
                const title = b.fields.bookTitle?.toLowerCase() || "";
                const author = b.fields.author?.toLowerCase() || "";
                return title.includes(lower) || author.includes(lower);
            });
        }

        return sortBooks({ books: base, order: sortConfig.order, asc: sortConfig.asc });
    }, [books, filtered, sortConfig, status, searched]);

    useEffect(() => {
        const message = `Visar ${visibleBooks.length} böcker valda av ${filtered === "all" ? "alla" : filtered}`;
        setShownInTable(message);
    }, [visibleBooks, filtered]);

    const handleSort = (order) => {
        const asc = sortConfig.order === order ? !sortConfig.asc : true;
        setSortConfig({ order, asc });
    };

    const searchBook = (e) => setSearched(e.target.value);

    if (status !== loadingStatus.loaded) {
        return (
            <div className="bg-paper-50 dark:bg-night-900 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 dark:text-cream-100">
                    <LoadingIndicator status={status} />
                </div>
            </div>
        );
    }

    return (
        <div id="bookstable" className="bg-paper-50 dark:bg-night-900 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-ink-900 dark:text-cream-100 mb-6">Lästa böcker</h2>

                <div aria-live="polite" aria-atomic="true" className="sr-only" id="tableUpdateMessage">
                    {shownInTable}
                </div>

                {/* Filter och sökfält */}
                <div className="flex flex-col sm:flex-row mb-8 gap-4">
                    <div className="w-full sm:w-56">
                        <label htmlFor="pickedBy" className="block text-xs font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 mb-1.5">
                            Vald av
                        </label>
                        <div className="grid">
                            <select
                                aria-controls="booksTable"
                                value={filtered}
                                onChange={(e) => setFiltered(e.target.value)}
                                id="pickedBy"
                                name="pickedBy"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-white dark:bg-night-800 border border-paper-300 dark:border-night-700 px-3 py-2 text-sm text-ink-900 dark:text-cream-100 focus:outline-2 focus:outline-amber-400">
                                <option value="all">Alla</option>
                                {options.map(({ value, label }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-4 self-center justify-self-end text-ink-700 dark:text-cream-300">
                                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className="w-full sm:w-64">
                        <label htmlFor="searchBook" className="block text-xs font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 mb-1.5">
                            Sök
                        </label>
                        <input
                            id="searchBook"
                            name="searchBook"
                            type="search"
                            value={searched}
                            onChange={searchBook}
                            autoComplete="off"
                            placeholder="Titel eller författare"
                            className="block w-full rounded-lg bg-white dark:bg-night-800 border border-paper-300 dark:border-night-700 px-3 py-2 text-sm text-ink-900 dark:text-cream-100 placeholder:text-ink-700/50 dark:placeholder:text-cream-300/40 focus:outline-2 focus:outline-amber-400"
                        />
                    </div>
                </div>

                {/* Boktabell */}
                <div className="overflow-x-auto rounded-xl border border-paper-300 dark:border-night-700">
                    <table id="booksTable" className="min-w-full">
                        <thead>
                            <tr className="border-b border-paper-300 dark:border-night-700 bg-paper-100 dark:bg-night-800">
                                <th className="w-14 px-3 py-3" />
                                <th className="px-3 py-3 text-left">
                                    <button
                                        aria-label="Sortera efter titel"
                                        type="button"
                                        onClick={() => handleSort("title")}
                                        data-sorted={sortConfig.order === "title" ? (sortConfig.asc ? "asc" : "desc") : "unsorted"}
                                        className="text-xs font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 whitespace-nowrap">
                                        Titel / Författare
                                    </button>
                                </th>
                                <th className="px-3 py-3 text-left">
                                    <button
                                        aria-label="Sortera efter datum"
                                        onClick={() => handleSort("readDate")}
                                        data-sorted={sortConfig.order === "readDate" ? (sortConfig.asc ? "asc" : "desc") : "unsorted"}
                                        type="button"
                                        className="text-xs font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 whitespace-nowrap">
                                        Läst
                                    </button>
                                </th>
                                <th className="px-3 py-3 text-left">
                                    <button
                                        aria-label="Sortera efter vem som valt boken"
                                        data-sorted={sortConfig.order === "pickedBy" ? (sortConfig.asc ? "asc" : "desc") : "unsorted"}
                                        type="button"
                                        onClick={() => handleSort("pickedBy")}
                                        className="text-xs font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 whitespace-nowrap">
                                        Vald av
                                    </button>
                                </th>
                                <th className="px-3 py-3 text-left">
                                    <button
                                        aria-label="Sortera efter bokklubbens betyg"
                                        type="button"
                                        onClick={() => handleSort("rating")}
                                        data-sorted={sortConfig.order === "rating" ? (sortConfig.asc ? "asc" : "desc") : "unsorted"}
                                        className="text-xs font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 whitespace-nowrap">
                                        Betyg
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        {visibleBooks.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-ink-700 dark:text-cream-300 bg-white dark:bg-night-900">
                                        Inga böcker att visa
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody className="bg-white dark:bg-night-900 divide-y divide-paper-200 dark:divide-night-800">
                                {visibleBooks.map((book) => (
                                    <tr
                                        onClick={() => navigate(`/book/${book.fields.isbn}`, { state: { book } })}
                                        key={book.sys.id}
                                        className="hover:bg-paper-100 dark:hover:bg-night-800 cursor-pointer transition-colors">
                                        <td className="pl-3 pr-2 py-2.5 w-14">
                                            {book.fields.coverImage ? (
                                                <img
                                                    src={book.fields.coverImage}
                                                    alt=""
                                                    className="w-9 h-13 object-cover rounded shadow-sm"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-9 h-13 bg-paper-200 dark:bg-night-700 rounded" />
                                            )}
                                        </td>
                                        <td className="px-3 py-2.5">
                                            <NavLink
                                                to={`/book/${book.fields.isbn}`}
                                                state={{ book }}
                                                className="block font-medium text-ink-900 dark:text-cream-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                                                {book.fields.bookTitle}
                                            </NavLink>
                                            <span className="text-sm text-ink-700 dark:text-cream-300">
                                                {book.fields.author}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2.5 text-sm text-ink-700 dark:text-cream-300 whitespace-nowrap">
                                            {book.fields.readDate ? String(book.fields.readDate).slice(0, 7) : ""}
                                        </td>
                                        <td className="px-3 py-2.5 text-sm text-ink-700 dark:text-cream-300 whitespace-nowrap">
                                            {book.fields.pickedBy}
                                        </td>
                                        <td className="px-3 py-2.5">
                                            <span className="sr-only">{parseFloat(getAverageRating(book))} av 5</span>
                                            <Rating
                                                readonly
                                                allowFraction
                                                initialValue={parseFloat(getAverageRating(book)) || 0}
                                                size={18}
                                                SVGstyle={{ display: "inline-block" }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookList;
