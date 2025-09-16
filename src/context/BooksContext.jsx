// Import necessary dependencies from React
import { createContext, useContext, useEffect, useState } from "react";

// Import the getAllBooks function from the books API
import { getAllBooks } from "../api/books";

// Import the loading status constants
import loadingStatus from "../utils/loadingStatus";

// Create a new React context for managing books data
const BooksContext = createContext();

/**
 * BooksProvider component: wraps the BooksContext.Provider component
 * and fetches books data when mounted.
 *
 * @param {object} props - component props
 * @param {ReactNode} props.children - components to be wrapped by the provider
 */
export function BooksProvider({ children }) {
    // Initialize state variables for books data and loading status
    const [books, setBooks] = useState([]); // array of books data

    const [status, setStatus] = useState("loadingStatus.isLoading"); // loading status

    // Use the useEffect hook to fetch books data when the component mounts
    useEffect(() => {
        let alive = true; // flag to check if the component is still mounted

        // Fetch books data asynchronously
        (async () => {
            try {
                // Set the loading status to "loading"
                setStatus(loadingStatus.isLoading);

                // Fetch books data from the API
                const data = await getAllBooks();

                // If the component is still mounted, update the books state
                if (!alive) return;
                setBooks(data || []); // update books state with fetched data

                // Set the loading status to "loaded"
                setStatus(loadingStatus.loaded);
            } catch (e) {
                // If an error occurs, set the loading status to "error"
                if (!alive) return;
                console.warning(e); // log the error
                setStatus(loadingStatus.error);
            }
        })();

        // Return a cleanup function to set the alive flag to false when the component unmounts
        return () => {
            alive = false;
        };
    }, []); // empty dependency array means the effect runs only once on mount

    // Return the BooksContext.Provider component with the books data and loading status
    return <BooksContext.Provider value={{ books, setBooks, status }}>{children}</BooksContext.Provider>;
}

/**
 * useBooks hook: returns the books data from the BooksContext.
 *
 * @returns {object} books data
 */
export function useBooks() {
    // Use the useContext hook to access the BooksContext
    return useContext(BooksContext);
}
