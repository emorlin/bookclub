import { useEffect, useCallback, useState } from "react";

import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Book from "./components/Book";
import ErrorBoundary from "./components/ErrorBoundary";

import ComponentPicker from "./components/ComponentPicker";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    useEffect(() => {
        document.body.classList.add("bg-gray-900");
    }, []);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleSelectedBook = useCallback((book) => {
        setSelectedBook(book);
    }, []);

    return (
        <>
            <ErrorBoundary fallback="Något har gått fruktansvärt fel.">
                <Header></Header>
                <main>
                    {selectedBook ? (
                        <Book book={selectedBook} />
                    ) : (
                        <>
                            <StartpageHero></StartpageHero>
                            <BookList onSelectedBook={handleSelectedBook}></BookList>
                        </>
                    )}
                    {/*  <ComponentPicker currentLocation={nav.current}></ComponentPicker>*/}
                </main>
                <Footer></Footer>
            </ErrorBoundary>
        </>
    );
}

export default App;
