import { useBooks } from "../context/BooksContext";
import { getTopRatedBooks, getAverageRating } from "../utils/bookstats/ratings";
import loadingStatus from "../utils/loadingStatus";
import LoadingIndicator from "./LoadingIndicator";

function BookList({ selectedBook }) {
    const { books, status } = useBooks();

    if (status !== loadingStatus.loaded) {
        return (
            <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                    <div className="overflow-x-auto">
                        <LoadingIndicator status={status} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                    <div className="overflow-x-auto">
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-2xl">
                            Alla lästa böcker {status}
                        </h2>
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 whitespace-nowrap text-left align-bottom">Läst</th>
                                    <th className="px-4 py-2 text-left align-bottom">Vald av</th>
                                    <th className="px-4 py-2 text-left align-bottom">Titel</th>
                                    <th className="px-4 py-2 text-left align-bottom">Författare</th>
                                    <th className="px-4 py-2 text-left align-bottom">Bokklubbens betyg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr
                                        onClick={() => selectedBook(book)}
                                        key={book.sys.id}
                                        className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {book.fields.readDate
                                                ? new Date(book.fields.readDate).toLocaleDateString()
                                                : ""}
                                        </td>
                                        <td className="px-4 py-2">{book.fields.pickedBy}</td>
                                        <td className="px-4 py-2">{book.fields.bookTitle}</td>
                                        <td className="px-4 py-2">{book.fields.author}</td>
                                        <td className="px-4 py-2 text-1xl">{getAverageRating(book)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookList;
