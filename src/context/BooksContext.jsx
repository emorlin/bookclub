import { createContext, useContext, useEffect, useState } from "react";
import { getAllBooks } from "../api/books";

const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBooks().then(setBooks);
    }, []);

    return <BooksContext.Provider value={{ books, setBooks }}>{children}</BooksContext.Provider>;
}

export function useBooks() {
    return useContext(BooksContext);
}
