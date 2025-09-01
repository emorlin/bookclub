import { createContext, useContext, useEffect, useState } from "react";
import { getAllBooks } from "../api/books";
import loadingStatus from "../utils/loadingStatus";

const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("loadingStatus.isLoading");

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                setStatus(loadingStatus.isLoading);
                const data = await getAllBooks();
                if (!alive) return;
                setBooks(data || []);
                setStatus(loadingStatus.loaded);
            } catch (e) {
                if (!alive) return;
                console.warning(e);
                setStatus(loadingStatus.error);
            }
        })();

        return () => {
            alive = false;
        };
    }, []);

    return <BooksContext.Provider value={{ books, setBooks, status }}>{children}</BooksContext.Provider>;
}

export function useBooks() {
    return useContext(BooksContext);
}
