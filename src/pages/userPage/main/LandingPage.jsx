import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import UzMap from "../uzmap/UzMap";
import HeroSection from "./HeroSection";
import Footer from "../../../components/footer/Footer.jsx";
import { useMutation, useQueryClient } from "react-query";
import Header from "../../../components/header/Header.jsx";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import BarChartGender from "./BarChartGender.jsx";
import { Pagination } from "antd";
import Ranking from "../ranking/Ranking.jsx";
import LineChart from "../LineChart.jsx/LineChart.jsx";
import "../../../App.css";
import { oavIV } from "../../../feature/queryApi.js";
import { contextOAIV } from "../../../context/ContextApi.js";
import Republic from "../RepublicData/Republic.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function LandingPage() {
  const queryClient = useQueryClient();
  const {
    universByRegion,
    backToUniver,
    setOavPostAll,
    setMediaEventAll,
    setForeignAll,
    setMaterialAll,
    setOnlineBroadcast,
  } = useContext(contextOAIV);
  // console.log(backToUniver);

  const [topPosts, setTopPosts] = useState([]);
  const topPost = useMutation(
    oavIV.topPostsForStat,
    {
      onSuccess: (response) => {
        const requiredPostTypes = [
          "televediniye",
          "radio",
          "gazeta",
          "internet_sites",
          "messenger",
        ];

        // To‘liq ro‘yxatni yaratish
        const fullPosts = requiredPostTypes.map((type) => {
          const existingPost = response.find((post) => {
            return post.postType === type;
          });
          return existingPost ? existingPost : { postType: type, postCount: 0 };
        });

        setTopPosts(fullPosts);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  // All gender data

  const [allGender, serAllGender] = useState([]);
  const allGenderData = useMutation(
    oavIV.allGenderData,
    {
      onSuccess: (response) => {
        serAllGender(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  // Faoliyatga doir postlarni hammasini olib kelib beradigan
  const allOAVDataQuery = useMutation(
    oavIV.allOAVData,
    {
      onSuccess: (response) => {
        setOavPostAll(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  // Faoliyatga doir postlarni hammasini olib kelib beradigan
  const allMediaDataQuery = useMutation(
    oavIV.allMediaData,
    {
      onSuccess: (response) => {
        setMediaEventAll(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  // Faoliyatga doir postlarni hammasini olib kelib beradigan
  const allMaterialDataQuery = useMutation(
    oavIV.allMaterialaData,
    {
      onSuccess: (response) => {
        setMaterialAll(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  const allOnlineDataQuery = useMutation(
    oavIV.allOnlineStatData,
    {
      onSuccess: (response) => {
        setOnlineBroadcast(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );
  const allForeignDataQuery = useMutation(
    oavIV.allForeignStatData,
    {
      onSuccess: (response) => {
        setForeignAll(response);
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
    Promise.all([topPost.mutate()])
      .then(() => {
        Promise.all([
          allOAVDataQuery.mutate(),
          allMediaDataQuery.mutate(),
          allMaterialDataQuery.mutate(),
          allOnlineDataQuery.mutate(),
          allForeignDataQuery.mutate(),
        ]);
      })
      .then(() => {
        Promise.all([allGenderData.mutate()]);
      })
      .then(() => {
        Promise.all([]);
      })
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const PieGraphData = {
    options: {
      cutout: "60%",
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Respublika bo‘yicha",
          color: "#747474", // Title rangini o‘rnatish
          font: {
            size: 14, // Title shrift o‘lchamini belgilash
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
      },
    },
    data: {
      labels: ["Ayol", "Erkak"],
      datasets: [
        {
          label: "Barcha viloyatlar bo‘yicha",
          data: [allGender[0]?.female, allGender[0]?.male],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    },
  };

  const [uniqueUniverData, setUniqueUniverData] = useState(true);
  const [univerDataPosts, setUniverDataPosts] = useState([]);

  const PieGraphDataUniver = {
    options: {
      cutout: "60%",
      plugins: {
        legend: {
          labels: {
            color: "#1F2937", // labels rangini oq qilish uchun
            font: {
              size: 14, // shrift o‘lchami
            },
          },
        },
      },
    },
    data: {
      labels: [
        "Onlayn efirlar soni",
        "Turli tadbirni OAVda yoritilganlik darajasi",
        "Xorijiy OAVlarida e'lon qilingan materiallar",
        "Akustik va vizual materiallardan foydalanganligi",
        "O‘tkazilgan mediatadbirlar",
        "Medialoyihalar",
        "Axborotni OAV orqali yoritilishi",
      ],
      datasets: [
        {
          label: "Qo‘yilgan postlar soni",
          data: [
            univerDataPosts[0]?.broadcastsCount,
            univerDataPosts[0]?.coveragesCount,
            univerDataPosts[0]?.foreignMaterialsCount,
            univerDataPosts[0]?.materialsCount,
            univerDataPosts[0]?.mediaEventsCount,
            univerDataPosts[0]?.mediaProjectsCount,
            univerDataPosts[0]?.postsCount,
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#FFFFBC",
            "#62B469",
            "#ff30e7",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#FFFFBC",
            "#62B469",
            "#ff30e7",
          ],
          // color: ["#fff"],
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    },
  };

  const uniqueUniverPosts = useMutation(
    oavIV.uniqueUniverPostsData,
    {
      onSuccess: (response) => {
        console.log(response);
        setUniverDataPosts(response);
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  const handleTakeOneUniverData = (id) => {
    // botta query orqali ma’lumitlar jo‘natiladi va keladi
    uniqueUniverPosts.mutate(id);
    setUniqueUniverData(false);
  };

  const handleBack = () => {
    setUniqueUniverData(true);
  };

  const itemsPerPage = 7;

  // State
  const [currentItems, setCurrentItems] = useState([]);
  // console.log(currentItems);
  const [currentPage, setCurrentPage] = useState(1);

  // `universByRegion` yoki sahifa raqami o‘zgarganda `currentItems` yangilash
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(universByRegion?.slice(startIndex, endIndex));
  }, [universByRegion, currentPage]);

  useEffect(() => {
    setUniqueUniverData(backToUniver);
    // Yangi malumotlar kelganda mavjud sahifani saqlab qolamiz yoki sahifani avtomatik qayta sozlaymiz
    const maxPage = Math.ceil(universByRegion?.length / itemsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1); // agar joriy sahifa mavjud sahifalar sonidan katta bo‘lsa, birinchi sahifaga o‘tadi
    }
  }, [universByRegion]);

  // Sahifani o‘zgartirish funksiyasi
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // console.log(currentItems[0]?.province);
  return (
    <div className=" bg-white dark:bg-gray-800 z-10">
      <div>
        <Header />
        <HeroSection />
      </div>
      <div className="header-wrapper container md:max-w-10xl  mx-auto  py-4 md:px-0 px-5 lg:mx-auto my-10 ">
        <div className="mb-3 px-5 md:px-auto">
          <h2
            className="md:text-[22px] text-[20px] font-semibold dark:text-white max-w-[560px]"
            style={{ fontFamily: "Roboto" }}
          >
            Faoliyatga doir axborotlarni OAV orqali yoritilishida eng ko‘p
            chiqish qilgan Top OTM (yo‘nalishlar kesimida)
          </h2>
        </div>
        <div className="flex lg:justify-between flex-col md:flex-row gap-3 px-5 md:px-auto flex-wrap lg:flex-nowrap justify-center">
          {topPosts?.map((item, index) => {
            let title = "";
            if (item.postType === "televediniye") {
              title = "Televediniye";
            } else if (item.postType === "radio") {
              title = "Radio";
            } else if (item.postType === "gazeta") {
              title = "Gazeta/jurnal";
            } else if (item.postType === "internet_sites") {
              title = "Internet saytlari";
            } else if (item.postType === "messenger") {
              title = "Ijtimoiy tarmoqlar";
            }
            return (
              <div
                key={index}
                className={`px-5  py-3 rounded-xl  col-span-3 md:w-[400px] dark:bg-gray-700   bg-gradient-to-r from-gray-200 to-slate-200   dark:bg-gradient-to-r dark:from-gray-600 dark:to-slate-700 `}
              >
                <div className="flex justify-between">
                  <div>
                    <span
                      className="md:text-[18px] text-[16px] font-semibold dark:text-white "
                      style={{ fontFamily: "Roboto" }}
                    >
                      {title}
                    </span>
                    <p className="dark:text-white">
                      <span className="font-semibold text-[28px] ">
                        {item.postCount}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span className="bg-green-100 dark:bg-gray-600 dark:text-white px-3 py-1 inline-flex rounded-xl  justify-center items-center">
                      Top
                    </span>
                  </div>
                </div>
                <div className="flex items-center md:mt-4">
                  <span className="font-[500] block text-[14px] dark:text-white">
                    {item.organizationName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Charts */}
      </div>
      <div className="republic">
        <div className="header-wrapper container md:max-w-10xl flex flex-col justify-center  mx-auto  py-10 md:px-5 px-5 lg:mx-auto">
          <div className="my-3 text-center flex justify-center">
            <h2
              className="md:text-[22px] text-[20px] font-semibold max-w-[520px]"
              style={{ fontFamily: "Roboto" }}
            >
              Matbuot kotiblari tomonidan qo‘yilgan postlarning umumiy soni
              (Respublika kesimida)
            </h2>
          </div>
          <Republic />
        </div>
      </div>
      <div className="">
        <div className="mapBg bg-[#EDFCF5] mt-8 dark:bg-gray-700 dark:text-white">
          <div className="header-wrapper container md:max-w-10xl  mx-auto  py-10 md:px-5 px-5 lg:mx-auto">
            <div className="my-3">
              <h2
                className="md:text-[22px] text-[20px] font-semibold max-w-[520px]"
                style={{ fontFamily: "Roboto" }}
              >
                Faoliyatga doir axborotlarni OAV orqali yoritilishi hududlar
                kesimida
              </h2>
            </div>
            <div className="flex flex-wrap md:flex-nowrap">
              <div className="md:w-2/6 w-full">
                <div className="bg-green-100 dark:bg-gray-600 w-full  rounded-xl p-6 h-full">
                  {uniqueUniverData === true ? (
                    <div>
                      <div className="mb-4">
                        <h4
                          className="max-w-[350px] text-[17px] md:text-[18px] font-semibold"
                          style={{ fontFamily: "Roboto" }}
                        >
                          {
                            currentItems
                              ? `${currentItems[0]?.lowerCaseProvince}dagi oliy ta’lim muassasalarining OAVda chiqishi (umumiy)`
                              : ""

                            /* {currentItems[0]?.lowerCaseProvince} */
                          }
                        </h4>
                      </div>
                      <div className="flex flex-col gap-3">
                        {currentItems?.map((item, index) => {
                          return (
                            <div
                              className="bg-green-200 dark:bg-gray-500 flex px-3 py-2 rounded items-center gap-4 cursor-pointer"
                              key={index}
                              onClick={() => handleTakeOneUniverData(item.id)}
                            >
                              <div>
                                <BsBuildingsFill className="text-3xl" />
                              </div>
                              <div>
                                <h5 className="text-[16px] font-semibold">
                                  {item.name}
                                </h5>
                                <p className="text-[14px]">
                                  OAVda chiqishlar soni (umumiy):{" "}
                                  <span className="font-bold">
                                    {item.postCount}
                                  </span>{" "}
                                  ta post.
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        <div className="ms-auto">
                          {universByRegion?.length > 7 ? (
                            <Pagination
                              total={universByRegion?.length}
                              pageSize={itemsPerPage}
                              onChange={handlePageChange}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <button
                          className="py-2 px-3 bg-green-300 dark:bg-gray-500 rounded"
                          onClick={handleBack}
                        >
                          <IoMdArrowRoundBack />
                        </button>
                      </div>
                      {univerDataPosts?.length !== 0 ? (
                        <div className="flex flex-col gap-3 ">
                          <h4
                            className="max-w-[350px]  font-semibold text-[17px] md:text-[18px"
                            style={{ fontFamily: "Roboto" }}
                          >
                            OAVda eng ko‘p chiqish qilgan OTM
                          </h4>
                          <Doughnut
                            options={PieGraphDataUniver.options}
                            data={PieGraphDataUniver.data}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center w-full h-full">
                          Malumot yo‘q
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-4/6 w-full">
                <UzMap />
              </div>
            </div>
          </div>
        </div>
        <div className="header-wrapper container md:max-w-10xl  mx-auto  py-10 md:px-5 px-5 lg:mx-auto ">
          <Ranking />
        </div>
        <div className="header-wrapper container md:max-w-10xl  mx-auto  py-10 md:px-5 px-5 lg:mx-auto ">
          <div className="my-0 text-center flex justify-center ">
            <h2
              className="md:text-[22px] text-[20px] font-semibold max-w-[520px] dark:text-white"
              style={{ fontFamily: "Roboto" }}
            >
              Har chorak OAVda eng ko‘p chiqish qilgan Top OTM.
            </h2>
          </div>
          <div className=" flex justify-between md:flex-row flex-col gap-3">
            <div className="md:w-full w-full dark:white  mb-6 py-4 ">
              <LineChart />
            </div>
          </div>
        </div>
        <div className="mapBg bg-[#edfcf5] mt-8 dark:bg-gray-700 dark:text-white">
          <div className="header-wrapper container md:max-w-10xl  mx-auto  py-10 md:px-5 px-5 lg:mx-auto ">
            <div className="my-3 flex justify-center text-center">
              <h2
                className="md:text-[22px] font-semibold text-[20px] max-w-[480px]"
                style={{ fontFamily: "Roboto" }}
              >
                Oliy ta’lim muassasalari matbuot kotiblari soni (jins kesimida)
              </h2>
            </div>
            <div className="flex flex-col-reverse md:flex-row">
              <div className="md:w-2/6 w-full">
                <div className="w-full flex flex-1">
                  <Doughnut
                    options={PieGraphData.options}
                    data={PieGraphData.data}
                  />
                </div>
              </div>
              <div className="md:w-4/6 w-full">
                <BarChartGender />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-wrapper container md:max-w-10xl  mx-auto  py-10 md:px-5 px-5 lg:mx-auto ">
        <Footer />
      </div>
    </div>
  );
}
