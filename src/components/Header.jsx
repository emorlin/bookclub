import { useModal } from "../hooks/useModal";
import ThemeToggler from "../components/ThemeToggler";
const Header = () => {
    const { openModal, isOpen } = useModal();

    return (
        <>
            <a
                className="text-black bg-white focus:relative z-99 p-4 w-auto text-center"
                href="#mainCointent">
                Hoppa till huvudinnehållet
            </a>
            <header className="fixed top-0 left-0 w-full bg-bookclub-blue-200 dark:bg-gray-900 dark:text-white py-4 z-50 border-b dark:border-gray-800">
                <div
                    className="max-w-7xl mx-auto px-6 lg:px-8  flex flex-row
                justify-between items-center gap-6 lg:px-8">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                        <a href="/">Bokklubben</a>
                    </h1>
                    <ThemeToggler />
                    <button
                        aria-controls="book-modal"
                        aria-expanded={isOpen}
                        onClick={() => openModal({})}
                        className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-lg rounded-lg sm:rounded-xl border focus:text-black focus:bg-white border-w
                        hite dark:text-white focus:dark:text-black cursor-pointer">
                        Lägg till bok
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
