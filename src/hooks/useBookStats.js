// src/hooks/useBookStats.js
import { useMemo } from "react";
import { useBooks } from "./useBooks";
import {
    getAllHighestRatedBooks,
    getAllLowestRatedBooks,
    getLongestBook,
    getShortestBook,
    getAverageRating,
} from "../utils/bookstats/ratings";
import { getAuthorsCountriesCount } from "../utils/bookstats/authors";
import { getPerUserAverages, getPerUserAveragesRecieved, getPagesPerUser } from "../utils/bookstats/readers";

export function useBookStats() {
    const { books } = useBooks();

    // Alla beräkningar kapslade i useMemo för optimering
    const topRatedBooks = useMemo(() => getAllHighestRatedBooks(books), [books]);
    const lowestRatedBooks = useMemo(() => getAllLowestRatedBooks(books), [books]);
    const longestBook = useMemo(() => getLongestBook(books), [books]);
    const shortestBook = useMemo(() => getShortestBook(books), [books]);

    const averageRatingPerReader = useMemo(() => getPerUserAverages(books), [books]);
    const perUserAveragesRecieved = useMemo(() => getPerUserAveragesRecieved(books ?? []), [books]);
    const perUserAveragesRecievedExcludeSelf = useMemo(() => getPerUserAveragesRecieved(books ?? [], true), [books]);

    const countries = useMemo(() => getAuthorsCountriesCount(books ?? []), [books]);
    const pagesPerUser = useMemo(() => getPagesPerUser(books ?? []), [books]);

    // Helper-funktion för sortering
    const averageRatingPerReaderSorted = (key) =>
        Object.entries(averageRatingPerReader).sort(([, a], [, b]) => {
            const valA = a[key] ?? -Infinity;
            const valB = b[key] ?? -Infinity;
            return valB - valA;
        });

    return {
        books,
        topRatedBooks,
        lowestRatedBooks,
        longestBook,
        shortestBook,
        averageRatingPerReader,
        perUserAveragesRecieved,
        perUserAveragesRecievedExcludeSelf,
        countries,
        pagesPerUser,
        averageRatingPerReaderSorted,
        getAverageRating, // skickar med utils om UI behöver dem
    };
}
