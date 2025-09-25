import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

export function useBooks() {
    const ctx = useContext(BooksContext);
    if (!ctx) throw new Error("useModal must be used within a ModalProvider");
    return ctx;
}
