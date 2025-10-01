import { useBooks } from "../hooks/useBooks";
import CountUp from "react-countup";
import Navigation from "./Navigation";

const StartpageHero = () => {
    const { books } = useBooks();

    const booksStats = {
        readBooks: books.length,
        readPages: books.reduce((total, book) => total + (book.fields.pages || 0), 0),
        readAuthors: new Set(books.map((book) => book.fields.author)).size,
        booksPerYear: Math.round(books.length / (new Date().getFullYear() - 2020 || 1)),
    };

    const stats = [
        { name: "Lästa böcker", value: booksStats.readBooks },
        { name: "Lästa sidor", value: booksStats.readPages },
        { name: "Lästa författare", value: booksStats.readAuthors },
        { name: "Böcker i snitt per år", value: booksStats.booksPerYear },
    ];
    return (
        <div className="relative isolate overflow-hidden dark:bg-gray-900 bg-bookclub-blue-100  pt-24 sm:pt-32 border-gray-900">
            <div className="absolute hero inset-0 -z-10 size-full object-cover object-right md:object-center border-b border-gray-700 "></div>
            <div className="mx-auto height-full max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <p className="mt-8 sm:text-2xl text-lg  dark:text-white xl:mb-16 font-semibold ">
                        Erik, Tomas och Mathias har sen 2016 läst böcker tillsammans.
                        <br /> Sedan dess har vi hunnit med:
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="flex flex-col-reverse gap-3">
                                <dt className=" dark:text-gray-300 text-xl">{stat.name}</dt>
                                <dd className="text-5xl lg:text-6xl font-semibold tracking-tight dark:text-white">
                                    <CountUp
                                        end={stat.value}
                                        separator=" "
                                    />
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <Navigation />
            </div>
        </div>
    );
};

export default StartpageHero;
