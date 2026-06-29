import { useIsDarkMode } from "../hooks/useIsDarkMode";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAvgRatingPerYear } from "../utils/bookstats/readings";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function AvgRatingPerYearChart({ books }) {
    const ratingsByYear = getAvgRatingPerYear(books);
    const labels = Object.keys(ratingsByYear);
    const values = Object.values(ratingsByYear);

    const isDark = useIsDarkMode();

    const textColor = isDark ? "#f0ead8" : "#1a1208";
    const lineColor = isDark ? "rgba(201, 150, 60, 1)" : "rgba(176, 125, 40, 1)";
    const fillColor = isDark ? "rgba(201, 150, 60, 0.15)" : "rgba(176, 125, 40, 0.12)";
    const gridColor = isDark ? "rgba(240,234,216,0.08)" : "rgba(26,18,8,0.08)";

    const data = {
        labels,
        datasets: [
            {
                label: "Snittbetyg",
                data: values,
                borderColor: lineColor,
                backgroundColor: fillColor,
                pointBackgroundColor: lineColor,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                spanGaps: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Snittbetyg per år",
                color: textColor,
                font: { size: 18 },
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => ` ${ctx.parsed.y} av 5`,
                },
            },
        },
        scales: {
            y: {
                min: 1,
                max: 5,
                ticks: { stepSize: 0.5, color: textColor },
                grid: { color: gridColor },
            },
            x: {
                ticks: { color: textColor },
                grid: { display: false },
            },
        },
    };

    return <Line data={data} options={options} />;
}

export default AvgRatingPerYearChart;
