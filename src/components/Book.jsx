import { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getCover } from "../api/getCover";
import { getAverageRating } from "../utils/bookstats/ratings";
import { formatDate } from "../utils/formatter";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../context/BooksContext";
import { useModal } from "../context/ModalContext";

const Book = () => {
    const { books } = useBooks();
    const location = useLocation();
    let selectedBook = location.state?.book;
    const { openModal } = useModal();
    let fields = selectedBook?.fields ?? {};

    const { isbn: isbnParam } = useParams();
    const isbn = fields.isbn ?? isbnParam;
    const nav = useNavigate();

    if (!selectedBook) {
        selectedBook = books.find((book) => book.fields.isbn === Number(isbn));
        fields = selectedBook?.fields ?? {};
        if (!fields) {
            nav("/", { replace: true });
        }
    }
    console.log(fields);
    const {
        bookTitle = "",
        author = "",
        pages,
        pickedBy,
        eriksGrade,
        tomasGrade,
        mathiasGrade,
        goodreadGrade,
        readDate,
        bookLink,
        authorLink,
        publisherName,
        langName,
        releaseYear,
        originalTitle,
    } = fields;

    // 3) State
    const [bookCover, setBookCover] = useState(null);
    const [loadingCover, setLoadingCover] = useState(true);
    const [coverError, setCoverError] = useState(false);

    // 5) Mappning av språk till svenska
    const languageLabel = useMemo(() => {
        if (!langName) return null;
        if (langName === "English") return "Engelska";
        if (langName === "Swedish") return "Svenska";
        return langName;
    }, [langName]);

    // 6) Hämta omslag
    useEffect(() => {
        if (!isbn) return;
        let alive = true;
        setLoadingCover(true);
        setCoverError(false);
        getCover(isbn)
            .then((url) => {
                if (!alive) return;
                if (url) setBookCover(url);
                else setCoverError(true);
            })
            .catch(() => {
                if (alive) setCoverError(true);
            })
            .finally(() => {
                if (alive) setLoadingCover(false);
            });
        return () => {
            alive = false;
        };
    }, [isbn]);

    // Om både selectedBook saknas och getBookByIsbn returnerar null → visa felmeddelande

    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8">
                        <div className="lg:max-w-lg">
                            {bookTitle && (
                                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                    {bookLink ? (
                                        <a
                                            className="underline underline-offset-2 decoration-2"
                                            href={bookLink}
                                            target="_blank"
                                            rel="noreferrer">
                                            {bookTitle}
                                        </a>
                                    ) : (
                                        bookTitle
                                    )}
                                </h2>
                            )}
                            {author && (
                                <p className="mt-2 text-2xl font-semibold">
                                    {authorLink ? (
                                        <a
                                            className="underline underline-offset-2 decoration-1"
                                            href={authorLink}
                                            target="_blank"
                                            rel="noreferrer">
                                            {author}
                                        </a>
                                    ) : (
                                        author
                                    )}
                                </p>
                            )}

                            {selectedBook && (
                                <p className="mt-2 mb-4">
                                    <Rating
                                        readonly
                                        allowFraction
                                        initialValue={parseFloat(getAverageRating(selectedBook)) || 0}
                                        size={26}
                                        SVGstyle={{ display: "inline-block" }}
                                    />
                                </p>
                            )}

                            {pickedBy && <p>Vald av: {pickedBy}</p>}
                            {readDate && <p>Läst i {formatDate(readDate)}</p>}

                            {selectedBook && (
                                <dl className="mt-6">
                                    <div className="flex gap-2">
                                        <dt className="inline">Eriks betyg:</dt>
                                        <dd className="inline">{eriksGrade}</dd>
                                    </div>
                                    <div className="flex gap-2">
                                        <dt className="inline">Tomas betyg:</dt>
                                        <dd className="inline">{tomasGrade}</dd>
                                    </div>
                                    <div className="flex gap-2">
                                        <dt className="inline">Mathias betyg:</dt>
                                        <dd className="inline">{mathiasGrade}</dd>
                                    </div>
                                    <div className="flex gap-2">
                                        <dt className="inline">Betyg från Goodreads:</dt>
                                        <dd className="inline">{goodreadGrade}</dd>
                                    </div>
                                </dl>
                            )}
                            <button
                                onClick={() => openModal({ isbn })}
                                className="mt-8 px-2 py-1 rounded border border-black text-black text-sm cursor-pointer">
                                Uppdatera bokdata
                            </button>
                            <div className="mt-8">
                                <h3 className="text-base/7 font-semibold text-gray-900">Bokinformation:</h3>
                                <div className="mt-2 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        {isbn && (
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">ISBN</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {bookLink ? (
                                                        <a
                                                            className="text-blue-600"
                                                            href={bookLink}
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            <span className="underline">{isbn}</span> ⧉
                                                        </a>
                                                    ) : (
                                                        isbn
                                                    )}
                                                </dd>
                                            </div>
                                        )}

                                        {pages && (
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Antal sidor</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {pages}
                                                </dd>
                                            </div>
                                        )}

                                        {publisherName && (
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Förlag</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {publisherName}
                                                </dd>
                                            </div>
                                        )}

                                        {languageLabel && (
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Språk</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {languageLabel}
                                                </dd>
                                            </div>
                                        )}

                                        {releaseYear && (
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Utgivninsår</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {releaseYear}
                                                </dd>
                                            </div>
                                        )}

                                        {originalTitle && !bookTitle && (
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm/6 font-medium text-gray-900">Originaltitel</dt>
                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {originalTitle}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Omslag */}
                    <div className="max-w-sm">
                        {loadingCover ? (
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500" />
                        ) : bookCover ? (
                            <img
                                src={bookCover}
                                alt={bookTitle || originalTitle || "Omslag"}
                                className="w-auto"
                            />
                        ) : coverError ? (
                            <img
                                src="/missingCover.png"
                                alt="Omslag saknas"
                                className="w-auto"
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
