export default function BookRatings({ eriksGrade, tomasGrade, mathiasGrade, goodreadGrade }) {
    const ratings = [
        { name: "Erik", grade: eriksGrade },
        { name: "Tomas", grade: tomasGrade },
        { name: "Mathias", grade: mathiasGrade },
    ];

    return (
        <div className="mt-6">
            <div className="flex gap-3">
                {ratings.map(({ name, grade }) => (
                    <div
                        key={name}
                        className="flex-1 rounded-xl bg-paper-100 dark:bg-night-800 border border-paper-300 dark:border-night-700 px-3 py-3 text-center">
                        <div className="text-3xl font-bold text-ink-900 dark:text-cream-100">
                            {grade ?? "—"}
                        </div>
                        <div className="text-xs font-medium text-ink-700 dark:text-cream-300 mt-1">
                            {name}
                        </div>
                    </div>
                ))}
            </div>
            {goodreadGrade && (
                <p className="mt-3 text-sm text-ink-700 dark:text-cream-300">
                    Goodreads:{" "}
                    <span className="font-semibold text-ink-900 dark:text-cream-100">{goodreadGrade}</span>
                </p>
            )}
        </div>
    );
}
