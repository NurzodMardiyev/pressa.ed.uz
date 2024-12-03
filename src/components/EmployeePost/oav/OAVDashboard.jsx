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

export default function OAVDashboard() {
  const [postData, setPostData] = useState([]);
  const location = useLocation();
  const [employeeId, seEmployeeId] = useState();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const [locationRole, setLocationRole] = useState(true);

  useEffect(() => {
    if (location.pathname === "/superadminpanel/oav_dashboard") {
      setLocationRole(true);
    } else {
      setLocationRole(false);
      getEmpoyeeId.mutate();
    }
  }, []);

  // console.log(employeeId);
  const columns = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: locationRole
        ? "Koʻrsatuvda qatnashgan vazirlik vakilining F.I.O"
        : "Koʻrsatuvda qatnashgan OTM vakilining F.I.O",
      dataIndex: "fio",
      onCell: sharedOnCell,
    },
    {
      title: "Lavozimi",
      dataIndex: "stuff",
      onCell: sharedOnCell,
    },
    {
      title: "Faoliyatga doir axborot turi",
      dataIndex: "type",
      onCell: sharedOnCell,
    },
    {
      title: "OAV nomi",
      dataIndex: "tvName",
      onCell: sharedOnCell,
    },
    {
      title: "Dastur nomi",
      dataIndex: "appName",
      onCell: sharedOnCell,
    },
    {
      title: "Tadbir oʻtkazilgan sanasi va vaqti",
      dataIndex: "date",
      onCell: sharedOnCell,
    },
    {
      title: "Miqyosi",
      dataIndex: "miqyosi",
      onCell: sharedOnCell,
    },
    {
      title: "Havolasi ",
      dataIndex: "link",
      onCell: sharedOnCell,
    },
    {
      title: "Oʻchirish",
      dataIndex: "action",
      onCell: sharedOnCell,
    },
  ];

  const getTypePost = useMutation(oavIV.getTypePost, {
    onSuccess: (data) => {
      setPostData(data);
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
    Promise.all([getTypePost.mutateAsync()])
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const deletePost = useMutation(oavIV.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDeletePost = (id) => {
    deletePost.mutate(id, {
      onSuccess: () => {
        setPostData((prevPostData) =>
          prevPostData.filter((item) => item.id !== id)
        );
        queryClient.invalidateQueries();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };

  const dataTable = postData
    ?.map((item, index) => {
      let type = ""; // Mahalliy oʻzgaruvchi sifatida ishlatamiz
      if (item.postType === "televediniye") {
        type = "Televediniye";
      } else if (item.postType === "radio") {
        type = "Radio";
      } else if (item.postType === "messenger") {
        type = "Ijtimoiy tarmoq va messengerlar";
      } else if (item.postType === "internet_sites") {
        type = "Internet saytlari";
      } else if (item.postType === "gazeta") {
        type = "Gazeta va jurnallar";
      } else {
        type = "";
      }

      // Faqat "Televediniye" bo'lgandagina qaytaradi
      if (type !== "Gazeta va jurnallar") {
        return null; // null qaytaradi, map avtomatik filtr qiladi
      }

      const dateArray = item.dateTime;
      const date = new Date(
        dateArray[0],
        dateArray[1] - 1,
        dateArray[2],
        dateArray[3],
        dateArray[4]
      );

      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getFullYear()
      ).slice(2)} ${String(date.getHours()).padStart(2, "0")}-${String(
        date.getMinutes()
      ).padStart(2, "0")}`;

      return {
        key: index + 1,
        fio: `${item.showedUser}`,
        stuff: item.stuff,
        type: (
          <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
            {type}
          </div>
        ),
        tvName: item.media,
        appName: item.show,
        date: formattedDate,
        miqyosi: item.scale,
        link: (
          <Link to={item.link} target="_blank">
            {item.link}
          </Link>
        ),
        action: (
          <Popconfirm
            title={`${type}ga tegishli post`}
            description="Haqiqatdan ham oʻchirmoqchimisiz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeletePost(item.id)}
          >
            <Button danger>
              <FaTrashAlt />
            </Button>
          </Popconfirm>
        ),
      };
    })
    .filter((item) => item !== null);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDownloadPosts = async (typePost) => {
    let typeName = "";
    let baseUrl = "";

    if (typePost === "post") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-posts?employeeId=${employeeId}`;
      typeName = "Posts";
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

  const linkTo = locationRole ? "/superadminpanel/oav" : "/oav";

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <Flex>
          <Spin />
        </Flex>
      </div>
    );
  }

  if (postData?.length < 1) {
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

          {postData?.length > 0 ? (
            <div>
              <div className="flex justify-end mb-8">
                <Link
                  to={linkTo}
                  className="bg-blue-500 text-white px-10 py-3 rounded flex items-center gap-4"
                >
                  Qo'shish <FaPlusSquare />
                </Link>
              </div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy
                    tarmoqlar orqali yoritilishi
                  </span>
                </h2>
                {!locationRole && (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("post")}
                  >
                    Excel
                  </button>
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columns}
                    dataSource={dataTable}
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
