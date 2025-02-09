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

export default function OnlineEfirDashboard() {
  const [online, setOnline] = useState([]);

  const [employeeId, seEmployeeId] = useState();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const location = useLocation();

  const [locationRole, setLocationRole] = useState(true);

  useEffect(() => {
    if (location.pathname === "/superadminpanel/onlayn_efir_dashboard") {
      setLocationRole(true);
    } else {
      setLocationRole(false);
      getEmpoyeeId.mutate();
    }
  }, []);
  const columnsOnline = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Onlayn efir/ovozli chat mavzusi",
      dataIndex: "title",
      onCell: sharedOnCell,
    },
    {
      title: "oʻtkazilgan sanasi",
      dataIndex: "date",
      onCell: sharedOnCell,
    },
    {
      title: "Rahbar xodimlarining ishtiroki",
      dataIndex: "participation",
      onCell: sharedOnCell,
    },
    {
      title: "Ijtimoiy tarmoq nomi",
      dataIndex: "mesengerTitle",
      onCell: sharedOnCell,
    },
    {
      title: "Ishtirokchilar soni",
      dataIndex: "amountAttand",
      onCell: sharedOnCell,
    },
    {
      title: "Havolasi",
      dataIndex: "link",
      onCell: sharedOnCell,
    },
    {
      title: "Oʻchirish",
      dataIndex: "action",
      onCell: sharedOnCell,
    },
  ];

  const getOnlineEvent = useMutation(oavIV.getOnlineEvent, {
    onSuccess: (data) => {
      setOnline(data);
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
    Promise.all([getOnlineEvent.mutateAsync()])
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const deleteOnline = useMutation(oavIV.deleteOnline, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDeleteOnline = (id) => {
    deleteOnline.mutate(id, {
      onSuccess: () => {
        setOnline((prevOnline) => prevOnline.filter((item) => item.id !== id));
        queryClient.invalidateQueries();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };
  console.log(online);
  const dataOnline = online?.map((item, index) => {
    const publishDate = item.eventDate
      .map((num) => (num > 10 ? num : `0${num}`))
      .join("-");
    return {
      key: index + 1,
      title: `${item.title}`,
      date: publishDate,
      participation: item.stuff.map((i, index) => (
        <span key={index}>{i}, </span>
      )),
      mesengerTitle: item.messenger,
      amountAttand: item.numberOfPeople,
      link: (
        <Link to={`${item.link}`} target="_blank">
          {" "}
          {item.link}
        </Link>
      ),
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteOnline(item.id)}
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

    if (typePost === "online") {
      baseUrl = `${ip}/excel/export-employee-broadcasts?employeeId=${employeeId}`;
      typeName = "OnlineBroadcasts";
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
  const linkTo = locationRole ? "/superadminpanel/onlayn_efir" : "/onlayn_efir";

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <Flex>
          <Spin />
        </Flex>
      </div>
    );
  }

  if (online?.length < 1) {
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
          {online?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat) lar
                    soni
                  </span>
                </h2>
                {!locationRole && (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("online")}
                  >
                    Excel
                  </button>
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsOnline}
                    dataSource={dataOnline}
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
