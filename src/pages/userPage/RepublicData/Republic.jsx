import React from "react";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { contextOAIV } from "../../../context/ContextApi";

// Ma’lumotlar
const data = {
  labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"], // Kesim nomlari
  datasets: [
    {
      data: [300, 50, 100, 80, 70], // Har bir kesim qiymati
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9F40"], // Ranglar
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4CAF50",
        "#FF9F40",
      ],
    },
  ],
};
// o‘rtadagi umumiy qiymatni chiqarish
const total = 343;

export default function Republic() {
  const {
    oavPostAll,
    mediaEventAll,
    foreignAll,
    materialAll,
    onlineBroadcast,
  } = useContext(contextOAIV);

  let labels = [];
  let datas = [];
  let total = 0;
  oavPostAll?.map((item) => {
    // labels.push(item.postType);
    if (item.postType === "televediniye") {
      labels.push("Televediniye");
    } else if (item.postType === "radio") {
      labels.push("Radio");
    } else if (item.postType === "gazeta") {
      labels.push("Gazeta/jurnal");
    } else if (item.postType === "internet_sites") {
      labels.push("Internet saytlari");
    } else if (item.postType === "messenger") {
      labels.push("Messenjer");
    }
    datas.push(item.postCount);
    total += item.postCount;
  });

  let labelsMedia = [];
  let datasMedia = [];
  let totalMedia = 0;

  mediaEventAll?.forEach((item) => {
    if (item.mediaEventType === "BRIEFING") {
      labelsMedia.push("Brifing");
      datasMedia.push(item.briefingCount);
    } else if (item.mediaEventType === "PRESS_TOUR") {
      labelsMedia.push("Press tur");
      datasMedia.push(item.pressTourCount);
    } else if (item.mediaEventType === "PRESS_CONFERENCE") {
      labelsMedia.push("Matbuot anjumani");
      datasMedia.push(item.pressConferenceCount);
    }
    totalMedia += item.mediaEventCount;
  });

  let labelsMaterial = [];
  let datasMaterial = [];
  let totalMaterial = 0;

  if (materialAll?.length > 0) {
    const item = materialAll[0]; // Array ichidagi bitta obyekt

    if (item.infographicCount !== null) {
      labelsMaterial.push("Infografika");
      datasMaterial.push(item.infographicCount);
    }
    if (item.audioCount !== null) {
      labelsMaterial.push("Audio");
      datasMaterial.push(item.audioCount);
    }
    if (item.videoCount !== null) {
      labelsMaterial.push("Video");
      datasMaterial.push(item.videoCount);
    }
    // Umumiy materiallar sonini belgilash
    totalMaterial = item.materialCount || 0;
  }

  const dataOAV = {
    labels: labels, // Kesim nomlari
    datasets: [
      {
        data: datas, // Har bir kesim qiymati
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ], // Ranglar
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderColor: [
          "#FF6384", // Rangni bo‘lakka moslash
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderWidth: 5, // Chegarani kattalashtirish
        hoverRadius: 5, // Kursorni kattalashtirish
      },
    ],
  };

  // Diagramma sozlamalari
  const options = (title) => ({
    relative: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Legend diagramma ostida
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets[0];
            const total = datasets.data.reduce((sum, value) => sum + value, 0); // Umumiy qiymat
            return chart.data.labels.map((label, i) => {
              const value = datasets.data[i];
              const percentage = ((value / total) * 100).toFixed(1); // Foizni hisoblash
              return {
                text: `${label}: ${value} (${percentage}%)`, // Har bir rang uchun matn
                fillStyle: datasets.backgroundColor[i],
              };
            });
          },
        },
      },
      title: {
        display: true,
        text: title.includes("\n") ? title.split("\n") : [title], // Diagramma sarlavhasi
        font: {
          size: 15,
          weight: "bold",
        },
        color: "#333", // Sarlavha rangi
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce(
              (sum, val) => sum + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} (${percentage}%)`; // Tooltipda foiz va qiymat
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  });

  const dataMedia = {
    labels: labelsMedia, // Kesim nomlari
    datasets: [
      {
        data: datasMedia, // Har bir kesim qiymati
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ], // Ranglar
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderColor: [
          "#FF6384", // Rangni bo‘lakka moslash
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderWidth: 5, // Chegarani kattalashtirish
        hoverRadius: 5, // Kursorni kattalashtirish
      },
    ],
  };

  const dataMaterial = {
    labels: labelsMaterial, // Kesim nomlari
    datasets: [
      {
        data: datasMaterial, // Har bir kesim qiymati
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ], // Ranglar
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderColor: [
          "#FF6384", // Rangni bo‘lakka moslash
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderWidth: 5, // Chegarani kattalashtirish
        hoverRadius: 5, // Kursorni kattalashtirish
      },
    ],
  };
  const dataBroadcast = {
    labels: ["Onlayn efir", "Xorijiy oavga chiqish"], // Kesim nomlari
    datasets: [
      {
        data: [onlineBroadcast, foreignAll], // Har bir kesim qiymati
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ], // Ranglar
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderColor: [
          "#FF6384", // Rangni bo‘lakka moslash
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderWidth: 5, // Chegarani kattalashtirish
        hoverRadius: 5, // Kursorni kattalashtirish
      },
    ],
  };
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 md:space-x-2">
      <div className="md:col-span-3 col-span-1">
        <div
          style={{
            width: "104.5%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Doughnut
            data={dataOAV}
            options={options(
              "Oliy ta’lim muassasalari faoliyatining OAVda \n yoritilish holati \n (Respublika kesimida)"
            )}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {total} {/* Umumiy qiymat */}
          </div>
        </div>
      </div>
      <div className="md:col-span-3 cal-span-1">
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Doughnut
            data={dataMedia}
            options={options(
              "Oliy ta’lim muassasalari matbuot kotiblari tomonidan  \n o‘tkazilgan  mediatadbirlar soni \n (Respublika kesimida)"
            )}
          />
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {totalMedia} {/* Umumiy qiymat */}
          </div>
        </div>
      </div>
      <div className="md:col-span-3 cal-span-1">
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Doughnut
            data={dataMaterial}
            options={options(
              "Faoliyatga doir axborotni yetkazib berishda \n akustik va vizual  materiallardan foydalanganlik holati \n (Respublika kesimida)"
            )}
          />
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {totalMaterial} {/* Umumiy qiymat */}
          </div>
        </div>
      </div>
      <div className="md:col-span-3 cal-span-1">
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Doughnut
            data={dataBroadcast}
            options={options(
              "Ijtimoiy tarmoqlarda berilgan onlayn efir \n (ovozli chat) lar va Xorijiy oavda chiqishlar soni \n (Respublika kesimida)"
            )}
          />
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {onlineBroadcast + foreignAll} {/* Umumiy qiymat */}
          </div>
        </div>
      </div>
    </div>
  );
}
