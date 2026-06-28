import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getPagesPerYear } from "../utils/bookstats/readings";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PagesPerYearChart({ books }) {
    const pagesByYear = getPagesPerYear(books);
    const labels = Object.keys(pagesByYear);
    const values = Object.values(pagesByYear);

    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const textColor = isDark ? "#f0ead8" : "#1a1208";
    const barColor = isDark ? "rgba(201, 150, 60, 0.8)" : "rgba(176, 125, 40, 0.75)";
    const barBorder = isDark ? "rgba(201, 150, 60, 1)" : "rgba(176, 125, 40, 1)";
    const gridColor = isDark ? "rgba(240,234,216,0.08)" : "rgba(26,18,8,0.08)";

    const data = {
        labels,
        datasets: [
            {
                label: "Sidor",
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
                text: "Lästa sidor per år",
                color: textColor,
                font: { size: 18 },
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => ` ${ctx.parsed.y.toLocaleString("sv-SE")} sidor`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColor,
                    callback: (v) => v.toLocaleString("sv-SE"),
                },
                grid: { color: gridColor },
            },
            x: {
                ticks: { color: textColor },
                grid: { display: false },
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export default PagesPerYearChart;
