import { getAuhorSexCount } from "../utils/bookstats/authors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo } from "react";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
ChartJS.register(ArcElement, Tooltip, Legend);

function AuthorGender({ books }) {
    const battleOfTheSexes = useMemo(() => getAuhorSexCount(books ?? []), [books]);

    const isDark = useIsDarkMode();

    const genderData = {
        labels: ["Män", "Kvinnor"],
        datasets: [
            {
                label: "Antal lästa böcker",
                data: [battleOfTheSexes.male, battleOfTheSexes.female],
                backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235,1)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: isDark ? "#fff" : "#000",
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    return (
        <div
            aria-label={
                parseFloat(battleOfTheSexes.malePercentage).toFixed(2) +
                "% män, " +
                parseFloat(battleOfTheSexes.femalePercentage).toFixed(2) +
                "% kvinnor"
            }
            className="rounded-xl border border-paper-300 dark:border-night-700 bg-white dark:bg-night-800 p-4">
            <Pie
                data={genderData}
                options={options}
            />
        </div>
    );
}

export default AuthorGender;
