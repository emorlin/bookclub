import { useCallback, useState } from "react";

import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";
import Book from "./components/Book";

function App() {
    const [selectedBook, setSelectedBook] = useState();
    const setSelectedBookWrapper = useCallback((book) => {
        setSelectedBook(book);
    }, []);

    return (
        <>
            <StartpageHero></StartpageHero>
            {selectedBook ? <Book book={selectedBook} /> : <BookList selectedBook={setSelectedBookWrapper}></BookList>}
        </>
    );
}

export default App;
