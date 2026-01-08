// src/types/book.ts

export type BookFields = {
    isbn?: number | string;
    pickedBy?: string;
    readDate?: string;
    bookTitle?: string;
    bookLink?: string;
    author?: string;
    authorLink?: string;

    goodreadGrade?: number;
    eriksGrade?: number;
    tomasGrade?: number;
    mathiasGrade?: number;

    publisherName?: string;
    langName?: string | null;
    originalTitle?: string;

    authorsSex?: string;
    pages?: number;
    country?: string;
    releaseYear?: string | number;
    coverImage?: string;
    genres?: string;

    [key: string]: unknown;
};
