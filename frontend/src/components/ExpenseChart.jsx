import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ maxWidth: "400px" }}>
        <h5>Category-wise Distribution</h5>
        <p>No data available</p>
      </div>
    );
  }

  // Generate colors dynamically based on data length
  const getColors = (length) => {
    const vibrantColors = [
      "#FF6384", // Red/Pink
      "#36A2EB", // Blue
      "#FFCE56", // Yellow
      "#4BC0C0", // Teal/Cyan
      "#9966FF", // Purple
      "#FF9F40", // Orange
      "#FF6384", // Red
      "#C9CBCF", // Gray
      "#FF6384", // Pink
      "#4BC0C0", // Cyan
    ];
    return Array.from({ length }, (_, i) => vibrantColors[i % vibrantColors.length]);
  };

  const chartColors = getColors(data.length);
  
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Expenses",
        data: data.map((d) => d.total),
        backgroundColor: chartColors,
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverBorderColor: "#000000",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 15,
          font: {
            size: 14,
            weight: "bold",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", marginTop: "30px", marginBottom: "30px" }}>
      <h5 className="mb-3">Category-wise Distribution</h5>
      <div style={{ height: "400px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ExpenseChart;
