const Navigation = () => {
    return (
        <ul className="mt-24 sm:mt-32 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-700 ">
            <li className="me-2">
                <a
                    href="#"
                    aria-current="page"
                    className="inline-block p-4 text-white bg-gray-800 rounded-t-lg active ">
                    Lästa böcker
                </a>
            </li>
            <li className="me-2">
                <a
                    href="#"
                    className="inline-block p-4 rounded-t-lg text-white hover:text-gray-600 hover:bg-gray-50">
                    Statistik
                </a>
            </li>
            <li className="me-2">
                <a
                    href="#"
                    className="inline-block p-4 rounded-t-lg text-white hover:text-gray-600 hover:bg-gray-50 ">
                    Om
                </a>
            </li>
        </ul>
    );
};

export default Navigation;
