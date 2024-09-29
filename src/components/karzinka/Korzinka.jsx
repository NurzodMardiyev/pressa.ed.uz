import { Button, Popconfirm, Table } from "antd";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { useGetTrashes } from "../../hooks/useGetTypePosts";
import { FiRefreshCw } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

const sharedOnCell = () => {};
const columns = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Ko'rsatuvda qatnashgan OTM vakili F.I.O",
    dataIndex: "fio",
    onCell: sharedOnCell,
  },
  {
    title: "Faoliyatga doir axborot turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "TV nomi",
    dataIndex: "tvName",
    onCell: sharedOnCell,
  },
  {
    title: "Dastur nomi",
    dataIndex: "appName",
    onCell: sharedOnCell,
  },
  {
    title: "Chiqqan sanasi va vaqti",
    dataIndex: "date",
    onCell: sharedOnCell,
  },
  {
    title: "Miqyosi (respublika, hududiy yoki xorijiy)",
    dataIndex: "miqyosi",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi (http bilan boshlanishi shart!)",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Tiklash",
    dataIndex: "reload",
    onCell: sharedOnCell,
  },
  {
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsMedia = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Hodisa Nomi",
    dataIndex: "eventName",
    onCell: sharedOnCell,
  },
  {
    title: " turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "Ishchilar Ro'yhati",
    dataIndex: "stuffs",
    onCell: sharedOnCell,
  },
  {
    title: "messengers",
    dataIndex: "messengers",
    onCell: sharedOnCell,
  },
  {
    title: "newspapers",
    dataIndex: "newspapers",
    onCell: sharedOnCell,
  },
  {
    title: "radio_channels",
    dataIndex: "radio_channels",
    onCell: sharedOnCell,
  },
  {
    title: "tv_channels",
    dataIndex: "tv_channels",
    onCell: sharedOnCell,
  },
  {
    title: "Tiklash",
    dataIndex: "reload",
    onCell: sharedOnCell,
  },
  {
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsmaterial = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Material mavzusi",
    dataIndex: "topic",
    onCell: sharedOnCell,
  },
  {
    title: " turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: " E'lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "massMedia",
    onCell: sharedOnCell,
  },
  {
    title: "E'lon qilingan sanasi",
    dataIndex: "publishDate",
    onCell: sharedOnCell,
  },
  {
    title: "Material mavzusi",
    dataIndex: "socialMediaName",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Tiklash",
    dataIndex: "reload",
    onCell: sharedOnCell,
  },
  {
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

export default function Korzinka() {
  const queryClient = useQueryClient();

  const getTrash = useMutation(oavIV.getTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (Error) => {
      console.log(Error);
    },
  });

  // const deletePost = useMutation(oavIV.deletePost, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //     console.log("delete ketti");
  //   },
  //   onError: () => {
  //     console.log("error");
  //   },
  // });

  // // Postni o'chirish uchun backendga so'rov Yuborish
  // const deleteMediaEvent = useMutation(oavIV.deleteMediaEvent, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //     console.log("delete ketti");
  //   },
  //   onError: () => {
  //     console.log("error");
  //   },
  // });

  useEffect(() => {
    getTrash.mutate();
  }, []);

  // const handleDeletePost = (id) => {
  //   deletePost.mutate(id);
  // };
  // const handleDeleteMediaEvent = (id) => {
  //   deleteMediaEvent.mutate(id);
  // };

  const { data: trashData } = useGetTrashes();

  console.log(trashData);

  const dataTable = trashData
    ? trashData[0]?.map((item, index) => {
        let type = ""; // Mahalliy o'zgaruvchi sifatida ishlatamiz
        if (item.postType === "TV_CHANNEL") {
          type = "Televediniya";
        } else if (item.postType === "RADIO_CHANNEL") {
          type = "Radio";
        } else if (item.postType === "MESSENGER") {
          type = "Ijtimoiy tarmoq va messengerlar";
        } else if (item.postType === "WEB_SITE") {
          type = "Internet saytlari";
        } else {
          type = "Ommaviy axborot vositalari";
        }
        return {
          key: index + 1,
          fio: `${item.showedUser}`,
          type: (
            <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
              {type}
            </div>
          ),
          tvName: item.media,
          appName: item.show,
          date: `${String(item.dateTime[2]).padStart(2, "0")}-${String(
            item.dateTime[1]
          ).padStart(2, "0")}-${String(item.dateTime[0]).slice(2)}`,
          miqyosi: item.scale,
          link: item.link,
          reload: (
            <Popconfirm
              title={`${type}ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              // onConfirm={() => handleDeletePost(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`${type}ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              // onConfirm={() => handleDeletePost(item.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];
  const dataTableMedia = trashData
    ? trashData[1]?.map((item, index) => {
        let type = ""; // Mahalliy o'zgaruvchi sifatida ishlatamiz
        if (item.mediaEventType === "PRESS_CONFERENCE") {
          type = "Matbuot anjumani";
        } else if (item.mediaEventType === "BRIFING") {
          type = "Brifing";
        } else {
          type = "Press tur";
        }
        return {
          key: index + 1,
          eventName: `${item.eventName}`,
          type: (
            <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
              {type}
            </div>
          ),
          stuffs: item.stuff.map((i) => {
            return i + ", ";
          }),
          messengers: "",
          newspapers: item.newspapers,
          radio_channels: item.radio_channels,
          tv_channels: item.tv_channels,
          reload: (
            <Popconfirm
              title={`${type}ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              // onConfirm={() => handleDeletePost(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`${type}ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              // onConfirm={() => handleDeleteMediaEvent(item.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  const dataMaterial = trashData
    ? trashData[2]?.map((item, index) => {
        let type = ""; // Mahalliy o'zgaruvchi sifatida ishlatamiz
        if (item.materialType === "VIDEO") {
          type = "Video";
        } else if (item.materialType === "INFOGRAPHIC") {
          type = "Infografika";
        } else {
          type = "Audio";
        }

        const publishDate = item.publishDate
          .map((num) => (num > 10 ? num : `0${num}`))
          .join("-");
        return {
          key: index + 1,
          topic: `${item.topic}`,
          type: (
            <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
              {type}
            </div>
          ),
          massMedia: item.massMedia,
          publishDate: publishDate,
          socialMediaName: item.socialMediaName,
          link: item.link,
          reload: (
            <Popconfirm
              title={`${type}ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              // onConfirm={() => handleDeletePost(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`${type}ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              // onConfirm={() => handleDeleteMaterial(item.id)}
            >
              <Button danger> Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-[20px]  dark:text-white">
          <span className="font-[500] mr-2">
            Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy
            tarmoqlar orqali yoritilishi
          </span>
        </h2>
      </div>
      <div>
        <div className="televediniya">
          <Table
            columns={columns}
            dataSource={dataTable}
            bordered
            rowClassName=" dark:bg-inherit"
          />
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-[20px]  dark:text-white">
          <span className="font-[500] mr-2">
            Matbuot kotibi tomonidan o‘tkazilgan mediyatadbirlar.
          </span>
        </h2>
      </div>
      <div>
        <div className="televediniya">
          <Table
            columns={columnsMedia}
            dataSource={dataTableMedia}
            bordered
            rowClassName=" dark:bg-inherit"
          />
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-[20px]  dark:text-white">
          <span className="font-[500] mr-2">
            Faoliyatga doir axborotni yetkazib berishda akustik va vizual
            materiallardan foydalanganligi
          </span>
        </h2>
      </div>
      <div>
        <div className="televediniya">
          <Table
            columns={columnsmaterial}
            dataSource={dataMaterial}
            bordered
            rowClassName=" dark:bg-inherit"
          />
        </div>
      </div>
    </div>
  );
}
