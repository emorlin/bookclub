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
import { ExternalLink, ArrowLeft, Pencil } from "lucide-react";

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
        genres,
    } = fields;

    const languageLabel = useMemo(() => translateLanguage(langName), [langName]);

    return (
        <div className="bg-paper-50 dark:bg-night-900 min-h-screen py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <HashLink
                    smooth
                    to="/#bookstable"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 dark:text-cream-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors mb-10">
                    <ArrowLeft size={15} />
                    Alla lästa böcker
                </HashLink>

                <article className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
                    {/* Vänster kolumn: textinnehåll */}
                    <div>
                        {bookTitle && (
                            <h2 className="text-4xl sm:text-5xl font-bold text-ink-900 dark:text-cream-100 leading-tight">
                                {bookLink ? (
                                    <a
                                        className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                                        href={bookLink}
                                        target="_blank"
                                        rel="noreferrer">
                                        {bookTitle}
                                        <ExternalLink size={20} className="inline-block ml-2 -mt-2 opacity-50" />
                                    </a>
                                ) : (
                                    bookTitle
                                )}
                            </h2>
                        )}

                        {author && (
                            <p className="mt-2 text-xl font-medium text-ink-700 dark:text-cream-300">
                                {authorLink ? (
                                    <a
                                        className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
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
                            <div className="mt-3">
                                <Rating
                                    readonly
                                    allowFraction
                                    initialValue={parseFloat(getAverageRating(selectedBook)) || 0}
                                    size={24}
                                    SVGstyle={{ display: "inline-block" }}
                                />
                                <span className="ml-2 text-sm text-ink-700 dark:text-cream-300">
                                    {getAverageRating(selectedBook)} snitt
                                </span>
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-700 dark:text-cream-300">
                            {pickedBy && <span>Vald av <strong className="text-ink-900 dark:text-cream-100">{pickedBy}</strong></span>}
                            {readDate && <span>Läst i <strong className="text-ink-900 dark:text-cream-100">{formatDate(readDate)}</strong></span>}
                        </div>

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
                            className="mt-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-300 dark:border-night-700 text-sm text-ink-800 dark:text-cream-200 hover:bg-paper-200 dark:hover:bg-night-800 transition-colors cursor-pointer">
                            <Pencil size={13} />
                            Uppdatera bokdata
                        </button>

                        {/* Bokinformation */}
                        <div className="mt-10 pt-8 border-t border-paper-300 dark:border-night-700">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-700 dark:text-cream-300 mb-4">
                                Bokinformation
                            </h3>
                            <dl className="space-y-3">
                                {isbn && (
                                    <InfoRow label="ISBN">
                                        {bookLink ? (
                                            <a
                                                className="text-amber-500 dark:text-amber-400 hover:underline"
                                                href={bookLink}
                                                target="_blank"
                                                rel="noreferrer">
                                                {isbn}
                                                <ExternalLink size={12} className="inline-block ml-1 -mt-0.5" />
                                            </a>
                                        ) : (
                                            isbn
                                        )}
                                    </InfoRow>
                                )}
                                {pages && <InfoRow label="Antal sidor">{pages}</InfoRow>}
                                {publisherName && <InfoRow label="Förlag">{publisherName}</InfoRow>}
                                {languageLabel && <InfoRow label="Språk">{languageLabel}</InfoRow>}
                                {releaseYear && <InfoRow label="Utgivningsår">{releaseYear}</InfoRow>}
                                {genres && <InfoRow label="Genres">{genres}</InfoRow>}
                                {originalTitle && !bookTitle && (
                                    <InfoRow label="Originaltitel">{originalTitle}</InfoRow>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Höger kolumn: omslag */}
                    <div className="lg:pt-2">
                        {coverImage ? (
                            <img
                                src={coverImage}
                                decoding="async"
                                loading="lazy"
                                alt={bookTitle || originalTitle || "Omslag"}
                                className="w-full max-w-[220px] rounded-xl shadow-xl shadow-ink-900/20 dark:shadow-night-950/60"
                            />
                        ) : (
                            <div className="w-full max-w-[220px] aspect-[2/3] rounded-xl bg-paper-200 dark:bg-night-800 border border-paper-300 dark:border-night-700 flex items-center justify-center text-ink-700 dark:text-cream-300 text-sm">
                                Omslag saknas
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

function InfoRow({ label, children }) {
    return (
        <div className="flex gap-4">
            <dt className="text-sm font-medium text-ink-700 dark:text-cream-300 w-32 shrink-0">{label}</dt>
            <dd className="text-sm text-ink-900 dark:text-cream-100">{children}</dd>
        </div>
    );
}

export default Book;
