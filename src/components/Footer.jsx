const Footer = () => {
    return (
        <footer className="w-full bg-paper-200 dark:bg-night-950 dark:text-cream-200 py-10 border-t border-paper-300 dark:border-night-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <figure>
                    <blockquote lang="en" className="italic text-lg text-ink-800 dark:text-cream-200 border-l-2 border-amber-400 pl-4">
                        "I cannot remember the books I've read any more than the meals I have eaten; even so, they have made me."
                    </blockquote>
                    <figcaption className="block text-sm mt-2 pl-4 not-italic text-ink-700 dark:text-cream-300">
                        — <cite>Ralph Waldo Emerson</cite>
                    </figcaption>
                </figure>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-ink-700 dark:text-cream-300">
                    <p>&copy; 2026 Bokklubben</p>
                    <p>
                        <a
                            className="underline hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                            href="https://github.com/emorlin/bookclub">
                            Källkod på GitHub
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
