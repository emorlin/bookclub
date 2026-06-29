import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Statistics from "./pages/Statistics";
import About from "./pages/About";
import Book from "./components/Book";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { useModal } from "./hooks/useModal";
import Modal from "./components/Modal";
import ScrollToTop from "./components/ScrollToTop";

function PageHeader({ title }) {
    return (
        <div className="relative isolate overflow-hidden bg-paper-100 dark:bg-night-900 pt-24 sm:pt-28 pb-8 border-b border-paper-300 dark:border-night-700">
            <div className="absolute hero inset-0 -z-10 size-full" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-cream-100">{title}</h2>
            </div>
        </div>
    );
}

function App() {
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
                        <ScrollToTop />
                        <Routes>
                            <Route
                                index
                                element={
                                    <>
                                        <StartpageHero />
                                        <main
                                            className="bg-paper-50 dark:bg-night-900"
                                            id="mainCointent">
                                            <BookList />
                                        </main>
                                    </>
                                }
                            />
                            <Route
                                path="/book/:isbn"
                                element={
                                    <main
                                        className="bg-paper-50 dark:bg-night-900"
                                        id="mainCointent">
                                        <Book />
                                    </main>
                                }
                            />

                            <Route
                                path="/statistik"
                                element={
                                    <main
                                        className="bg-paper-50 dark:bg-night-900"
                                        id="mainCointent">
                                        <PageHeader title="Statistik" />
                                        <Statistics />
                                    </main>
                                }
                            />

                            <Route
                                path="/om"
                                element={
                                    <main
                                        className="bg-paper-100 dark:bg-night-900"
                                        id="mainCointent">
                                        <PageHeader title="Om bokklubben" />
                                        <About />
                                    </main>
                                }
                            />
                        </Routes>
                        <GlobalModal />
                    </ModalProvider>
                    <Footer></Footer>
                </ErrorBoundary>
            </BrowserRouter>
        </>
    );
}

export default App;
