// getCover.js
export const getCover = (isbn) => {
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}.jpg?default=false`;

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(coverUrl); // ✅ returnera url
        img.onerror = () => resolve(null); // ✅ null om den inte finns
        img.src = coverUrl;
    });
};
