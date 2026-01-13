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

  // Color palette for the pie chart
  const colors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#FF6384", // Pink
    "#C9CBCF", // Gray
    "#4BC0C0", // Cyan
    "#FF6384", // Red
  ];

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.total),
        backgroundColor: colors.slice(0, data.length),
        borderColor: "#fff",
        borderWidth: 2,
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
            size: 12,
          },
        },
      },
      tooltip: {
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
    <div style={{ maxWidth: "500px", marginTop: "30px" }}>
      <h5>Category-wise Distribution</h5>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default ExpenseChart;
