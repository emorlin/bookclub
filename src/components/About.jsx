function Abaout() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
                <div className="overflow-x-auto max-w-4xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Om bokklubben</h2>
                    <p className="mt-8">
                        Vi är en liten men hängiven bokklubb, född ur tre vänners vilja att läsa mer och bättre: Erik,
                        Tomas och Mathias. Sedan starten har vi tillsammans tagit oss igenom över 70 böcker, med ett
                        sammanlagt sidantal på mer än 23 000 sidor – nästan som att ha läst “Krig och fred” 10 gånger.
                    </p>
                    <p className="mt-6">
                        Vårt betygssystem är enkelt men kompromisslöst: varje bok får ett omdöme av oss alla tre.
                        Hittills har de högst älskade titlarna nått hela vägen upp till 5 av 5 i snittbetyg, som
                        “Stargate” av Ingvild H. Rishøi, medan våra största besvikelser knappt tagit sig över 2,0. Den
                        genomsnittliga klubbboken landar dock stabilt på 3,5, vilket vittnar om att vi ofta väljer
                        litteratur som åtminstone väcker respekt, om inte alltid kärlek.
                    </p>
                    <p className="mt-6">
                        Vi turas om att välja nästa bok, och därigenom uppstår en rytm som gör klubben levande. Erik har
                        ofta lockats av nordisk samtidslitteratur, Tomas balanserar mellan klassiker och udda fynd, och
                        Mathias har en tendens att introducera författare som utmanar både språk och form. Resultatet är
                        en samling där USA dominerar som ursprungsland, men där också Sverige, Norge, Frankrike, Irland
                        och Japan har fått starka röster.
                    </p>
                    <p className="mt-6">
                        När vi ser tillbaka på vår statistik kan vi se att ungefär 70 % av de lästa författarna är män
                        och 30 % kvinnor – en siffra som fungerar som en påminnelse om att fortsätta söka balans.
                        Sidantalet varierar mellan tunna pärlor på knappt 100 sidor och mastiga romaner på nästa 800.
                        Genomsnittsboken i klubben är runt ca 300 sidor lång, perfekt avvägt mellan djup och läsbarhet.
                    </p>
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
                        Appen är byggd i <b>React</b> med <b>Tailwind CSS</b>, och använder <b>Contentful</b> som
                        innehållshanterare. För att göra det smidigare att lägga till böcker hämtas information
                        automatiskt från externa källor som Hardcover och Open Library.
                    </p>
                    <h3 className="text-2xl mb-4 font-bold mt-12">Funktioner </h3>
                    <ul className="list-disc list-inside">
                        <li> Läggtill och uppdatera böcker</li>
                        <li>Filtrera och sortera biblioteket</li>
                        <li>Se statistik över läsning, betyg och sidantal</li>
                        <li>Hämta automatiskt bokinformation via ISBN</li>
                    </ul>
                    <p className="mt-6 text-xl">
                        Den som vill kan kika närmare på koden här:{" "}
                        <a
                            className="underline"
                            href="https://github.com/emorlin/bookclub">
                            Se projektet på GitHub
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Abaout;
