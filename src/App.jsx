import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StartpageHero from "./components/StartpageHero";
import BookList from "./components/BookList";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <StartpageHero></StartpageHero>
            <BookList></BookList>
        </>
    );
}

export default App;
