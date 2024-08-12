export const LineGraphData = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "This is A graph first for me",
      },
    },
  },
  data: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Turthday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Steps by Nurzod",
        data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
        borderColor: "rgba(75, 192, 192)",
      },
      {
        label: "Steps by Abbos",
        data: [3000, 5000, 5500, 8000, 8000, 9000, 10000],
        borderColor: "rgba(75, 192, 0)",
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
          "rgba(244, 99, 132, 0.4)",
          "rgba(0, 99, 132, 0.4)",
          "rgba(100, 99, 132, 0.4)",
          "rgba(244, 99, 244, 0.4)",
          "rgba(244, 233, 0, 0.4)",
        ],
        borderColor: ["rgba(54, 162, 132, 1)"],
        borderWidth: 1,
      },
    ],
  },
};

export const PieGraphData = {
  options: {},
  data: {
    labels: ["Instagram", "Telegram", "Twitter", "YouTube", "LinkedIn"],
    datasets: [
      {
        Label: "Time Spent",
        data: [12, 30, 12, 18, 40],
        backgroundColor: [
          "rgba(244, 99, 132, 0.6)",
          "rgba(0, 99, 132, 0.6)",
          "rgba(100, 99, 132, 0.6)",
          "rgba(244, 99, 244, 0.6)",
          "rgba(244, 233, 0, 0.6)",
        ],
        hoverOffset: 10,
      },
    ],
  },
};
