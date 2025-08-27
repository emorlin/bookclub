import { useBooks } from "../context/BooksContext";

function BookList() {
    const { books } = useBooks();

    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Titel</th>
                                <th className="px-4 py-2 text-left">Författare</th>
                                <th className="px-4 py-2 text-left">Sidor</th>
                                <th className="px-4 py-2 text-left">Land</th>
                                <th className="px-4 py-2 whitespace-nowrap text-left">Läst datum</th>
                                <th className="px-4 py-2 text-left">Vald av</th>
                                <th className="px-4 py-2 text-left">Goodreads</th>
                                <th className="px-4 py-2 text-left">Erik</th>
                                <th className="px-4 py-2 text-left">Tomas</th>
                                <th className="px-4 py-2 text-left">Mathias</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book.sys.id}
                                    className="border-b border-gray-700">
                                    <td className="px-4 py-2">
                                        {book.fields.bookLink ? (
                                            <a
                                                href={book.fields.bookLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline text-blue-400 hover:text-blue-200">
                                                {book.fields.bookTitle}
                                            </a>
                                        ) : (
                                            book.fields.bookTitle
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {book.fields.authorLink ? (
                                            <a
                                                href={book.fields.authorLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline text-blue-400 hover:text-blue-200">
                                                {book.fields.author}
                                            </a>
                                        ) : (
                                            book.fields.author
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{book.fields.pages}</td>
                                    <td className="px-4 py-2">{book.fields.country}</td>
                                    <td className="px-4 py-2">
                                        {book.fields.readDate
                                            ? new Date(book.fields.readDate).toLocaleDateString()
                                            : ""}
                                    </td>
                                    <td className="px-4 py-2">{book.fields.pickedBy}</td>
                                    <td className="px-4 py-2">{book.fields.goodreadGrade}</td>
                                    <td className="px-4 py-2">{book.fields.eriksGrade}</td>
                                    <td className="px-4 py-2">{book.fields.tomasGrade}</td>
                                    <td className="px-4 py-2">{book.fields.mathiasGrade}</td>
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
