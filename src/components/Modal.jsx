import { useEffect, useState, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { getBookByIsbn } from "../api/isbnLookup";
import { toSelectOptions, readers } from "../utils/readers";
import { useBooks } from "../context/BooksContext";

export default function Modal({ open = false, setOpen = () => {}, data }) {
    const [formPassword, setFormPassword] = useState("");
    const isFirstRender = useRef(true);
    const { books } = useBooks();
    const options = toSelectOptions();
    const [loading, setLoading] = useState(false);
    const [bookData, setBookData] = useState("idle");

    const [fields, setFields] = useState({
        isbn: "",
        pickedBy: "",
        readDate: "",
        bookTitle: "",
        bookLink: "",
        author: "",
        authorLink: "",
        goodreadGrade: "",
        eriksGrade: "",
        tomasGrade: "",
        mathiasGrade: "",
        authorsSex: "",
        pages: "",
        country: "",
        releaseYear: "",
        coverImage: "",
    });

    const canFetch =
        (fields.isbn || "").replace(/[\s-]/g, "").length === 10 ||
        (fields.isbn || "").replace(/[\s-]/g, "").length === 13;

    // om man kommer från boksidan (det finns en vald bok)
    const selectedBook = books.find((book) => book.fields.isbn === Number(data?.isbn)) || {};

    const isUpdate = !!data?.isbn;
    const modalHeading = isUpdate ? "Uppdatera bok" : "Lägg till ny bok";
    const modalSubmitText = isUpdate ? "Uppdatera" : "Lägg till";

    useEffect(() => {
        if (open) {
            if (isUpdate && selectedBook) {
                // Fyll i formuläret med existerande bokdata
                setFields({
                    isbn: String(selectedBook.fields.isbn ?? ""),
                    pickedBy: selectedBook.fields.pickedBy ?? "",
                    readDate: selectedBook.fields.readDate ?? "",
                    bookTitle: selectedBook.fields.bookTitle ?? "",
                    bookLink: selectedBook.fields.bookLink ?? "",
                    author: selectedBook.fields.author ?? "",
                    authorLink: selectedBook.fields.authorLink ?? "",
                    goodreadGrade: selectedBook.fields.goodreadGrade ?? "",
                    eriksGrade: selectedBook.fields.eriksGrade ?? "",
                    tomasGrade: selectedBook.fields.tomasGrade ?? "",
                    mathiasGrade: selectedBook.fields.mathiasGrade ?? "",
                    authorsSex: selectedBook.fields.authorsSex ?? "",
                    pages: selectedBook.fields.pages ?? "",
                    country: selectedBook.fields.country ?? "",
                    releaseYear: selectedBook.fields.releaseYear ?? "",
                    coverImage: selectedBook.fields.coverImage ?? "",
                });
            } else {
                // Rensa formuläret för ny bok
                setFields({
                    isbn: "",
                    pickedBy: "",
                    readDate: todayYYYYMMDD(),
                    bookTitle: "",
                    bookLink: "",
                    author: "",
                    authorLink: "",
                    goodreadGrade: "",
                    eriksGrade: "",
                    tomasGrade: "",
                    mathiasGrade: "",
                    authorsSex: "",
                    pages: "",
                    country: "",
                    releaseYear: "",
                    coverImage: "",
                });
            }
        }
    }, [open, isUpdate, data]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (bookData === false) {
            alert("Ingen bokdata hittad");
        } else if (bookData && bookData !== "idle") {
            alert("Eventuell information om boken är nu uppdaterad");
            console.log("bookData", bookData);
        }
    }, [bookData]);

    //kan jag använda min fetchdata?
    useEffect(() => {
        if (open && isUpdate && fields) {
            if (!open) {
                setFields((p) => ({ ...p, isbn: "" }));
            }
            console.log("fields", fields);
        }
    }, [open, data, fields, isUpdate]);

    //denna ska uppdaterasd nu
    async function handleFetch() {
        const normalized = fields.isbn.replace(/[\s-]/g, "");
        if (!normalized) return;

        if (normalized.length !== 10 && normalized.length !== 13) return;

        setLoading(true);
        try {
            const fetchedBookData = await getBookByIsbn(normalized);
            setBookData(fetchedBookData || false); // false betyder "inget hittat"
            console.log("fetchedBookData.coverImage");
            console.log(fetchedBookData.coverImage);
            setFields((prev) => ({
                ...prev, // behåll alla gamla värden
                bookTitle: fetchedBookData?.title ?? "",
                author: fetchedBookData?.authors ?? "",
                pages: fetchedBookData?.pages ?? "",
                releaseYear: fetchedBookData?.releaseYear ?? "",
                coverImage: fetchedBookData?.coverImage ?? "",
            }));
        } catch (err) {
            console.error("getBookByIsbn ERROR:", err);
        } finally {
            setLoading(false);
        }
    }

    function todayYYYYMMDD() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(
            2,
            "0"
        )}`;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());
        setLoading(true);
        const path = isUpdate ? `/api/contentful/updateBook` : `/api/contentful/createBook`;

        try {
            const res = await fetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-Form-Secret": formPassword },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) {
                console.error("Create failed:", data);
                alert("Misslyckades att lägga till boken: " + data.error);
                setLoading(false);
                return;
            }

            alert("Bok skapad! ID: " + data.id);
            form.reset();
            setOpen(false);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Fetch error:", err);
            alert("Nätverksfel, försök igen.");
        }
    }
    return (
        <div>
            <Dialog
                open={Boolean(open)}
                onClose={() => setOpen(false)}
                className="relative z-100"
                id="modal">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="sm:flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-semibold text-gray-900">
                                    {modalHeading}
                                </DialogTitle>

                                <button
                                    aria-label="Stäng modalen"
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="bold absolute top-4 right-4 cursor-pointer">
                                    ⨉
                                </button>
                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-6">
                                    <label
                                        htmlFor="formPassword"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4 mb-2">
                                        Lösenord
                                    </label>
                                    <input
                                        id="formPassword"
                                        type="password"
                                        autoComplete="off"
                                        defaultValue={formPassword}
                                        onChange={(e) => setFormPassword(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        placeholder="Skriv lösenordet"
                                        required
                                    />

                                    <fieldset className="border border-gray-300 rounded-md p-4 mt-8">
                                        <legend className="text-m font-medium text-gray-700 px-1">
                                            Information om boken
                                        </legend>
                                        <p className="text-sm text-gray-700">
                                            <i>
                                                För att uppdatera detta med information från internet, fyll i ISBN och
                                                klicka på "Hämta bokdata", eller skriv in manuellt.
                                            </i>
                                        </p>
                                        <div className="mt-2 ">
                                            <label
                                                htmlFor="isbn"
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                ISBN 10 eller 13 siffror (obligatorisk)
                                            </label>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    required
                                                    id="isbn"
                                                    name="isbn"
                                                    type="text"
                                                    autoComplete="off"
                                                    defaultValue={fields.isbn}
                                                    inputMode="numeric"
                                                    readOnly={isUpdate}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    placeholder="978…"
                                                />

                                                <button
                                                    type="button"
                                                    disabled={!canFetch}
                                                    onClick={() => handleFetch()}
                                                    className="inline-flex min-w-40 whitespace-nowrap w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
                                                    {loading ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500" />
                                                    ) : (
                                                        "Hämta bokdata"
                                                    )}
                                                </button>
                                            </div>
                                            <label
                                                htmlFor="bookTitle"
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                Titel (obligatorisk)
                                            </label>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    required
                                                    id="bookTitle"
                                                    name="bookTitle"
                                                    type="text"
                                                    autoComplete="off"
                                                    defaultValue={fields.bookTitle}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    placeholder="Vredens druvor"
                                                />
                                            </div>
                                            <label
                                                htmlFor="author"
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                Författare (obligatorisk)
                                            </label>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    required
                                                    id="author"
                                                    name="author"
                                                    type="text"
                                                    autoComplete="off"
                                                    defaultValue={fields.author}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    placeholder="John Steinbeck"
                                                />
                                            </div>
                                            <label
                                                htmlFor="pages"
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                Sidantal
                                            </label>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    id="pages"
                                                    name="pages"
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete="off"
                                                    defaultValue={fields.pages}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    placeholder="436"
                                                />
                                            </div>
                                            <label
                                                htmlFor="pages"
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                Utgivningsår
                                            </label>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    id="releaseYear"
                                                    name="releaseYear"
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete="off"
                                                    length="4"
                                                    defaultValue={fields.releaseYear}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    placeholder="1984"
                                                />
                                            </div>
                                            <label
                                                htmlFor="pages"
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                Omslagsbild (ej editerbar)
                                            </label>

                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    id="coverImage"
                                                    name="coverImage"
                                                    type="text"
                                                    autoComplete="off"
                                                    length="4"
                                                    defaultValue={fields.coverImage}
                                                    onChange={handleChange}
                                                    readOnly
                                                    className="block w-full max-w-100% rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    placeholder="https://assets.hardcover.app/..."
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <label
                                        htmlFor="readDate"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        När läst
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <input
                                            id="readDate"
                                            name="readDate"
                                            type="date"
                                            defaultValue={fields.readDate}
                                            onChange={handleChange}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-3 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <label
                                        htmlFor="pickedBy"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Vald av
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            onChange={handleChange}
                                            id="location"
                                            name="pickedBy"
                                            defaultValue={fields.pickedBy}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            {options.map(({ value, label }) => (
                                                <option key={value}>{label}</option>
                                            ))}
                                        </select>
                                        <svg
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                            <path
                                                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    {readers.map(({ name, field }) => (
                                        <div key={name}>
                                            <label
                                                htmlFor={name}
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                {name} betyg
                                            </label>
                                            <div className="mt-2 grid grid-cols-1">
                                                <select
                                                    id={name}
                                                    name={field}
                                                    onChange={handleChange}
                                                    defaultValue={fields[field]}
                                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    data-slot="icon"
                                                    aria-hidden="true"
                                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                                    <path
                                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                    <label
                                        htmlFor="goodreadGrade"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Betyg från Goodreads
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="goodreadGrade"
                                            name="goodreadGrade"
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={fields.goodreadGrade}
                                            onChange={handleChange}
                                            pattern="^(?:[1-4](?:[.,]\d+)?|5(?:[.,]0+)?)$"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="3,5"
                                        />
                                    </div>
                                    <label
                                        htmlFor="authorsSex"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Författarens kön
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id="authorsSex"
                                            name="authorsSex"
                                            defaultValue={fields.authorsSex}
                                            onChange={handleChange}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option value="Male">Man</option>
                                            <option value="Female">Kvinna</option>
                                        </select>
                                        <svg
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                            <path
                                                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <label
                                        htmlFor="country"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Land
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={fields.country}
                                            onChange={handleChange}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="Germany"
                                        />
                                    </div>
                                    <label
                                        htmlFor="bookLink"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Länk till författarens sida på Goodreads
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            id="bookLink"
                                            name="bookLink"
                                            type="url"
                                            inputMode="url"
                                            autoComplete="url"
                                            onChange={handleChange}
                                            defaultValue={fields.bookLink}
                                            pattern="https?://.+"
                                            placeholder="https://goodreads..."
                                        />
                                    </div>
                                    <label
                                        htmlFor="authorLink"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Länk till bokens sida på Goodreads
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            id="authorLink"
                                            name="authorLink"
                                            type="url"
                                            inputMode="url"
                                            autoComplete="url"
                                            onChange={handleChange}
                                            defaultValue={fields.authorLink}
                                            pattern="https?://.+"
                                            placeholder="https://goodreads..."
                                        />
                                    </div>
                                    <div className="mt-12 flex flex-row-reverse gap-2">
                                        <button
                                            type="submit"
                                            className="inline-flex min-w-30 w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                                            {loading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500" />
                                            ) : (
                                                modalSubmitText
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex min-w-30 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                            {loading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500" />
                                            ) : (
                                                <>Avbryt</>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
