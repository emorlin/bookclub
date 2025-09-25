import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBooksPerMonth } from "../utils/bookstats/readings";
import { color } from "chart.js/helpers";

// Registrera komponenter i Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BooksPerMonthChart({ books }) {
    // Hämta sammanräknad data
    const monthlyCounts = getBooksPerMonth(books);

    const labels = Object.keys(monthlyCounts);
    const values = Object.values(monthlyCounts);

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
                color: "#fff",
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
                    color: "#fff",
                },
            },
            x: {
                ticks: {
                    color: "#fff",
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
