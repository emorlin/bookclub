import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";
import { BooksProvider } from "./context/BooksContext.jsx";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider publishableKey={publishableKey}>
            <BooksProvider>
                <App />
            </BooksProvider>
        </ClerkProvider>
    </StrictMode>
);
