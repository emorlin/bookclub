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

                        <Routes>
                            <Route
                                index
                                element={
                                    <>
                                        <StartpageHero />
                                        <main id="mainCointent">
                                            <Bookstats />
                                            <BookList />
                                        </main>
                                    </>
                                }
                            />
                            <Route
                                path="/book/:isbn"
                                element={
                                    <main id="mainCointent">
                                        <Book />
                                    </main>
                                }
                            />

                            <Route
                                path="/statistik"
                                element={
                                    <>
                                        <StartpageHero />
                                        <main id="mainCointent">
                                            <Statistics />
                                        </main>
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
                        <GlobalModal />

                        <Footer></Footer>
                    </ModalProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </>
    );
}

export default App;
