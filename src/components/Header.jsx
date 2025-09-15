import CountUp from "react-countup";
import { useModal } from "../context/ModalContext";

const Header = () => {
    const { openModal } = useModal();
    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 z-50 border-b border-gray-800">
            <div
                className="max-w-7xl mx-auto px-6 lg:px-8  flex flex-row
                justify-between items-center gap-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    <a href="/">Bokklubben</a>
                </h1>

                <button
                    onClick={() => openModal({})}
                    className="px-4 py-2 rounded-xl border border-white text-white cursor-pointer">
                    Lägg till bok
                </button>
            </div>
        </header>
    );
};

export default Header;
