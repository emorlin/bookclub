import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAverageRating } from "../utils/bookstats/ratings";
import { formatDate } from "../utils/formatter";
import { Rating } from "react-simple-star-rating";
import BookRatings from "../components/BookRatings";
import { useModal } from "../hooks/useModal";
import { HashLink } from "react-router-hash-link";
import { translateLanguage } from "../utils/languageLookup";
import { useSelectedBook } from "../hooks/useSelectedBook";

const Book = () => {
    const selectedBook = useSelectedBook();
    const { openModal, isOpen } = useModal();
    const fields = selectedBook?.fields ?? {};
    const { isbn: isbnParam } = useParams();
    const isbn = fields.isbn ?? isbnParam;

    const {
        bookTitle,
        author,
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
        coverImage,
    } = fields;

    const languageLabel = useMemo(() => translateLanguage(langName), [langName]);

    return (
        <div className="overflow-hidden bg-white py-22 sm:py-26">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <HashLink
                    smooth
                    to="/#bookstable"
                    className="relative -top-6 inline-block text-md font-semibold leading-6 text-pretty">
                    ← <span className="underline">Alla lästa böcker</span>
                </HashLink>
                <article className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
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
                                <BookRatings
                                    eriksGrade={eriksGrade}
                                    tomasGrade={tomasGrade}
                                    mathiasGrade={mathiasGrade}
                                    goodreadGrade={goodreadGrade}
                                />
                            )}

                            <button
                                onClick={() => openModal({ isbn })}
                                aria-controls="book-modal"
                                aria-expanded={isOpen}
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
                                        {pages && <InfoRow label="Antal sidor">{pages}</InfoRow>}
                                        {publisherName && <InfoRow label="Förlag">{publisherName}</InfoRow>}
                                        {languageLabel && <InfoRow label="Språk">{languageLabel}</InfoRow>}
                                        {releaseYear && <InfoRow label="Utgivningsår">{releaseYear}</InfoRow>}
                                        {originalTitle && !bookTitle && (
                                            <InfoRow label="Originaltitel">{originalTitle}</InfoRow>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-xs">
                        {coverImage ? (
                            <img
                                src={coverImage}
                                decoding="async"
                                loading="lazy"
                                alt={bookTitle || originalTitle || "Omslag"}
                                className="w-auto"
                            />
                        ) : (
                            <img
                                src="/missingCover.png"
                                alt="Omslag saknas"
                                className="w-auto"
                            />
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

function InfoRow({ label, children }) {
    return (
        <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">{label}</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{children}</dd>
        </div>
    );
}
export default Book;
