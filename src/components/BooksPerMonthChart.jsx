import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBooksPerMonth } from "../utils/bookstats/readings";
import { color } from "chart.js/helpers";
import { useEffect, useState, useMemo } from "react";

// Registrera komponenter i Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BooksPerMonthChart({ books }) {
    // Hämta sammanräknad data
    const monthlyCounts = getBooksPerMonth(books);

    const labels = Object.keys(monthlyCounts);
    const values = Object.values(monthlyCounts);

    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "Antal lästa böcker",
                data: values,
                backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blå (bg-blue-500)
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // döljer "Antal lästa böcker" texten
            },
            title: {
                display: true,
                text: "I vilken månad är böckerna lästa?",
                color: isDark ? "#fff" : "#000",
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: isDark ? "#fff" : "#000",
                },
            },
            x: {
                ticks: {
                    color: isDark ? "#fff" : "#000",
                },
            },
        },
    };

    return (
        <Bar
            data={data}
            options={options}
        />
    );
}

export default BooksPerMonthChart;
