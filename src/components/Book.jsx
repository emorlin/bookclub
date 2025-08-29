import { getBookByIsbn } from "../api/isbnLookup";
import { getCover } from "../api/getCover";
import { useEffect, useState } from "react";
import { getAverageRating } from "../utils/bookstats/ratings";
import { formatDate } from "../utils/formatter";
const Book = (selectedBook) => {
    console.log(selectedBook);

    const {
        bookTitle,
        author,
        isbn,
        pages,
        country,
        pickedBy,
        eriksGrade,
        tomasGrade,
        mathiasGrade,
        authorsSex,
        goodreadGrade,
        readDate,
    } = selectedBook.book.fields;
    const [bookCover, setBookCover] = useState(null);
    const [loadingCover, setLoadingCover] = useState(true);
    const [coverError, setCoverError] = useState(false);
    // const [bookData, setBookdata] = useState(null);

    useEffect(() => {
        let alive = true;
        setLoadingCover(true);
        setCoverError(false);
        getCover(isbn)
            .then((url) => {
                if (!alive) return;
                if (url) setBookCover(url);
                else setCoverError(true);
            })
            .catch((e) => {
                if (alive) setCoverError(true);
                console.error("getCover error:", e);
            })
            .finally(() => {
                if (alive) setLoadingCover(false);
            });
        return () => {
            alive = false;
        };
    }, [isbn]);
    /*
    useEffect(() => {
        let alive = true;

        // Debug: logga vilket ISBN som används
        console.log("Fetching book by ISBN:", isbn, typeof isbn);

        getBookByIsbn(isbn)
            .then((data) => {
                if (!alive) return;
                console.log("getBookByIsbn raw result:", data); // 👈 debug
                setBookdata(data);
            })
            .catch((e) => {
                console.error("getBookByIsbn error:", e);
                setBookdata(null);
            });

        return () => {
            alive = false;
        };
    }, [isbn]);
    */
    /*
    if (bookData) {
        console.log(bookData);
    } else {
        console.log("no book data");
    }
*/

    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="lg:max-w-lg">
                            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {bookTitle}
                            </h2>
                            <p className="mt-4  text-2xl font-semibold">{author}</p>
                            <p className="mt-2">Bokklubbens betyg: {getAverageRating(selectedBook.book)}</p>
                            <p>Vald av: {pickedBy}</p>
                            <p>Läst i {formatDate(readDate)}</p>
                            <div>
                                <div class="px-4 sm:px-0 mt-8">
                                    <h3 class="text-base/7 font-semibold text-gray-900">Bokinformation:</h3>
                                </div>
                                <div class="mt-4 border-t border-gray-100">
                                    <dl class="divide-y divide-gray-100">
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">ISBN</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{isbn}</dd>
                                        </div>
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">Land</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {country}
                                            </dd>
                                        </div>
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">Antal sidor</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{pages}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div>
                                <div class="px-4 sm:px-0 mt-8">
                                    <h3 class="text-base/7 font-semibold text-gray-900">Satta betyg:</h3>
                                </div>
                                <div class="mt-4 border-t border-gray-100">
                                    <dl class="divide-y divide-gray-100">
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">Eriks betyg</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {eriksGrade}
                                            </dd>
                                        </div>
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">Tomas betyg</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {tomasGrade}
                                            </dd>
                                        </div>
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">Mathias betyg</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {mathiasGrade}
                                            </dd>
                                        </div>
                                        <div class="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm/6 font-medium text-gray-900">Goodreads betyg</dt>
                                            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {goodreadGrade}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loadingCover ? (
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500" />
                    ) : bookCover ? (
                        <img
                            src={bookCover}
                            alt={bookTitle}
                            className="max-w-100"
                        />
                    ) : coverError ? (
                        <img
                            src="/missingCover.png"
                            alt="Omslag saknas"
                            className="max-w-100"
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Book;
