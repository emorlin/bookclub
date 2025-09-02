import { useBooks } from "../context/BooksContext";
import { formatNumber } from "../utils/formatter";
import CountUp from "react-countup";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 z-50 border-b border-gray-800">
            <div
                className="max-w-7xl mx-auto px-6 lg:px-8  flex flex-row
                justify-between items-center gap-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Bokklubben</h1>
                <nav className="flex text-center">
                    <ul className="flex flex-row gap-6">
                        <li>
                            <button
                                className="px-4 py-2 rounded-xl border border-white text-white cursor-pointer"
                                type="button">
                                Lägg till bok
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
