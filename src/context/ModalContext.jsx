/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useCallback } from "react";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const openModal = useCallback((data = null) => {
        setModalData(data);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalData(null);
    }, []);

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalData, setModalData }}>
            {children}
        </ModalContext.Provider>
    );
}
