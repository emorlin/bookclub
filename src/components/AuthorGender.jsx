import { getAuhorSexCount } from "../utils/bookstats/authors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

function AuthorGender({ books }) {
    const battleOfTheSexes = useMemo(() => getAuhorSexCount(books ?? []), [books]);
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
                    color: "#fff",
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
            className="group rounded-xl border border-gray-700 bg-gray-800 p-4 shadow">
            <Pie
                data={genderData}
                options={options}
            />
        </div>
    );
}

export default AuthorGender;
