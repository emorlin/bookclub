import { useEffect, useCallback, useState } from "react";

import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Statistics from "./components/Statistics";
import About from "./components/About";
import Book from "./components/Book";
import Bookstats from "./components/BookStats";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider, useModal } from "./context/ModalContext";
import Modal from "./components/Modal";

function App() {
    useEffect(() => {
        document.body.classList.add("bg-gray-900");
    }, []);

    const [selectedBook, setSelectedBook] = useState(null);
    const handleSelectedBook = useCallback((book) => {
        setSelectedBook(book);
    }, []);

    function GlobalModal() {
        const { isOpen, closeModal, modalData } = useModal();
        return (
            <Modal
                open={isOpen}
                setOpen={closeModal}
                data={modalData}
            />
        );
    }

    return (
        <>
            <BrowserRouter>
                <ErrorBoundary fallback="Något har gått fruktansvärt fel.">
                    <ModalProvider>
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

                                <Route
                                    path="/statistik"
                                    element={
                                        <>
                                            <StartpageHero />
                                            <Statistics />
                                        </>
                                    }
                                />

                                <Route
                                    path="/om"
                                    element={
                                        <>
                                            <StartpageHero />
                                            <About />
                                        </>
                                    }
                                />
                            </Routes>
                            <GlobalModal /> {/* ← exakt EN modal i hela appen */}
                        </main>
                        <Footer></Footer>
                    </ModalProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </>
    );
}

export default App;
