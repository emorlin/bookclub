import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BooksProvider } from "./context/BooksContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BooksProvider>
            <App />
        </BooksProvider>
    </StrictMode>
);
