import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../../../App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../../feature/queryApi";

// `chart.js` komponentlarini ro‘yxatga olish
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function BarChartForRanking() {
  const [universityData, setTopUnivers] = useState([]);
  // const universityData = [
  //   { name: "Tashkent University", postCount: 120 },
  //   { name: "Samarkand Institute", postCount: 95 },
  //   { name: "Bukhara Tech", postCount: 85 },
  //   { name: "Fergana Polytechnic", postCount: 78 },
  //   { name: "Nukus State University", postCount: 70 },
  //   { name: "Andijan Medical", postCount: 68 },
  //   { name: "Namangan Agrarian", postCount: 65 },
  //   { name: "Khiva Engineering", postCount: 58 },
  //   { name: "Jizzakh Pedagogical", postCount: 55 },
  //   { name: "Gulistan Economics", postCount: 50 },
  // ];

  const queryClient = useQueryClient();

  const topUniverData = useMutation(oavIV.rankingTopUniver, {
    onSuccess: (data) => {
      // console.log(data.body);
      setTopUnivers(data.body);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    topUniverData.mutate();
  }, []);

  // Chart ma’lumotlarini tayyorlash
  const chartData = {
    labels: universityData.map((univer) => univer.name),
    datasets: [
      {
        label: "Chiqishlar soni",
        data: universityData.map((univer) => univer.totalPostCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div
        style={{ width: "100%", margin: "0 auto" }}
        className="barChartRanking"
      >
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },

              title: {
                display: true,
                text: "Oliy ta’lim muassasalarining OAVda chiqishlari soni",
              },
            },
            scales: {
              // display: false,
              x: { title: { display: false, text: "Universitetlar" } },
            },
          }}
        />
      </div>
    </div>
  );
}
