import { useEffect, useRef, useState } from "react";
import { useBooks } from "../context/BooksContext";
import { getAverageRating } from "../utils/bookstats/ratings";
import loadingStatus from "../utils/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";
import sortBooks from "../utils/booksSorter";
import { Rating } from "react-simple-star-rating";
import { toSelectOptions } from "../utils/readers";
import { useNavigate } from "react-router-dom";

function Statistics() {
    const { books, setBooks, status } = useBooks();
    const [sortConfig, setSortConfig] = useState({ order: "readDate", asc: true });
    const [filtered, setFiltered] = useState("all");
    const allBooks = useRef([]);

    const navigate = useNavigate();
    const options = toSelectOptions();

    return (
        <>
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
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white  py-12 sm:py-16">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <li className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow hover:bg-gray-700 focus-within:ring-2 focus-within:ring-indigo-500">
                        <h3 className="mt-3 text-sm font-semibold text-white line-clamp-2">
                            <a
                                href="#"
                                className="focus:outline-none">
                                <span
                                    className=""
                                    aria-hidden="true"></span>
                                Boktitel som kan vara ganska lång
                            </a>
                        </h3>

                        <p className="mt-1 text-xs text-gray-300">Författare • 320 sidor</p>

                        <div className="mt-3 flex items-center justify-between text-xs text-gray-300">
                            <span className="inline-flex items-center gap-1">★ 4.2</span>
                            <button className="rounded-md border border-gray-600 px-2 py-1 hover:bg-gray-700">
                                Öppna
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Statistics;
