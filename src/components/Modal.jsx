import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { getBookByIsbn } from "../api/isbnLookup";

export default function Modal() {
    const [open, setOpen] = useState(true);

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
                className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="sm:flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <DialogTitle
                                            as="h3"
                                            className="text-lg font-semibold text-gray-900">
                                            Lägg till bok
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <form>
                                                <div className="col-span-full">
                                                    <div className="mt-10">
                                                        <div className="sm:col-span-3">
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
                                                                    autoComplete="none"
                                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                                />
                                                                <button className="cursor-pointer  inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                                                                    hämta
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-full mt-12">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpen(false)}
                                                        className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                                                        Lägg till bok
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-autofocus
                                                        onClick={() => setOpen(false)}
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                                        Avbryt
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
