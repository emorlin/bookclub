import { getBookByIsbn } from "../api/isbnLookup";
const Book = (selectedBook) => {
    console.log(selectedBook);

    const { bookTitle, author, isbn } = selectedBook.book.fields;
    const bookData = getBookByIsbn(isbn);
    if (bookData) {
        console.log(bookData);
    } else {
        console.log("no book data");
    }

    const features = [
        {
            name: "Push to deploy.",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
        },
        {
            name: "SSL certificates.",
            description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
        },
        {
            name: "Database backups.",
            description: "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
        },
    ];

    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <button>tillbaka till listan</button>
                        <div className="lg:max-w-lg">
                            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {bookTitle}
                            </h2>
                            <p className="mt-4  text-2xl font-semibold">{author}</p>
                            <p className="mt-2">isbn: {isbn}</p>
                            <p className="mt-6 text-lg/8 text-gray-700">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                                suscipit eaque, iste dolor cupiditate blanditiis ratione.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div
                                        key={feature.name}
                                        className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">{feature.name}</dt>{" "}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        alt="Product screenshot"
                        src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                        width={2432}
                        height={1442}
                        className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default Book;
