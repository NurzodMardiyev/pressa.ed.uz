import React, { useEffect } from "react";
// import { useEmployeeInfo } from "../../../hooks/useEmployeeInfo";
import { Button, Flex, Popconfirm, Spin, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../../feature/queryApi";
import {
  useGetTypeMaterial,
  useGetTypeMediaEvent,
  useGetTypeOfficial,
  useGetTypePosts,
} from "../../../hooks/useGetTypePosts";
import { Link } from "react-router-dom";
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
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsOfficial = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Ijtimoiy tarmoqdagi obunachilar soni",
    dataIndex: "number1",
    onCell: sharedOnCell,
  },
  {
    title: " turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title:
      "OTMda rasman faoliyat yuritadiganlar soni jami (barchasi, asosiy va o'rindoshlar soni)",
    dataIndex: "number2",
    onCell: sharedOnCell,
  },
  {
    title: "Boshqaruv xodimlari umumiy soni.",
    dataIndex: "number3",
    onCell: sharedOnCell,
  },
  {
    title: "Professor-o'qituvchilar soni jami (asosiy, o'rindosh)",
    dataIndex: "number4",
  },
  {
    title:
      "Talabalar soni jami (kunduzgi, sirtqi, kechki, masofaviy, magister, doktorant)",
    dataIndex: "number5",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

export default function BoshSahifa() {
  const queryClient = useQueryClient();

  const { data: postData, error, isLoading } = useGetTypePosts();
  const { data: mediaData } = useGetTypeMediaEvent();
  const { data: material } = useGetTypeMaterial();
  const { data: official } = useGetTypeOfficial();

  console.log(official);

  // Malumotlarni olib kelish va chiqarish
  const getTypePost = useMutation(oavIV.getTypePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getTypeMediaEvent = useMutation(oavIV.getTypeMediaEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getTypematerial = useMutation(oavIV.getTypeMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getOfficialPage = useMutation(oavIV.getOfficialPage, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    getTypePost.mutate();
    getTypeMediaEvent.mutate();
    getTypematerial.mutate();
    getOfficialPage.mutate();
  }, []);
  // console.log(data);

  // Postlarni table uchun datalar
  const dataTable = postData?.map((item, index) => {
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
      link: <Link to={item.link}>{item.link}</Link>,
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
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
  });

  // console.log(mediaData);

  const dataTableMedia = mediaData?.body?.map((item, index) => {
    let type = ""; // Mahalliy o'zgaruvchi sifatida ishlatamiz
    if (item.mediaEventType === "PRESS_CONFERENCE") {
      type = "Matbuot anjumani";
    } else if (item.mediaEventType === "BRIEFING") {
      type = "Brifing";
    } else if (item.mediaEventType === "PRESS_TOUR") {
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
      messengers: item.messengers
        ? Object.entries(item.messengers).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      newspapers: item.newspapers
        ? Object.entries(item.newspapers).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      radio_channels: item.radio_channels
        ? Object.entries(item.radio_channels).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      tv_channels: item.tv_channels
        ? Object.entries(item.tv_channels).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
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

  const dataMaterial = material?.map((item, index) => {
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
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteMaterial(item.id)}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataOfficial = official?.map((item, index) => {
    return {
      key: index + 1,
      number1: item.amountOfFollowers,
      type: (
        <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
          {item.massMedia}
        </div>
      ),
      number2: item.organization.allEmployeesAmount,
      number3: item.organization.employeesOfAdministrationAmount,
      number4: item.organization.professorTeachersAmount,
      number5: item.organization.allStudentsAmount,
      link: item.link,
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
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
  // Postni o'chirish uchun backendga so'rov Yuborish
  const deletePost = useMutation(oavIV.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deleteMediaEvent = useMutation(oavIV.deleteMediaEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deletematerial = useMutation(oavIV.deleteMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleDeletePost = (id) => {
    deletePost.mutate(id);
  };
  const handleDeleteMediaEvent = (id) => {
    deleteMediaEvent.mutate(id);
  };
  const handleDeleteMaterial = (id) => {
    deletematerial.mutate(id);
  };

  // loading va Error qismi
  if (isLoading)
    return (
      <div>
        <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center">
          <Flex>
            <Spin size="large" />
          </Flex>
        </div>
      </div>
    );
  if (error) return <div>Xato: {error.message}</div>;
  return (
    <div>
      <div className="pb-16 container w-[95%] mx-auto">
        {/* Televediniya */}

        <div className="mb-3">
          <h2 className="text-[20px]  dark:text-white">
            <span className="font-[500] mr-2">
              Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy
              tarmoqlar orqali yoritilishi
            </span>
          </h2>
        </div>
        <div>
          <div className="televediniya z-[] relative">
            <Table
              columns={columns}
              dataSource={dataTable}
              bordered
              rowClassName=" dark:bg-inherit"
              className="z-0"
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
          <div className="televediniya z-[] relative">
            <Table
              columns={columnsMedia}
              dataSource={dataTableMedia}
              bordered
              rowClassName=" dark:bg-inherit"
              className="z-0"
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
          <div className="televediniya z-[] relative">
            <Table
              columns={columnsmaterial}
              dataSource={dataMaterial}
              bordered
              rowClassName=" dark:bg-inherit"
              className="z-0"
            />
          </div>
        </div>

        <div className="mb-3">
          <h2 className="text-[20px]  dark:text-white">
            <span className="font-[500] mr-2">
              Ijtimoiy tarmoq va messenjerlardagi OTM rasmiy sahifalarida
              obunachilar soni
            </span>
          </h2>
        </div>
        <div>
          <div className="televediniya z-[] relative">
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
    </div>
  );
}
