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

export default function TelegramDashboard() {
  const [official, setOfficial] = useState([]);

  const location = useLocation();
  const [employeeId, seEmployeeId] = useState();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  console.log(official);
  // console.log(employeeId);
  const columnsOfficial = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Telegram linki va obunachilar soni",
      dataIndex: "telegram",
      onCell: sharedOnCell,
    },
    {
      title: " Instagram linki va obunachilar soni",
      dataIndex: "instagram",
      onCell: sharedOnCell,
    },
    {
      title: "You Tube linki va obunachilar soni",
      dataIndex: "youtube",
      onCell: sharedOnCell,
    },
    {
      title: "X linki va obunachilar soni",
      dataIndex: "x",
      onCell: sharedOnCell,
    },
    {
      title: "Oʻchirish",
      dataIndex: "action",
      onCell: sharedOnCell,
    },
  ];

  const getOfficialPage = useMutation(oavIV.getOfficialPage, {
    onSuccess: (data) => {
      setOfficial(data);
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
    Promise.all([getOfficialPage.mutateAsync(), getEmpoyeeId.mutate()])
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const deleteofficial = useMutation(oavIV.deleteOfficial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDeleteofficail = (id) => {
    deleteofficial.mutate(id, {
      onSuccess: () => {
        setOfficial((prevOfficial) =>
          prevOfficial.filter((item) => item.id !== id)
        );
        queryClient.invalidateQueries();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };

  const dataOfficial = official?.map((item, index) => {
    return {
      key: index + 1,
      telegram: (
        <div className="flex gap-3">
          <Link to={item.messengersAndLinks.TELEGRAM} className="font-semibold">
            {item.messengersAndLinks.TELEGRAM}
          </Link>{" "}
          <span>{item.followers.TELEGRAM}</span>
        </div>
      ),
      instagram: (
        <div className="flex gap-3">
          <Link
            to={item.messengersAndLinks.INSTAGRAM}
            className="font-semibold"
          >
            {item.messengersAndLinks.INSTAGRAM}
          </Link>{" "}
          <span>{item.followers.INSTAGRAM}</span>
        </div>
      ),
      youtube: (
        <div className="flex gap-3">
          <Link to={item.messengersAndLinks.YOUTUBE} className="font-semibold">
            {item.messengersAndLinks.YOUTUBE}
          </Link>{" "}
          <span>{item.followers.YOUTUBE}</span>
        </div>
      ),
      x: (
        <div className="flex gap-3">
          <Link to={item.messengersAndLinks.X} className="font-semibold">
            {item.messengersAndLinks.X}
          </Link>{" "}
          <span>{item.followers.X}</span>
        </div>
      ),
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteofficail(item.id)}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <Flex>
          <Spin />
        </Flex>
      </div>
    );
  }

  if (official?.length < 1) {
    return (
      <div>
        <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center ">
          <div className="text-3xl text-[#0000007e] select-none ">
            <img src={gif} alt="" />
          </div>
          <div className="flex justify-end mb-8 absolute top-[100px] right-[50px]">
            <Link
              to="/telegram"
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
              to="/telegram"
              className="bg-blue-500 text-white px-10 py-3 rounded flex items-center gap-4"
            >
              Qo'shish <FaPlusSquare />
            </Link>
          </div>

          {official?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Ijtimoiy tarmoq va messenjerlardagi OTM rasmiy sahifalarida
                    obunachilar soni
                  </span>
                </h2>
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsOfficial}
                    dataSource={dataOfficial}
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
