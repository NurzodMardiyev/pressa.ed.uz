import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../../feature/queryApi";

export default function LineChart() {
  const queryClient = useQueryClient();
  const [dataFromBackend, setDataFromBackend] = useState([]);

  // quoter
  const quoter = useMutation(
    oavIV.dataForQuoter,
    {
      onSuccess: (response) => {
        setDataFromBackend(response);
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
    quoter.mutate();
  }, []);

  // Choraklar va postType asosida ma’lumotlarni formatlash
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const groupedData = dataFromBackend?.reduce((acc, item) => {
    if (!acc[item.postType]) {
      acc[item.postType] = {
        postCounts: Array(4).fill(0),
        totalGrades: Array(4).fill(0),
      };
    }
    const quarterIndex = quarters.indexOf(item.quarter);
    if (quarterIndex !== -1) {
      acc[item.postType].postCounts[quarterIndex] += item.postCount;
      acc[item.postType].totalGrades[quarterIndex] += item.totalGrade;
    }
    return acc;
  }, {});

  const colors = [
    {
      borderColor: "rgba(255, 99, 132, 0.6)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      borderColor: "rgba(54, 162, 235, 0.6)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
    {
      borderColor: "rgba(75, 192, 192, 0.6)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    {
      borderColor: "rgba(255, 206, 86, 0.6)",
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
    {
      borderColor: "rgba(153, 102, 255, 0.6)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    },
  ];

  dataFromBackend?.forEach((item) => {
    const { postType, organizationName, postCount, quarter } = item;
    if (!groupedData[postType]) {
      groupedData[postType] = {};
    }
    if (!groupedData[postType][organizationName]) {
      groupedData[postType][organizationName] = { postCounts: [0, 0, 0, 0] };
    }
    // Kvartal bo‘yicha indexni aniqlash (Q1 uchun 0, Q2 uchun 1 va hokazo)
    const quarterIndex = parseInt(quarter.substring(1)) - 1;
    groupedData[postType][organizationName].postCounts[quarterIndex] =
      postCount;
  });

  const lineChartData = {
    labels: ["1-chorak", "2-chorak", "3-chorak", "4-chorak"],
    datasets: Object.keys(groupedData).flatMap((postType, postTypeIndex) => {
      return Object.keys(groupedData[postType]).map(
        (organizationName, orgIndex) => {
          const color =
            colors[
              (postTypeIndex * Object.keys(groupedData[postType]).length +
                orgIndex) %
                colors.length
            ];
          return {
            label: `${postType} - ${organizationName}`,
            data: groupedData[postType][organizationName].postCounts,
            borderColor: color.borderColor,
            backgroundColor: color.backgroundColor,
            fill: false,
            tension: 0.4, // Chiziqlarni yumshatish uchun
          };
        }
      );
    }),
  };

  return (
    <div>
      <div style={{ width: "100%", margin: "0px auto" }}>
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                display: false,
              },
              title: {
                display: true,
                text: "OAV yo‘nalishlari kesimida",
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
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // Dark mode uchun
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // Dark mode uchun
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
