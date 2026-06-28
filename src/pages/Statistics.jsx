import { NavLink } from "react-router-dom";
import {} from "../utils/bookstats/ratings";
import { Rating } from "react-simple-star-rating";
import { useBookStats } from "../hooks/useBookStats";
import AuthorGender from "../components/AuthorGender";
import BooksPerMonthChart from "../components/BooksPerMonthChart";

function Statistics() {
    const {
        books,
        topRatedBooks,
        lowestRatedBooks,
        longestBook,
        shortestBook,
        averageRatingPerReader,
        perUserAveragesRecieved,
        perUserAveragesRecievedExcludeSelf,
        countries,
        pagesPerUser,
        averageRatingPerReaderSorted,
        getAverageRating,
    } = useBookStats();

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-ink-900 dark:text-cream-100 py-12 sm:py-16">

            <h2 className="text-3xl font-bold mb-6">Böckerna</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <StatCard title="De bästa" subtitle="Betyg fem från alla">
                    <ul className="mt-4 space-y-3">
                        {topRatedBooks.map((book) => (
                            <BookStatItem key={book.sys.id} book={book} getAverageRating={getAverageRating} />
                        ))}
                    </ul>
                </StatCard>

                <StatCard title="De sämsta" subtitle="Bottennappen">
                    <ul className="mt-4 space-y-3">
                        {lowestRatedBooks.map((book) => (
                            <BookStatItem key={book.sys.id} book={book} getAverageRating={getAverageRating} />
                        ))}
                    </ul>
                </StatCard>

                <StatCard title="Längst och kortast" subtitle="">
                    {longestBook && (
                        <>
                            <p className="mt-3 text-sm text-ink-700 dark:text-cream-300">Längsta boken</p>
                            <span className="text-4xl font-bold block mt-1 mb-2">{longestBook.fields.pages} sidor</span>
                            <BookStatItem book={longestBook} getAverageRating={getAverageRating} />
                        </>
                    )}
                    {shortestBook && (
                        <>
                            <p className="mt-6 text-sm text-ink-700 dark:text-cream-300">Kortaste boken</p>
                            <span className="text-4xl font-bold block mt-1 mb-2">{shortestBook.fields.pages} sidor</span>
                            <BookStatItem book={shortestBook} getAverageRating={getAverageRating} />
                        </>
                    )}
                </StatCard>
            </div>

            <h2 className="text-3xl font-bold mb-2 mt-12">Medlemmarna</h2>
            <h3 className="text-base font-semibold text-ink-700 dark:text-cream-300 mb-6">Utdelat snittbetyg</h3>

            {averageRatingPerReader && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <StatCard title="Alla böcker" subtitle="">
                        <ul className="mt-4 space-y-2">
                            {averageRatingPerReaderSorted("overall").map(([userName, stats]) => (
                                <ScoreRow key={userName} name={userName} value={stats.overall} />
                            ))}
                        </ul>
                    </StatCard>
                    <StatCard title="Valda böcker" subtitle="">
                        <ul className="mt-4 space-y-2">
                            {averageRatingPerReaderSorted("ownPicks").map(([userName, stats]) => (
                                <ScoreRow key={userName} name={userName} value={stats.ownPicks} />
                            ))}
                        </ul>
                    </StatCard>
                    <StatCard title="Andras böcker" subtitle="">
                        <ul className="mt-4 space-y-2">
                            {averageRatingPerReaderSorted("othersPicks").map(([userName, stats]) => (
                                <ScoreRow key={userName} name={userName} value={stats.othersPicks} />
                            ))}
                        </ul>
                    </StatCard>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                {averageRatingPerReader && (
                    <div>
                        <h3 className="text-base font-semibold mb-4 mt-6">Mottaget snittbetyg</h3>
                        <StatCard title="" subtitle="">
                            <ul className="space-y-2">
                                {perUserAveragesRecieved.map(({ name, averageScore }) => (
                                    <ScoreRow key={name} name={name} value={averageScore} />
                                ))}
                            </ul>
                        </StatCard>
                    </div>
                )}
                {averageRatingPerReader && (
                    <div>
                        <h3 className="text-base font-semibold mb-4 mt-6">
                            Mottaget snittbetyg
                            <span className="text-xs font-normal text-ink-700 dark:text-cream-300 block">(egna betyg borträknat)</span>
                        </h3>
                        <StatCard title="" subtitle="">
                            <ul className="space-y-2">
                                {perUserAveragesRecievedExcludeSelf.map(({ name, averageScore }) => (
                                    <ScoreRow key={name} name={name} value={averageScore} />
                                ))}
                            </ul>
                        </StatCard>
                    </div>
                )}
                {averageRatingPerReader && (
                    <div>
                        <h3 className="text-base font-semibold mb-4 mt-6">Sidor på valda böcker</h3>
                        <StatCard title="" subtitle="">
                            <ul className="space-y-2">
                                {pagesPerUser.map(({ name, sum }) => (
                                    <ScoreRow key={name} name={name} value={sum} />
                                ))}
                            </ul>
                        </StatCard>
                    </div>
                )}
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Författarna</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {books && (
                    <div>
                        <h3 className="text-base font-semibold mb-4">Könsfördelning</h3>
                        <AuthorGender books={books} />
                    </div>
                )}
                {countries && (
                    <div>
                        <h3 className="text-base font-semibold mb-4">Var ifrån?</h3>
                        <StatCard title="" subtitle="">
                            <ul lang="en" className="space-y-2">
                                {Object.entries(countries)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([country, count]) => (
                                        <ScoreRow key={country} name={country} value={count} />
                                    ))}
                            </ul>
                        </StatCard>
                    </div>
                )}
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Läsgnista — när på året</h2>
            <div className="rounded-xl border border-paper-300 dark:border-night-700 bg-white dark:bg-night-800 p-4">
                <BooksPerMonthChart books={books} />
            </div>
        </div>
    );
}

function StatCard({ title, subtitle, children }) {
    return (
        <div className="rounded-xl border border-paper-300 dark:border-night-700 bg-white dark:bg-night-800 p-5">
            {title && <h4 className="text-xl font-semibold">{title}</h4>}
            {subtitle && <p className="mt-1 text-sm text-ink-700 dark:text-cream-300">{subtitle}</p>}
            {children}
        </div>
    );
}

function ScoreRow({ name, value }) {
    return (
        <li className="flex justify-between items-center text-sm">
            <span className="text-ink-800 dark:text-cream-200">{name}</span>
            <span className="font-bold text-ink-900 dark:text-cream-100">{value ?? "—"}</span>
        </li>
    );
}

function BookStatItem({ book, getAverageRating }) {
    return (
        <li>
            <NavLink
                to={`/book/${book.fields.isbn}`}
                className="font-semibold underline underline-offset-2 decoration-1 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                {book.fields.bookTitle}
            </NavLink>
            <span className="text-sm text-ink-700 dark:text-cream-300">, {book.fields.author}</span>
            <div className="flex items-center gap-2 mt-0.5">
                <Rating
                    readonly
                    allowFraction
                    initialValue={parseFloat(getAverageRating(book)) || 0}
                    size={14}
                    SVGstyle={{ display: "inline-block" }}
                />
                <span className="text-xs text-ink-700 dark:text-cream-300">Vald av {book.fields.pickedBy}</span>
            </div>
        </li>
    );
}

export default Statistics;
