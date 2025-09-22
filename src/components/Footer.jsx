const Footer = () => {
    return (
        <header className=" top-0 left-0 w-full bg-gray-900 text-white py-8 z-50 border-t border-gray-600">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
                <blockquote
                    lang="en"
                    className="italic text-xl">
                    "I cannot remember the books I've read any more than the meals I have eaten; even so, they have made
                    me."
                    <footer className="block text-sm">Ralph Waldo Emerson</footer>
                </blockquote>
                <p className="mt-8">&copy; 2025 Bokklubben</p>
            </div>
        </header>
    );
};

export default Footer;
