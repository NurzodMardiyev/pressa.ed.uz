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

export default function MatbuotDashboard() {
  const [mediaData, setMediaData] = useState([]);

  const location = useLocation();
  const [employeeId, seEmployeeId] = useState();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const [locationRole, setLocationRole] = useState(true);

  useEffect(() => {
    if (location.pathname === "/superadminpanel/matbuot_anjumani_dashboard") {
      setLocationRole(true);
    } else {
      setLocationRole(false);
      getEmpoyeeId.mutate();
    }
  }, []);
  const columnsMedia = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Tadbir nomi",
      dataIndex: "eventName",
      onCell: sharedOnCell,
    },
    {
      title: "Mediatadbir turi",
      dataIndex: "type",
      onCell: sharedOnCell,
    },

    {
      title: "Rahbar xodimlarning ishtiroki",
      dataIndex: "stuffs",
      onCell: sharedOnCell,
    },
    {
      title: "Ijtimoiy tarmoqlar nomi va havolasi",
      dataIndex: "messengers",
      onCell: sharedOnCell,
    },
    {
      title: "Gazeta, jurnal nomi va havolasi",
      dataIndex: "newspapers",
      onCell: sharedOnCell,
    },
    {
      title: "Radiokanal nomi va havolasi",
      dataIndex: "radio_channels",
      onCell: sharedOnCell,
    },
    {
      title: "Telekanal nomi va havolasi",
      dataIndex: "tv_channels",
      onCell: sharedOnCell,
    },
    {
      title: "Veb sayt nomi va havolasi",
      dataIndex: "web_sites",
      onCell: sharedOnCell,
    },
    {
      title: " Tadbir oʻtkazilgan sanasi va vaqti",
      dataIndex: "time",
      onCell: sharedOnCell,
    },
    {
      title: "Oʻchirish",
      dataIndex: "action",
      onCell: sharedOnCell,
    },
  ];

  const getTypeMediaEvent = useMutation(oavIV.getTypeMediaEvent, {
    onSuccess: (data) => {
      setMediaData(data);
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
    Promise.all([getTypeMediaEvent.mutateAsync()])
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const deleteMediaEvent = useMutation(oavIV.deleteMediaEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDeleteMediaEvent = (id) => {
    deleteMediaEvent.mutate(id, {
      onSuccess: () => {
        setMediaData((prevMediaData) => {
          if (!prevMediaData?.body) return prevMediaData; // Tekshirish
          return {
            ...prevMediaData,
            body: prevMediaData.body.filter((item) => item.id !== id),
          };
        });
        queryClient.invalidateQueries();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };

  const dataTableMedia = mediaData?.body?.map((item, index) => {
    let type = ""; // Mahalliy oʻzgaruvchi sifatida ishlatamiz
    if (item.mediaEventType === "PRESS_CONFERENCE") {
      type = "Matbuot anjumani";
    } else if (item.mediaEventType === "BRIEFING") {
      type = "Brifing";
    } else if (item.mediaEventType === "PRESS_TOUR") {
      type = "Press tur";
    }

    const dateArray = item.dateOfEvent;
    const date = new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4]
    );

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear()).slice(2)} ${String(
      date.getHours()
    ).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}`;
    return {
      key: index + 1,
      eventName: `${item.eventName}`,
      type: (
        <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
          {type}
        </div>
      ),
      stuffs: item.stuff.map((i, index) => {
        return <span key={index}>{i + ", "}</span>;
      }),

      messengers: item.messengers
        ? Object.entries(item.messengers).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      newspapers: item.newspapers
        ? Object.entries(item.newspapers).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      radio_channels: item.radio_channels
        ? Object.entries(item.radio_channels).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      tv_channels: item.tv_channels
        ? Object.entries(item.tv_channels).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      web_sites: item.web_sites
        ? Object.entries(item.web_sites).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      time: formattedDate,
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteMediaEvent(item.id)}
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

    if (typePost === "event") {
      baseUrl = `${ip}/excel/export-employee-media-events?employeeId=${employeeId}`;
      typeName = "MediaEvent";
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
    ? "/superadminpanel/matbuot_anjumani"
    : "/matbuot_anjumani";

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <Flex>
          <Spin />
        </Flex>
      </div>
    );
  }

  if (mediaData?.body?.length < 1) {
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
          {mediaData?.body?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar.
                  </span>
                </h2>

                {!locationRole && (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("event")}
                  >
                    Excel
                  </button>
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsMedia}
                    dataSource={dataTableMedia}
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
