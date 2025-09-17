import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext(null);

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

export function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal must be used within a ModalProvider");
    return ctx;
}
