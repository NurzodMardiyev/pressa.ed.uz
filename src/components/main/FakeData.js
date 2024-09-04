export const LineGraphData = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "This is a graph first for me",
      },
      tooltip: {
        enabled: true, // Tooltiplarni yoqish
        mode: "index", // Bir nechta datasetlar uchun index bo'yicha
        intersect: false, // Kursordan o'tkazganda barcha yaqin nuqtalar ko'rsatiladi
      },
    },
    elements: {
      line: {
        borderColor: "rgba(255, 255, 255, 1)", // Dark mode uchun
      },
      point: {
        borderColor: "rgba(255, 255, 255, 1)", // Dark mode uchun
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        // grid: {
        //   color: "rgba(255, 255, 255, 0.1)", // Dark mode uchun
        // },
      },
      y: {
        beginAtZero: true,
      },
      // grid: {
      //   color: "rgba(255, 255, 255, 0.1)", // Dark mode uchun
      // },
    },
  },
  data: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Steps by Nurzod",
        data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to'ldirish
      },
      {
        label: "Steps by Abbos",
        data: [3000, 5000, 5500, 8000, 8000, 9000, 10000],
        borderColor: "rgba(75, 192, 0, 1)",
        backgroundColor: "rgba(75, 192, 0, 0.2)",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to'ldirish
      },
    ],
  },
};
export const BarGraphData = {
  options: {},
  data: {
    labels: [
      "Rent",
      "GRauseries",
      "Utilities",
      "Entertainment",
      "Transparation",
    ],
    datasets: [
      {
        Label: "Expenses",
        data: [1200, 300, 120, 180, 400],
        backgroundColor: [
          "rgba(244, 99, 132, 0.9)",
          "rgba(0, 99, 132, 0.9)",
          "rgba(100, 99, 132, 0.9)",
          "rgba(244, 99, 244, 0.9)",
          "rgba(244, 233, 0, 0.9)",
        ],
        borderColor: ["rgba(54, 162, 132, 1)"],
        borderWidth: 1,
      },
    ],
  },
};

export const PieGraphData = {
  options: { cutout: "70%" },
  data: {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Sample Data",
        data: [15, 30, 45, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  },
};
