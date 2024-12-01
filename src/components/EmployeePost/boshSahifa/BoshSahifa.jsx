import React, { useEffect, useState } from "react";
// import { useEmployeeInfo } from "../../../hooks/useEmployeeInfo";
import { Button, Flex, Popconfirm, Spin, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../../feature/queryApi";
import gif from "../../../images/ezgif-2-4f3658adc3-ezgif.com-gif-maker.gif";
import { Link, useLocation } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { ip } from "../../../ips";

const sharedOnCell = () => {};

export default function BoshSahifa() {
  const queryClient = useQueryClient();
  const [coverageData, setCoverage] = useState([]);
  const [employeeId, seEmployeeId] = useState();
  const [postData, setPostData] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const [foreignData, setForeignData] = useState([]);
  const [material, setMaterial] = useState([]);
  const [official, setOfficial] = useState([]);
  const [online, setOnline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mediaProjects, setMediaProjects] = useState([]);

  var location = useLocation();

  // console.log(employeeId);
  const columns = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title:
        location.pathname === "/dashboard"
          ? "Koʻrsatuvda qatnashgan OTM vakilining F.I.O"
          : "Koʻrsatuvda qatnashgan vazirlik vakilining F.I.O",
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

  const columnsForeign = [
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

  const columnsmaterial = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Material mavzusi",
      dataIndex: "topic",
      onCell: sharedOnCell,
    },
    {
      title: "Material shakli",
      dataIndex: "type",
      onCell: sharedOnCell,
    },
    {
      title: " E’lon qilingan OAV/Ijtimoiy tarmoq turi",
      dataIndex: "massMedia",
      onCell: sharedOnCell,
    },
    {
      title: "E’lon qilingan sanasi",
      dataIndex: "publishDate",
      onCell: sharedOnCell,
    },
    {
      title: "E’lon qilingan OAV/Ijtimoiy tarmoq nomi",
      dataIndex: "socialMediaName",
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

  const columnsMediaProjetcs = [
    {
      title: "T/r",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Medialoyiha nomi",
      dataIndex: "title",
      onCell: sharedOnCell,
    },
    {
      title: "Loyiha tavsifi",
      dataIndex: "description",
      onCell: sharedOnCell,
    },
    {
      title: "E’lon qilingan OAV/Ijtimoiy tarmoq turi",
      dataIndex: "tarmoqTuri",
      onCell: sharedOnCell,
    },
    {
      title: "Davriyligi",
      dataIndex: "period",
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

  // Malumotlarni olib kelish va chiqarish
  const getTypePost = useMutation(oavIV.getTypePost, {
    onSuccess: (data) => {
      setPostData(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getTypeMediaEvent = useMutation(oavIV.getTypeMediaEvent, {
    onSuccess: (data) => {
      setMediaData(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getTypeForeign = useMutation(oavIV.getTypeForeign, {
    onSuccess: (data) => {
      setForeignData(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getTypematerial = useMutation(oavIV.getTypeMaterial, {
    onSuccess: (data) => {
      setMaterial(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  // Malumotlarni olib kelish va chiqarish
  const getOfficialPage = useMutation(oavIV.getOfficialPage, {
    onSuccess: (data) => {
      setOfficial(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  const getOnlineEvent = useMutation(oavIV.getOnlineEvent, {
    onSuccess: (data) => {
      setOnline(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

  const getMediaProjects = useMutation(oavIV.getMediaProjects, {
    onSuccess: (data) => {
      setMediaProjects(data);
      setLoading(false);
      queryClient.invalidateQueries();
    },
  });

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
    Promise.all([getTypePost.mutateAsync(), getTypeMediaEvent.mutateAsync()])
      .then(() => {
        Promise.all([
          getTypeForeign.mutateAsync(),
          getTypematerial.mutateAsync(),
        ]);
      })
      .then(() => {
        Promise.all([
          getOfficialPage.mutateAsync(),
          getOnlineEvent.mutateAsync(),
        ]);
      })
      .then(() => {
        Promise.all([
          getMediaProjects.mutateAsync(),
          getCoverage.mutateAsync(),
          getEmpoyeeId.mutate(),
        ]);
      })
      .then(() => {
        console.log("All request done");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  // Postlarni table uchun datalar
  const dataTable = postData?.map((item, index) => {
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

    const dateArray = item.dateTime;
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
  });

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
  const dataForeign = foreignData?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.title}`,
      yoritShakli: item.illumination,
      type: item.typeMediaSocial,
      link: item.mediaNameAndLink
        ? Object.entries(item.mediaNameAndLink).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>:{" "}
              <Link to={url} target="_blank">
                `{url}`
              </Link>
            </div>
          ))
        : "",
      publishDate: item.publishedDate.map((i, index) => (
        <span key={index}>
          {i}
          {index !== item.publishedDate.length - 1 && "-"}
        </span>
      )),
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteForeign(item.id)}
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
    let type = ""; // Mahalliy oʻzgaruvchi sifatida ishlatamiz
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
      link: (
        <Link to={`${item.link}`} target="_blank">
          {item.link}
        </Link>
      ),
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
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

  const dataMediaProjects = mediaProjects?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.name}`,
      description: item.description,
      tarmoqTuri: item.massMedia,
      period: item.period,
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
          onConfirm={() => handleDeleteMediaProjects(item.id)}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

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

  // Postni Oʻchirish uchun backendga soʻrov Yuborish
  const deletePost = useMutation(oavIV.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni Oʻchirish uchun backendga soʻrov Yuborish
  const deleteMediaEvent = useMutation(oavIV.deleteMediaEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni Oʻchirish uchun backendga soʻrov Yuborish
  const deletematerial = useMutation(oavIV.deleteMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni Oʻchirish uchun backendga soʻrov Yuborish
  const deleteofficial = useMutation(oavIV.deleteOfficial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Onlineni Oʻchirish uchun backendga soʻrov Yuborish
  const deleteOnline = useMutation(oavIV.deleteOnline, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // MediaProjects Oʻchirish uchun backendga soʻrov Yuborish
  const deleteMediaProjects = useMutation(oavIV.deleteMediaProjects, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Coverage Oʻchirish uchun backendga soʻrov Yuborish
  const deleteCoverage = useMutation(oavIV.deleteCoverage, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Coverage Oʻchirish uchun backendga soʻrov Yuborish
  const deleteForeign = useMutation(oavIV.deleteForeign, {
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
  const handleDeleteMaterial = (id) => {
    deletematerial.mutate(id, {
      onSuccess: () => {
        setMaterial((prevMaterial) =>
          prevMaterial.filter((item) => item.id !== id)
        );
        queryClient.invalidateQueries();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };
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
  const handleDeleteMediaProjects = (id) => {
    deleteMediaProjects.mutate(id, {
      onSuccess: () => {
        setMediaProjects((prevMediaProject) =>
          prevMediaProject.filter((item) => item.id !== id)
        );
        queryClient.invalidateQueries();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };
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
  const handleDeleteForeign = (id) => {
    deleteForeign.mutate(id, {
      onSuccess: () => {
        // Backenddan muvaffaqiyatli oʻchirilgandan soʻng interfeysni yangilash
        setForeignData((prevCoverage) =>
          prevCoverage.filter((item) => item.id !== id)
        );
        queryClient.invalidateQueries(); // Cache-ni yangilash
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDownloadPosts = async (typePost) => {
    let baseUrl = `http://${ip}:8080/api/excel/export-employee-posts?employeeId=${employeeId}`;
    let typeName = "";

    if (typePost === "post") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-posts?employeeId=${employeeId}`;
      typeName = "Posts";
    } else if (typePost === "event") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-media-events?employeeId=${employeeId}`;
      typeName = "MediaEvent";
    } else if (typePost === "material") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-materials?employeeId=${employeeId}`;
      typeName = "Materials";
    } else if (typePost === "foreign") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-foreign-material?employeeId=${employeeId}`;
      typeName = "Foreign";
    } else if (typePost === "online") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-broadcasts?employeeId=${employeeId}`;
      typeName = "OnlineBroadcasts";
    } else if (typePost === "project") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-media-projects?employeeId=${employeeId}`;
      typeName = "MediaProjects";
    } else if (typePost === "coverage") {
      baseUrl = `http://${ip}:8080/api/excel/export-employee-coverages?employeeId=${employeeId}`;
      typeName = "Coverages";
    } else if (typePost === "admin") {
      baseUrl = `http://${ip}:8080/api/excel/export-admin-posts`;
      typeName = "AdminExcel";
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

  // loading va Error qismi
  if (loading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <Flex>
          <Spin />
        </Flex>
      </div>
    );
  }
  if (
    postData?.length < 1 &&
    mediaData?.body?.length < 1 &&
    material?.length < 1 &&
    online?.length < 1 &&
    official?.length < 1 &&
    mediaProjects?.length < 1 &&
    coverageData?.length < 1 &&
    foreignData?.length < 1
  ) {
    return (
      <div>
        <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center ">
          <div className="text-3xl text-[#0000007e] select-none ">
            <img src={gif} alt="" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {location.pathname === "/dashboard" ? (
          ""
        ) : (
          <div className="flex justify-end w-[98%] mx-auto">
            <button
              className="px-8 py-1 bg-green-500 rounded-md text-white"
              onClick={() => handleDownloadPosts("admin")}
            >
              Excel
            </button>
          </div>
        )}
        <div className="pb-16 container w-[98%] mx-auto pt-4">
          {/* Televediniye */}

          {postData?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy
                    tarmoqlar orqali yoritilishi
                  </span>
                </h2>
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("post")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
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

          {mediaData?.body?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar.
                  </span>
                </h2>
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("event")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
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

          {foreignData?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <span className="font-[500] mr-2">
                  {location.pathname === "/superadminpanel/dashboard" ? (
                    <h2 className="text-[20px]  dark:text-white">
                      Xorijiy OAVlarida vazirlik faoliyatiga doir E’lon qilingan
                      materiallar
                    </h2>
                  ) : (
                    <h2 className="text-[20px]  dark:text-white">
                      Xorijiy OAVlarida OTM faoliyatiga doir E’lon qilingan
                      materiallar
                    </h2>
                  )}
                </span>
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("foreign")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsForeign}
                    dataSource={dataForeign}
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

          {material?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Faoliyatga doir axborotni yetkazib berishda akustik va
                    vizual materiallardan foydalanganligi
                  </span>
                </h2>
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("material")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsmaterial}
                    dataSource={dataMaterial}
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

          {online?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat) lar
                    soni
                  </span>
                </h2>
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("online")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
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

          {mediaProjects?.length > 0 ? (
            <div>
              <div className="mb-3 flex justify-between items-center">
                <h2 className="text-[20px]  dark:text-white">
                  <span className="font-[500] mr-2">
                    Axborot xizmati tomonidan yoʻlga qoʻyilgan medialoyihalar
                  </span>
                </h2>
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("project")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="Televediniye z-[] relative">
                  <Table
                    columns={columnsMediaProjetcs}
                    dataSource={dataMediaProjects}
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
                {location.pathname === "/dashboard" ? (
                  <button
                    className="px-8 py-1 bg-green-500 rounded-md text-white"
                    onClick={() => handleDownloadPosts("coverage")}
                  >
                    Excel
                  </button>
                ) : (
                  ""
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
