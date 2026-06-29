import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBooksPerMonth } from "../utils/bookstats/readings";
import { useIsDarkMode } from "../hooks/useIsDarkMode";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BooksPerMonthChart({ books }) {
    const monthlyCounts = getBooksPerMonth(books);
    const labels = Object.keys(monthlyCounts);
    const values = Object.values(monthlyCounts);
    const isDark = useIsDarkMode();

    const textColor = isDark ? "#f0ead8" : "#1a1208";
    const barColor = isDark ? "rgba(201, 150, 60, 0.8)" : "rgba(176, 125, 40, 0.75)";
    const barBorder = isDark ? "rgba(201, 150, 60, 1)" : "rgba(176, 125, 40, 1)";

    const data = {
        labels,
        datasets: [
            {
                label: "Antal lästa böcker",
                data: values,
                backgroundColor: barColor,
                borderColor: barBorder,
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "I vilken månad är böckerna lästa?",
                color: textColor,
                font: { size: 18 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1, color: textColor },
                grid: { color: isDark ? "rgba(240,234,216,0.08)" : "rgba(26,18,8,0.08)" },
            },
            x: {
                ticks: { color: textColor },
                grid: { display: false },
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export default BooksPerMonthChart;
