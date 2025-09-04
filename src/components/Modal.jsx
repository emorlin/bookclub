import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { getBookByIsbn } from "../api/isbnLookup";
import { toSelectOptions, readers } from "../utils/readers";

export default function Modal() {
    const [open, setOpen] = useState(false);
    const [isbn, setIsbn] = useState("");
    const [fetchedData, setFetchedData] = useState("");

    const canFetch = isbn.trim().length === 10 || isbn.trim().length === 13; // <-- knapp aktiv bara om något skrivits
    const options = toSelectOptions();

    async function handleFetch(e) {
        const raw = isbn;
        const normalized = raw.replace(/[\s-]/g, ""); // ta bort mellanslag/bindestreck
        if (!normalized) return;

        try {
            const bookData = await getBookByIsbn(normalized);
            setFetchedData(bookData);
            console.log("RESULT ←", bookData);
        } catch (err) {
            console.error("getBookByIsbn ERROR:", err);
        }
    }

    function todayYYYYMMDD() {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded-xl border border-white text-white cursor-pointer">
                Lägg till bok
            </button>

            <Dialog
                open={open}
                onClose={setOpen}
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
                                    Lägg till bok
                                </DialogTitle>

                                <form className="mt-6">
                                    <label
                                        htmlFor="isbn"
                                        className="block text-sm/6 font-medium text-gray-900">
                                        ISBN
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="isbn"
                                            name="isbn"
                                            type="text"
                                            autoComplete="off"
                                            value={isbn}
                                            onChange={(e) => setIsbn(e.target.value)}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="978…"
                                        />
                                        <button
                                            type="button"
                                            disabled={!canFetch}
                                            onClick={() => handleFetch()}
                                            className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
                                            Hämta
                                        </button>
                                    </div>

                                    <label
                                        htmlFor="bookTitle"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Titel
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="bookTitle"
                                            name="bookTitle"
                                            type="text"
                                            autoComplete="off"
                                            value={fetchedData.title}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="Vredens druvor"
                                        />
                                    </div>

                                    <label
                                        htmlFor="author"
                                        className="block text-sm/6 font-medium text-gray-900 mt-4">
                                        Författare
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            id="author"
                                            name="author"
                                            type="text"
                                            autoComplete="off"
                                            value={fetchedData.authors}
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
                                            autoComplete="off"
                                            value={fetchedData.pages}
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
                                            defaultValue={todayYYYYMMDD()}
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
                                            id="location"
                                            name="location"
                                            className="block w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="">Välj</option>
                                            {options.map(({ value, label }) => (
                                                <option
                                                    key={value}
                                                    value={value}>
                                                    {label}
                                                </option>
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
                                        Betyg från Goodreads
                                    </label>
                                    <div className="mt-2 flex gap-2">
                                        <select
                                            id="goodreadGrade"
                                            name="goodreadGrade"
                                            className="block w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
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
                                            defaultValue=""
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
                                            id="bookLink"
                                            name="bookLink"
                                            type="text"
                                            autoComplete="off"
                                            defaultValue=""
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                            id="authorLink"
                                            name="authorLink"
                                            type="text"
                                            autoComplete="off"
                                            defaultValue=""
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="https://goodreads..."
                                        />
                                    </div>
                                    <div className="mt-12 flex flex-row-reverse gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                                            Lägg till bok
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
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
