import { useBooks } from "../context/BooksContext";
import { useMemo } from "react";
import {
    getAllHighestRatedBooks,
    getAllLowestRatedBooks,
    getLongestBook,
    getShortestBook,
    getAverageRating,
} from "../utils/bookstats/ratings";
import { getPerUserAverages, getPerUserAveragesRecieved, getPagesPerUser } from "../utils/bookstats/readers";
import { NavLink } from "react-router-dom";
import {} from "../utils/bookstats/ratings";

import { Rating } from "react-simple-star-rating";
function Statistics() {
    const { books } = useBooks();
    const topRatedBooks = useMemo(() => getAllHighestRatedBooks(books), [books]); // getAllHighestRatedBooks(books);
    const lowestRatedBooks = useMemo(() => getAllLowestRatedBooks(books), [books]); // getAllLowestRatedBooks(books);
    const longestBook = useMemo(() => getLongestBook(books), [books]); // getLongestBook(books);
    const shortestBook = useMemo(() => getShortestBook(books), [books]); // getShortestBook(books);

    const averageRatingPerReader = useMemo(() => getPerUserAverages(books), [books]);

    const perUserAveragesRecieved = useMemo(() => getPerUserAveragesRecieved(books ?? []), [books]);

    const perUserAveragesRecievedExcludeSelf = useMemo(() => getPerUserAveragesRecieved(books ?? [], true), [books]);

    const pagesPerUser = useMemo(() => getPagesPerUser(books ?? []), [books]);
    console.log(pagesPerUser);

    const averageRatingPerReaderSorted = (key) =>
        Object.entries(averageRatingPerReader).sort(([, a], [, b]) => {
            const valA = a[key] ?? -Infinity; // Hantera null
            const valB = b[key] ?? -Infinity;
            return valB - valA; // Högst först
        });

    return (
        <>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white  py-12 sm:py-16">
                <h2 className="text-4xl font-semibold mb-8">Böckerna</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                        <h2 className="text-3xl font-semibold">De bästa</h2>
                        <p className="mt-1 text-m text-gray-200">Betyg fem från alla</p>
                        <ul className="mt-4 space-y-2 flex flex-col ">
                            {topRatedBooks.map((book) => (
                                <li
                                    className="text-xl/5"
                                    key={book.sys.id}>
                                    <h3 className="mb-1">
                                        <NavLink
                                            to={`/book/${book.fields.isbn}`}
                                            className="underline underline-offset-2 decoration-1">
                                            <span className="font-bold">{book.fields.bookTitle}, </span>
                                            {book.fields.author}
                                        </NavLink>
                                    </h3>
                                    <span className="text-sm"> Vald av: {book.fields.pickedBy} </span>
                                    <span className="text-sm block">
                                        {" "}
                                        Betyg:
                                        <Rating
                                            className="-mt-1 ml-2"
                                            readonly
                                            allowFraction
                                            initialValue={parseFloat(getAverageRating(book)) || 0}
                                            size={16}
                                            SVGstyle={{ display: "inline-block" }}
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                        <h2 className="text-3xl font-semibold">De sämsta</h2>
                        <p className="mt-1 text-m text-gray-200">Bottennappen</p>

                        <ul className="mt-4 space-y-2 flex flex-col gap-1 ">
                            {lowestRatedBooks.map((book) => (
                                <li
                                    className="text-xl/5"
                                    key={book.sys.id}>
                                    <h3 className="mb-1">
                                        <NavLink
                                            to={`/book/${book.fields.isbn}`}
                                            className="underline underline-offset-2 decoration-1">
                                            <span className="font-bold">{book.fields.bookTitle}, </span>
                                            {book.fields.author}
                                        </NavLink>
                                    </h3>

                                    <span className="text-sm block"> Vald av: {book.fields.pickedBy} </span>
                                    <span className="text-sm block">
                                        {" "}
                                        Betyg:
                                        <Rating
                                            className="-mt-1 ml-2"
                                            readonly
                                            allowFraction
                                            initialValue={parseFloat(getAverageRating(book)) || 0}
                                            size={16}
                                            SVGstyle={{ display: "inline-block" }}
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                        <h2 className="text-3xl font-semibold">Längst och kortast</h2>

                        {longestBook && (
                            <>
                                <p className="mt-1 text-m text-gray-200">Längsta boken</p>

                                <div
                                    className="text-xl/5 mt-2"
                                    key={longestBook.sys.id}>
                                    <span className="text-4xl block bold mt-0 mb-2">
                                        {longestBook.fields.pages} sidor
                                    </span>

                                    <h3 className="mb-1">
                                        <NavLink
                                            to={`/book/${longestBook.fields.isbn}`}
                                            className="underline underline-offset-2 decoration-1">
                                            <span className="font-bold">{longestBook.fields.bookTitle}, </span>
                                            {longestBook.fields.author}
                                        </NavLink>
                                    </h3>

                                    <span className="text-sm block"> Vald av: {longestBook.fields.pickedBy} </span>
                                    <span className="text-sm block">
                                        {" "}
                                        Betyg:
                                        <Rating
                                            className="-mt-1 ml-2"
                                            readonly
                                            allowFraction
                                            initialValue={parseFloat(getAverageRating(longestBook)) || 0}
                                            size={16}
                                            SVGstyle={{ display: "inline-block" }}
                                        />
                                    </span>
                                </div>
                            </>
                        )}
                        {shortestBook && (
                            <>
                                <p className="mt-8 text-m text-gray-200">Kortaste boken</p>
                                <div
                                    className="text-xl/5 mt-2"
                                    key={shortestBook.sys.id}>
                                    <span className="text-4xl block bold mt-0 mb-2">
                                        {shortestBook.fields.pages} sidor
                                    </span>
                                    <h3 className="mb-1">
                                        <NavLink
                                            to={`/book/${shortestBook.fields.isbn}`}
                                            className="underline underline-offset-2 decoration-1">
                                            <span className="font-bold">{shortestBook.fields.bookTitle}, </span>
                                            {shortestBook.fields.author}
                                        </NavLink>
                                    </h3>
                                    <span className="text-sm block"> Vald av: {shortestBook.fields.pickedBy} </span>
                                    <span className="text-sm block">
                                        {" "}
                                        Betyg:
                                        <Rating
                                            className="-mt-1 ml-2"
                                            readonly
                                            allowFraction
                                            initialValue={parseFloat(getAverageRating(shortestBook)) || 0}
                                            size={16}
                                            SVGstyle={{ display: "inline-block" }}
                                        />
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <h2 className="text-4xl font-semibold mb-2 mt-8">Medlemmarna</h2>
                <h3 className="text-xl font-bold mb-8">Utdelat snittbetyg</h3>
                {averageRatingPerReader && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                                <h4 className="text-xl ">Alla böcker</h4>

                                <div className=" mt-2">
                                    <ul className="mt-4 space-y-2 flex flex-col ">
                                        {averageRatingPerReaderSorted("overall").map(([userName, stats]) => (
                                            <li
                                                key={userName}
                                                className="flex justify-between">
                                                <span>{userName}:</span>
                                                <span className="font-bold">{stats.overall ?? "—"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                                <h4 className="text-xl ">Valda böcker</h4>

                                <div className=" mt-2">
                                    <ul className="mt-4 space-y-2 flex flex-col ">
                                        {averageRatingPerReaderSorted("ownPicks").map(([userName, stats]) => (
                                            <li
                                                key={userName}
                                                className="flex justify-between">
                                                <span>{userName}:</span>
                                                <span className="font-bold">{stats.ownPicks ?? "—"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                                <h4 className="text-xl ">Andras böcker</h4>

                                <div className=" mt-2">
                                    <ul className="mt-4 space-y-2 flex flex-col ">
                                        {averageRatingPerReaderSorted("othersPicks").map(([userName, stats]) => (
                                            <li
                                                key={userName}
                                                className="flex justify-between">
                                                <span>{userName}:</span>
                                                <span className="font-bold">{stats.othersPicks ?? "—"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {averageRatingPerReader && (
                            <div>
                                <h3 className="text-xl font-bold mb-8 mt-12">Mottaget snittbetyg</h3>
                                <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                                    <div className="">
                                        <ul className="space-y-2 flex flex-col ">
                                            {perUserAveragesRecieved.map(({ name, averageScore }) => (
                                                <li
                                                    key={name}
                                                    className="flex justify-between">
                                                    <span>{name}</span>
                                                    <span className="font-bold">{averageScore ?? "—"}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {averageRatingPerReader && (
                            <div>
                                <h3 className="text-xl font-bold mb-8 mt-12">
                                    Mottaget snittbetyg (egna betyg borträknat)
                                </h3>
                                <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                                    <div className="">
                                        <ul className="space-y-2 flex flex-col ">
                                            {perUserAveragesRecievedExcludeSelf.map(({ name, averageScore }) => (
                                                <li
                                                    key={name}
                                                    className="flex justify-between">
                                                    <span>{name}</span>
                                                    <span className="font-bold">{averageScore ?? "—"}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {averageRatingPerReader && (
                            <div>
                                <h3 className="text-xl font-bold mb-8 mt-12">Antal sidor på valda böcker</h3>
                                <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                                    <div className="">
                                        <ul className=" space-y-2 flex flex-col ">
                                            {pagesPerUser.map(({ name, sum }) => (
                                                <li
                                                    key={name}
                                                    className="flex justify-between">
                                                    <span>{name}</span>
                                                    <span className="font-bold">{sum ?? "—"}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white  py-12 sm:py-16">
                <h2>Statistik att visa</h2>
                <h3>Om böcker</h3>
                <ul>
                    <li>Böcker med högsta betyg</li>
                    <li>Sämsta böckerna</li>
                    <li>Störst spridning</li>
                    <li>Kortaste och längsta</li>
                </ul>
                <h3>Statestik om bokklubbsmeddlemmarna</h3>
                <ul>
                    <li>Genomsnittligt poäng</li>
                    <li>Mottagna poäng</li>
                    <li>Vem har fått högst snittbetyg</li>
                    <li>Vem har fått lägst snittbetyg</li>
                    <li>Vem ger sig själv högst betyg</li>
                    <li>Totalt antal sidor</li>
                    <li>Mest avvikande smak</li>
                    <li>Mest mainstream</li>
                    <li>Skillnad mot goodreads</li>
                </ul>
                <h3>Statestik över tid</h3>
                <ul>
                    <li>Antal böcker lästa per månad/år</li>
                    <li>Snittbetyg över tid</li>
                    <li>Mest aktiva månad på året</li>
                    <li>Boklängd över tid</li>
                </ul>
                <h3>Övrigt</h3>
                <ul>
                    <li>Mest oeniga medlemmarna</li>
                    <li>Mest eniga medlemmarna</li>
                    <li>Könskampen</li>
                    <li>Böcker per land</li>
                </ul>
            </div>
        </>
    );
}

export default Statistics;
