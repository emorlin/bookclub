import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul className="mt-24 sm:mt-32 flex flex-wrap text-sm font-medium text-center text-gray-500">
                <li className="me-2">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `inline-block p-4 rounded-t-lg border-l border-r border-t border-gray-700 ${
                                isActive
                                    ? "text-white bg-gray-800 active"
                                    : "text-white hover:text-gray-600 hover:bg-gray-50"
                            }`
                        }>
                        Lästa böcker
                    </NavLink>
                </li>

                <li className="me-2">
                    <NavLink
                        to="/statistik"
                        className={({ isActive }) =>
                            `inline-block p-4 rounded-t-lg border-l border-r border-t border-gray-700  ${
                                isActive
                                    ? "text-white bg-gray-800 active"
                                    : "text-white hover:text-gray-600 hover:bg-gray-50"
                            }`
                        }>
                        Statistik
                    </NavLink>
                </li>

                <li className="me-2">
                    <NavLink
                        to="/om"
                        className={({ isActive }) =>
                            `inline-block p-4 rounded-t-lg border-l border-r border-t border-gray-700  ${
                                isActive
                                    ? "text-white bg-gray-800 active"
                                    : "text-white hover:text-gray-600 hover:bg-gray-50"
                            }`
                        }>
                        Om
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
