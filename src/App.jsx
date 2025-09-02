import { use, useCallback, useState } from "react";

import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Book from "./components/Book";
import ErrorBoundary from "./components/ErrorBoundary";
import navigationValues from "./navigation/navigationValues";
import navigationContext from "./navigation/navigationContext";
import ComponentPicker from "./components/ComponentPicker";
import Header from "./components/Header";

function App() {
    const [selectedBook, setSelectedBook] = useState(null);

    const handleSelectedBook = useCallback((book) => {
        setSelectedBook(book);
    }, []);

    const navigate = useCallback((navTo) => setNav(navTo), []);
    const [nav, setNav] = useState({ current: navigationValues.home, navigate });

    return (
        <>
            <navigationContext.Provider value={nav}>
                <ErrorBoundary fallback="Error">
                    <Header></Header>
                    <main>
                        {selectedBook ? (
                            <Book book={selectedBook} />
                        ) : (
                            <>
                                {" "}
                                <StartpageHero></StartpageHero>
                                <BookList onSelectedBook={handleSelectedBook}></BookList>
                            </>
                        )}
                        {/*  <ComponentPicker currentLocation={nav.current}></ComponentPicker>*/}
                    </main>
                </ErrorBoundary>
            </navigationContext.Provider>
        </>
    );
}

export default App;
