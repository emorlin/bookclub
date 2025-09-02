import CountUp from "react-countup";
import Modal from "./Modal";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 z-50 border-b border-gray-800">
            <div
                className="max-w-7xl mx-auto px-6 lg:px-8  flex flex-row
                justify-between items-center gap-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Bokklubben</h1>
                <Modal></Modal>
            </div>
        </header>
    );
};

export default Header;
