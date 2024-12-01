import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../../feature/queryApi";

export default function BarChartGender() {
  const queryClient = useQueryClient();
  const [data, setDate] = useState([]);
  const labels = data.map((item) => item.province);
  const maleData = data.map((item) => item.male);
  const femaleData = data.map((item) => item.female);

  // Gender
  const genderChart = useMutation(
    oavIV.getGenderData,
    {
      onSuccess: (response) => {
        setDate(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  useEffect(() => {
    genderChart.mutate();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Erkak matbuot kotiblari",
        data: maleData,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Erkaklar uchun rang
        barThickness: 15, // Erkaklar uchun ustun kengligi
      },
      {
        label: "Ayol matbuot kotibalari",
        data: femaleData,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Ayollar uchun rang
        barThickness: 15, // Ayollar uchun ustun kengligi
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Viloyatlar bo‘yicha ",
        color: "#747474",
        font: {
          size: 14,
        },
      },
    },
  };
  return (
    <div className="w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
