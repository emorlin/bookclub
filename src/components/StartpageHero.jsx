import { useBooks } from "../hooks/useBooks";
import CountUp from "react-countup";

const StartpageHero = () => {
    const { books } = useBooks();

    const booksStats = {
        readBooks: books.length,
        readPages: books.reduce((total, book) => total + (book.fields.pages || 0), 0),
        readAuthors: new Set(books.map((book) => book.fields.author)).size,
        booksPerYear: Math.round(books.length / (new Date().getFullYear() - 2016 || 1)),
    };

    const stats = [
        { name: "Lästa böcker", value: booksStats.readBooks },
        { name: "Lästa sidor", value: booksStats.readPages },
        { name: "Unika författare", value: booksStats.readAuthors },
        { name: "Böcker per år i snitt", value: booksStats.booksPerYear },
    ];

    return (
        <div className="relative isolate overflow-hidden bg-paper-100 dark:bg-night-900 pt-28 sm:pt-36 pb-14 sm:pb-20">
            <div className="absolute hero inset-0 -z-10 size-full" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl lg:mx-0">
                    <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 dark:text-amber-400 mb-4">
                        Sedan 2016
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-bold text-ink-900 dark:text-cream-100 leading-tight">
                        Erik, Tomas & Mathias
                        <br />
                        läser böcker tillsammans.
                    </h2>
                </div>

                <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.name} className="flex flex-col gap-1">
                            <dd className="text-5xl lg:text-6xl font-bold text-ink-900 dark:text-cream-100 tabular-nums">
                                <CountUp end={stat.value} separator=" " />
                            </dd>
                            <dt className="text-sm text-ink-700 dark:text-cream-300 mt-1">{stat.name}</dt>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default StartpageHero;
