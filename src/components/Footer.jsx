const Footer = () => {
    return (
        <footer className=" mt-2 sm:mt-4 left-0 w-full bg-gray-900 text-white py-8 z-50 border-t border-t-2 border-gray-600">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
                <blockquote
                    lang="en"
                    className="italic text-xl">
                    "I cannot remember the books I've read any more than the meals I have eaten; even so, they have made
                    me."
                    <footer className="block text-sm">Ralph Waldo Emerson</footer>
                </blockquote>
                <p className="mt-8">&copy; 2025 Bokklubben</p>
                <p className="mt-6 text-m">
                    <a
                        className="underline"
                        href="https://github.com/emorlin/bookclub">
                        Källkoden till bokklubben på GitHub
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
