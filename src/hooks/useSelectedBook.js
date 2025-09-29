// src/hooks/useSelectedBook.js
import { useBooks } from "./useBooks";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export function useSelectedBook() {
    const { books } = useBooks();
    const location = useLocation();
    const { isbn: isbnParam } = useParams();
    const navigate = useNavigate();

    const selectedBook = useMemo(() => {
        let book = location.state?.book;
        if (!book && books.length > 0) {
            book = books.find((b) => b.fields.isbn === Number(isbnParam));
        }

        if (!book) {
            navigate("/", { replace: true });
        }

        return book;
    }, [books, location.state, isbnParam, navigate]);

    return selectedBook;
}
