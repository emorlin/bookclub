import { useCallback, useState } from "react";

import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Book from "./components/Book";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
    const [selectedBook, setSelectedBook] = useState(null);
    const handleSelectedBook = useCallback((book) => {
        setSelectedBook(book);
    }, []);

    return (
        <>
            <ErrorBoundary fallback="Error">
                <StartpageHero></StartpageHero>
                {selectedBook ? (
                    <Book book={selectedBook} />
                ) : (
                    <BookList onSelectedBook={handleSelectedBook}></BookList>
                )}
            </ErrorBoundary>
        </>
    );
}

export default App;
