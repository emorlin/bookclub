import { useEffect, useCallback, useState } from "react";

import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Book from "./components/Book";
import Bookstats from "./components/BookStats";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router";

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
            <BrowserRouter>
                <ErrorBoundary fallback="Något har gått fruktansvärt fel.">
                    <Header></Header>
                    <main>
                        <Routes>
                            <Route
                                index
                                element={
                                    <>
                                        <StartpageHero />
                                        <Bookstats />
                                        <BookList />
                                    </>
                                }
                            />
                            <Route
                                path="/book/:isbn"
                                element={<Book />}
                            />
                        </Routes>
                    </main>
                    <Footer></Footer>
                </ErrorBoundary>
            </BrowserRouter>
        </>
    );
}

export default App;
