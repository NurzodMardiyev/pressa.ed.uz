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
        mode: "index", // Bir nechta datasetlar uchun index bo‘yicha
        intersect: false, // Kursordan o‘tkazganda barcha yaqin nuqtalar ko‘rsatiladi
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
    labels: ["1-chorak", "2-chorak", "3-chorak", "4-chorak"],
    datasets: [
      {
        label: "Televediniye",
        data: [10, 60, 45, 60],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to‘ldirish
      },
      {
        label: "Radio",
        data: [0, 50, 55, 80],
        borderColor: "rgba(75, 192, 0, 1)",
        backgroundColor: "rgba(75, 192, 0, 0.2)",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to‘ldirish
      },
      {
        label: "Gazeta va Jurnal",
        data: [7, 50, 35, 70],
        borderColor: "#F0BC3D",
        backgroundColor: "#F0DEB2",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to‘ldirish
      },
      {
        label: "Internet Saytlar",
        data: [5, 30, 35, 40],
        borderColor: "#8C00FF",
        backgroundColor: "#F0DEFF",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to‘ldirish
      },
      {
        label: "Messenjerlar",
        data: [10, 50, 25, 30],
        borderColor: "#F02800",
        backgroundColor: "rgba(94,16,0,.2)",
        tension: 0.4, // Chiziqlarni yumshoqroq qilish (spline)
        fill: true, // Chiziq ostidagi maydonni to‘ldirish
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
  options: {
    cutout: "70%",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Gender Distribution",
        color: "#333", // Title rangini o‘rnatish
        font: {
          size: 18, // Title shrift o‘lchamini belgilash
          family: "Arial", // Title shrift turini o‘zgartirish
          weight: "bold", // Title shrift uslubini o‘zgartirish
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: "top",
      },
    },
  },
  data: {
    labels: ["Erkak", "Ayol"],
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
