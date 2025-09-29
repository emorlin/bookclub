// src/components/BookRatings.jsx
export default function BookRatings({ eriksGrade, tomasGrade, mathiasGrade, goodreadGrade }) {
    const ratings = [
        { name: "Erik", grade: eriksGrade },
        { name: "Tomas", grade: tomasGrade },
        { name: "Mathias", grade: mathiasGrade },
    ];

    return (
        <dl className="mt-6 space-y-2">
            {ratings.map(({ name, grade }) => (
                <div
                    key={name}
                    className="flex gap-2">
                    <dt className="inline">{name}s betyg:</dt>
                    <dd className="inline">{grade ?? "—"}</dd>
                </div>
            ))}

            {goodreadGrade && (
                <div className="flex gap-2">
                    <dt className="inline">Betyg från Goodreads:</dt>
                    <dd className="inline">{goodreadGrade}</dd>
                </div>
            )}
        </dl>
    );
}
