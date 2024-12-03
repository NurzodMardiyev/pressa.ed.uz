import { Button, Flex, Popconfirm, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { oavIV } from "../../../feature/queryApi";
import { FaTrashAlt } from "react-icons/fa";
import { ip } from "../../../ips";
import gif from "../../../images/ezgif-2-4f3658adc3-ezgif.com-gif-maker.gif";
import { FaPlusSquare } from "react-icons/fa";

const sharedOnCell = () => {};

export default function LevelIlluminationDashboard() {
  const [coverageData, setCoverage] = useState([]);

  const location = useLocation();
  const [employeeId, seEmployeeId] = useState();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const [locationRole, setLocationRole] = useState(true);

  useEffect(() => {
    if (location.pathname === "/superadminpanel/levelIllumination_dashboard") {
      setLocationRole(true);
    } else {
      setLocationRole(false);
      getEmpoyeeId.mutate();
    }
  }, []);
  const columnsCoverage = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Tadbir nomi",
      dataIndex: "title",
      onCell: sharedOnCell,
    },
    {
      title: "Tadbir turi",
      dataIndex: "tadbirTuri",
      onCell: sharedOnCell,
    },
    {
      title: "Yoritish shakli",
      dataIndex: "yoritShakli",
      onCell: sharedOnCell,
    },
    {
      title: "E’lon qilingan OAV/Ijtimoiy tarmoq turi",
      dataIndex: "type",
      onCell: sharedOnCell,
    },
    {
      title: "Yoritilgan OAV nomi va havolasi",
      dataIndex: "link",
      onCell: sharedOnCell,
    },
    {
      title: "Yoritilgan sanasi",
      dataIndex: "publishDate",
      onCell: sharedOnCell,
    },
    {
      title: "Oʻchirish",
      dataIndex: "action",
      onCell: sharedOnCell,
    },
  ];

  const getCoverage = useMutation(oavIV.getCoverage, {
    onSuccess: (data) => {
      setCoverage(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  const getEmpoyeeId = useMutation(oavIV.getEmpoyeeId, {
    onSuccess: (data) => {
      seEmployeeId(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    // Barcha soʻrovlarni parallel ravishda yuborish uchun Promise.all ishlatilmoqda
    Promise.all([getCoverage.mutateAsync()])
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const deleteCoverage = useMutation(oavIV.deleteCoverage, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDeleteCoverage = (id) => {
    deleteCoverage.mutate(id, {
      onSuccess: () => {
        // Backenddan muvaffaqiyatli oʻchirilgandan soʻng interfeysni yangilash
        setCoverage((prevCoverage) =>
          prevCoverage.filter((item) => item.id !== id)
        );
        queryClient.invalidateQueries(); // Cache-ni yangilash
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  const dataCoverage = coverageData?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.eventName}`,
      tadbirTuri: item.eventType,
      yoritShakli: item.publishType,
      type: item.massMedia,
      link: item.mediaLinks
        ? Object.entries(item.mediaLinks).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      publishDate: item.publishDate.map((i, index) => (
        <span key={index}>
          {i}
          {index !== item.publishDate.length - 1 && "-"}
        </span>
      )),
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteCoverage(item.id)}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });
  const token = JSON.parse(localStorage.getItem("token"));

  const handleDownloadPosts = async (typePost) => {
    let typeName = "";
    let baseUrl = "";

    if (typePost === "coverage") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-coverages?employeeId=${employeeId}`;
      typeName = "Coverages";
    }

    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${typeName}.xlsx`); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const linkTo = locationRole
    ? "/superadminpanel/levelIllumination"
    : "/levelIllumination";

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <Flex>
          <Spin />
        </Flex>
      </div>
    );
  }

  if (coverageData?.length < 1) {
    return (
      <div>
        <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center ">
          <div className="text-3xl text-[#0000007e] select-none ">
            <img src={gif} alt="" />
          </div>
          <div className="flex justify-end mb-8 absolute top-[100px] right-[50px]">
            <Link
              to={linkTo}
              className="bg-blue-500 text-white px-10 py-3 rounded flex items-center gap-4 "
            >
              Qo'shish <FaPlusSquare />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="pb-16 container w-[98%] mx-auto pt-4">
          {/* Televediniye */}
          <div className="flex justify-end mb-8">
            <Link
              to={linkTo}
              className="bg-blue-500 text-white px-10 py-3 rounded flex items-center gap-4"
            >
              Qo'shish <FaPlusSquare />
            </Link>
          </div>
          {coverageData?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  {location.pathname === "/dashboard" ? (
                    <span className="font-[500] mr-2">
                      OTM faoliyatidagi turli tadbir (media reja)larni ommaviy
                      axborot vositalari orqali yoritilganlik darajasi
                    </span>
                  ) : (
                    <span className="font-[500] mr-2">
                      Vazirlik faoliyatidagi turli tadbir (media reja)larni
                      ommaviy axborot vositalari orqali yoritilganlik darajasi
                    </span>
                  )}
                </h2>
                {!locationRole && (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("coverage")}
                  >
                    Excel
                  </button>
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsCoverage}
                    dataSource={dataCoverage}
                    bordered
                    rowClassName=" dark:bg-inherit"
                    className="z-0"
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
