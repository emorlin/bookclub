import { useBooks } from "../context/BooksContext";
import { getTopRatedBooks } from "../utils/bookstats/ratings";

function BookList({ selectedBook }) {
    const { books } = useBooks();

    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
            <h2>To rated books</h2>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 whitespace-nowrap text-left align-bottom">Läst</th>
                                <th className="px-4 py-2 text-left align-bottom">Vald av</th>
                                <th className="px-4 py-2 text-left align-bottom">Titel</th>
                                <th className="px-4 py-2 text-left align-bottom">Författare</th>
                                <th className="px-4 py-2 text-left align-bottom">Snittbetyg</th>
                                <th className="px-4 py-2 text-left align-bottom">Erik betyg</th>
                                <th className="px-4 py-2 text-left align-bottom">Tomas betyg</th>
                                <th className="px-4 py-2 text-left align-bottom">Mathias betyg</th>
                                <th className="px-4 py-2 text-left align-bottom">Goodreads betyg</th>
                                <th className="px-4 py-2 text-left align-bottom">Sidor</th>
                                <th className="px-4 py-2 text-left align-bottom">Land</th>
                                <th className="px-4 py-2 text-left align-bottom">ISBN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    onClick={() => selectedBook(book)}
                                    key={book.sys.id}
                                    className="border-b border-gray-700">
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {book.fields.readDate
                                            ? new Date(book.fields.readDate).toLocaleDateString()
                                            : ""}
                                    </td>
                                    <td className="px-4 py-2">{book.fields.pickedBy}</td>
                                    <td className="px-4 py-2">{book.fields.bookTitle}</td>
                                    <td className="px-4 py-2">{book.fields.author}</td>
                                    <td className="px-4 py-2 text-1xl">
                                        {(
                                            (book.fields.eriksGrade +
                                                book.fields.tomasGrade +
                                                book.fields.mathiasGrade) /
                                            3
                                        ).toFixed(2) === "5.00" ? (
                                            <span className="text-yellow-400">5.00 ⭐</span>
                                        ) : (
                                            (
                                                (book.fields.eriksGrade +
                                                    book.fields.tomasGrade +
                                                    book.fields.mathiasGrade) /
                                                3
                                            ).toFixed(2)
                                        )}
                                    </td>

                                    <td className="px-4 py-2">{book.fields.eriksGrade}</td>
                                    <td className="px-4 py-2">{book.fields.tomasGrade}</td>
                                    <td className="px-4 py-2">{book.fields.mathiasGrade}</td>
                                    <td className="px-4 py-2">{book.fields.goodreadGrade}</td>
                                    <td className="px-4 py-2">{book.fields.pages}</td>
                                    <td className="px-4 py-2">{book.fields.country}</td>
                                    <td className="px-4 py-2">{book.fields.isbn}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookList;
