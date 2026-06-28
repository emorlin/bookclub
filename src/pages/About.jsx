import { useMemo } from "react";
import { useBooks } from "../hooks/useBooks";
import { getAverageRating } from "../utils/bookstats/ratings";

function About() {
    const { books } = useBooks();

    const stats = useMemo(() => {
        if (!books.length) return null;

        const totalBooks = books.length;
        const totalPages = books.reduce((t, b) => t + (b.fields.pages || 0), 0);

        const booksWithRating = books.filter((b) => getAverageRating(b) !== null);
        const overallAvg =
            booksWithRating.length > 0
                ? (
                      booksWithRating.reduce((t, b) => t + parseFloat(getAverageRating(b)), 0) /
                      booksWithRating.length
                  ).toFixed(1)
                : null;

        const sorted = [...booksWithRating].sort(
            (a, b) => parseFloat(getAverageRating(b)) - parseFloat(getAverageRating(a))
        );
        const topBook = sorted[0];
        const bottomBook = sorted[sorted.length - 1];

        const booksWithPages = books.filter((b) => b.fields.pages);
        const avgPages =
            booksWithPages.length > 0
                ? Math.round(booksWithPages.reduce((t, b) => t + b.fields.pages, 0) / booksWithPages.length)
                : null;
        const minPages = booksWithPages.length > 0 ? Math.min(...booksWithPages.map((b) => b.fields.pages)) : null;
        const maxPages = booksWithPages.length > 0 ? Math.max(...booksWithPages.map((b) => b.fields.pages)) : null;

        const maleCount = books.filter((b) => b.fields.authorsSex === "Male").length;
        const femaleCount = books.filter((b) => b.fields.authorsSex === "Female").length;
        const genderTotal = maleCount + femaleCount;
        const malePct = genderTotal > 0 ? Math.round((maleCount / genderTotal) * 100) : null;
        const femalePct = genderTotal > 0 ? 100 - malePct : null;

        const startYear = 2016;
        const currentYear = new Date().getFullYear();
        const yearsActive = currentYear - startYear;

        return {
            totalBooks,
            totalPages,
            overallAvg,
            topBook,
            bottomBook,
            avgPages,
            minPages,
            maxPages,
            malePct,
            femalePct,
            yearsActive,
        };
    }, [books]);

    return (
        <div className="bg-paper-100 dark:bg-night-900 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-ink-900 dark:text-cream-100">
                <div className="max-w-4xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Om bokklubben</h2>

                    <p className="mt-8">
                        Vi är en liten men hängiven bokklubb, född ur tre vänners vilja att läsa mer och bättre: Erik,
                        Tomas och Mathias. Sedan starten {stats ? `${stats.yearsActive} år sedan` : ""} har vi
                        tillsammans tagit oss igenom{" "}
                        <strong>{stats ? stats.totalBooks : "—"} böcker</strong>, med ett sammanlagt sidantal på{" "}
                        <strong>{stats ? stats.totalPages.toLocaleString("sv-SE") : "—"} sidor</strong>.
                    </p>

                    {stats?.topBook && stats?.bottomBook && (
                        <p className="mt-6">
                            Vårt betygssystem är enkelt men kompromisslöst: varje bok får ett omdöme av oss alla tre.
                            Den mest älskade titeln hittills är{" "}
                            <strong>
                                {stats.topBook.fields.bookTitle}
                            </strong>{" "}
                            av {stats.topBook.fields.author} med{" "}
                            {getAverageRating(stats.topBook)} i snittbetyg, medan vår största besvikelse är{" "}
                            <strong>{stats.bottomBook.fields.bookTitle}</strong> av {stats.bottomBook.fields.author} med{" "}
                            {getAverageRating(stats.bottomBook)}.{" "}
                            {stats.overallAvg && (
                                <>
                                    Den genomsnittliga klubbboken landar på <strong>{stats.overallAvg}</strong>, vilket
                                    vittnar om att vi ofta väljer litteratur som åtminstone väcker respekt, om inte
                                    alltid kärlek.
                                </>
                            )}
                        </p>
                    )}

                    <p className="mt-6">
                        Vi turas om att välja nästa bok, och därigenom uppstår en rytm som gör klubben levande. Erik har
                        ofta lockats av nordisk samtidslitteratur, Tomas balanserar mellan klassiker och udda fynd, och
                        Mathias har en tendens att introducera författare som utmanar både språk och form.
                    </p>

                    {stats?.malePct !== null && (
                        <p className="mt-6">
                            När vi ser tillbaka på vår statistik kan vi se att{" "}
                            <strong>{stats.malePct} %</strong> av de lästa författarna är män och{" "}
                            <strong>{stats.femalePct} %</strong> är kvinnor – en siffra som fungerar som en påminnelse
                            om att fortsätta söka balans.{" "}
                            {stats.minPages && stats.maxPages && (
                                <>
                                    Sidantalet varierar mellan{" "}
                                    <strong>{stats.minPages}</strong> och{" "}
                                    <strong>{stats.maxPages.toLocaleString("sv-SE")}</strong> sidor.{" "}
                                </>
                            )}
                            {stats.avgPages && (
                                <>
                                    Genomsnittsboken är <strong>{stats.avgPages}</strong> sidor lång.
                                </>
                            )}
                        </p>
                    )}

                    <p className="mt-6">
                        Men vår bokklubb är mer än staplar, siffror och snittvärden. Den är en pågående dialog. Varje
                        möte blir en ritual, där boken fungerar som katalysator för större frågor: om språkets kraft,
                        samhällets skikt, historiens bördor och livets ofrånkomliga tvetydighet.
                    </p>
                    <p className="mt-6">
                        Att samlas kring litteraturen är för oss inte bara en hobby, utan ett sätt att förstå både
                        världen och oss själva. I vår bokklubb är varje läst sida ett steg på en gemensam vandring – en
                        karta över samtal, oenigheter, skratt och insikter. Vi är tre röster som tillsammans formar en
                        fjärde: bokklubbens egen berättelse.
                    </p>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-12">Om appen</h2>
                    <p className="mt-6">
                        För att hålla ordning på vår bokklubb har vi byggt den här appen. Den samlar allt på ett ställe:
                        vilka böcker vi har läst, vem som valt dem, när vi läste dem och vilka betyg vi gav. Det gör det
                        enkelt att bläddra tillbaka i historiken och se vår gemensamma resa.
                    </p>
                    <p className="mt-6">
                        Appen är byggd i <strong>React</strong> med <strong>Tailwind CSS</strong>, och använder{" "}
                        <strong>Contentful</strong> som innehållshanterare. För att göra det smidigare att lägga till
                        böcker hämtas information automatiskt från externa källor som Hardcover och Open Library.
                    </p>
                    <h3 className="text-2xl mb-4 font-bold mt-12">Funktioner</h3>
                    <ul className="list-disc list-inside space-y-1 text-ink-800 dark:text-cream-200">
                        <li>Lägg till och uppdatera böcker</li>
                        <li>Filtrera och sortera biblioteket</li>
                        <li>Se statistik över läsning, betyg och sidantal</li>
                        <li>Hämta automatiskt bokinformation via ISBN</li>
                    </ul>
                    <p className="mt-6 text-xl">
                        <a className="underline hover:text-amber-500 dark:hover:text-amber-400 transition-colors" href="https://github.com/emorlin/bookclub">
                            Se projektet på GitHub
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
