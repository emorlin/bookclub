import { useEffect, useRef, useState } from "react";
import { useBooks } from "../context/BooksContext";
import { allHighestRatedBooks } from "../utils/bookstats/ratings";
import { NavLink } from "react-router-dom";

import { Rating } from "react-simple-star-rating";
function Statistics() {
    const { books } = useBooks();
    const topRatedBooks = allHighestRatedBooks(books);

    console.log(topRatedBooks);
    return (
        <>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white  py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
                        <h2 className="text-3xl font-semibold">De bästa böckerna</h2>
                        <p className="mt-1 text-m text-gray-200">Betyg fem från alla</p>
                        <Rating
                            readonly
                            allowFraction
                            initialValue={5}
                            size={20}
                            SVGstyle={{ display: "inline-block" }} // för säkerhets skull
                        />
                        <ul className="mt-4 space-y-2 flex flex-col ">
                            {topRatedBooks.map((book) => (
                                <li
                                    className="text-xl/5"
                                    key={book.sys.id}>
                                    <NavLink
                                        to={`/book/${book.fields.isbn}`}
                                        className="hover:underline">
                                        <h3 className="mb-0">
                                            <span className="font-bold">{book.fields.bookTitle}, </span>
                                            {book.fields.author}
                                        </h3>
                                        <span className="text-sm"> Vald av: {book.fields.pickedBy} </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
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
