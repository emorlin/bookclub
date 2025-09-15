import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { getBookByIsbn } from "../api/isbnLookup";
import { toSelectOptions, readers } from "../utils/readers";
import { useBooks } from "../context/BooksContext";

export default function Modal({ open = false, setOpen = () => {}, data }) {
    const [formPassword, setFormPassword] = useState("");
    const [fetchedData, setFetchedData] = useState({ title: "", authors: "", pages: "" });
    const { books } = useBooks();
    const options = toSelectOptions();

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
                });
            }
        }
    }, [open, isUpdate, data]);

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
        try {
            const bookData = await getBookByIsbn(normalized);
            setFields((prev) => ({
                ...prev, // behåll alla gamla värden
                bookTitle: bookData?.title ?? "",
                author: bookData?.authors ?? "",
                pages: bookData?.pages ?? "",
            }));
        } catch (err) {
            console.error("getBookByIsbn ERROR:", err);
        }
    }

    /*
    async function handleFetch() {
  const normalized = (fields.isbn || "").replace(/[\s-]/g, "");
  if (!normalized) return;

  try {
    const bookData = await getBookByIsbn(normalized);

    const title = bookData?.title ?? "";
    // authors kan vara sträng eller array – normalisera:
    const author =
      Array.isArray(bookData?.authors)
        ? bookData.authors.filter(Boolean).join(", ")
        : (bookData?.authors ?? "");

    const pages = bookData?.pages ?? "";

    setFields((prev) => ({
      ...prev,                 // behåll allt som redan skrivits in
      isbn: prev.isbn || normalized, // fyll om tomt
      bookTitle: prev.bookTitle || title,
      author: prev.author || author,
      pages: prev.pages || String(pages || ""),
      // lägg gärna fler mappningar här om API:t returnerar mer som du vill spara
      // country: prev.country || bookData.country ?? "",
      // bookLink: prev.bookLink || bookData.bookUrl ?? "",
      // authorLink: prev.authorLink || bookData.authorUrl ?? "",
    }));
  } catch (err) {
    console.error("getBookByIsbn ERROR:", err);
    alert("Kunde inte hämta info för ISBN.");
  }
}
s
    */

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

        try {
            const res = await fetch("/api/contentful/createBook", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-Form-Secret": formPassword },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) {
                console.error("Create failed:", data);
                alert("Misslyckades att lägga till boken: " + data.error);
                return;
            }

            alert("Bok skapad! ID: " + data.id);
            form.reset();
            setIsbn("");
            setOpen(false); // ✅ stäng via prop-funktionen
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Nätverksfel, försök igen.");
        }
    }
    return (
        <div>
            <Dialog
                open={Boolean(open)} // ✅ Headless UI kräver ren boolean
                onClose={() => setOpen(false)} // ✅ stäng även via backdrop/ESCz
                className="relative z-100">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="sm:flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-semibold text-gray-900">
                                    {modalHeading}
                                </DialogTitle>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-6">
                                    <label
                                        htmlFor="formPassword"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4 mb-2">
                                        Lösenord (krävs för att kunna lägga till en bok)
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
                                    <label
                                        htmlFor="isbn"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        ISBN (obligatorisk)
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
                                            onClick={() => handleFetch()}
                                            className="inline-flex whitespace-nowrap w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
                                            Hämta bokdata
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
                                        htmlFor="readDate"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        När läst
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="readDate"
                                            name="readDate"
                                            type="date"
                                            defaultValue={fields.readDate}
                                            onChange={handleChange}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <label
                                        htmlFor="pickedBy"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Vald av
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <select
                                            onChange={handleChange}
                                            id="location"
                                            name="pickedBy"
                                            defaultValue={fields.pickedBy}
                                            className="block w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            {options.map(({ value, label }) => (
                                                <option key={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {readers.map(({ displayName, gradeField }) => (
                                        <div key={displayName}>
                                            <label
                                                htmlFor={displayName}
                                                className="block text-sm/6 font-medium text-gray-900 mt-4">
                                                {displayName} betyg
                                            </label>
                                            <div className="mt-2 flex gap-2">
                                                <select
                                                    id={displayName}
                                                    name={gradeField}
                                                    onChange={handleChange}
                                                    defaultValue={fields[gradeField]}
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                    <label
                                        htmlFor="goodreadGrade"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Betyg från Goodreads (obligatorisk)
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="goodreadGrade"
                                            name="goodreadGrade"
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={fields.goodreadGrade}
                                            onChange={handleChange}
                                            required
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
                                    <div className="mt-2 flex gap-2">
                                        <select
                                            id="authorsSex"
                                            name="authorsSex"
                                            defaultValue={fields.authorsSex}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="Male">Man</option>
                                            <option value="Female">Kvinna</option>
                                        </select>
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
                                            className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                                            {modalSubmitText}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                            Avbryt
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
