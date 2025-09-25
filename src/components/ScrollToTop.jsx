import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Bara scrolla om vi är på en "book/"-sida och det INTE finns en hash
        if (pathname.startsWith("/book/") && !hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
