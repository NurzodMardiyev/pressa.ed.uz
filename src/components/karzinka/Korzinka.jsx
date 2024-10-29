import { Button, Popconfirm, Table } from "antd";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { useGetTrashes } from "../../hooks/useGetTypePosts";
import { FiRefreshCw } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import gif from "../../images/empty trash.gif";

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

const columnsOfficial = [
  {
    title: "No",
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

const columnsOnline = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Onlayn efir/ovozli chat mavzusi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "O'tkazilgan sanasi",
    dataIndex: "date",
    onCell: sharedOnCell,
  },
  {
    title: "OTM rahbar hodimlarining ishtiroki",
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

const columnsMediaProjetcs = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Medialoyiha nomi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "Loyiha tavfsifi",
    dataIndex: "description",
    onCell: sharedOnCell,
  },
  {
    title: "E'lon qilingan OAV/Ijtimoiy tarmoq turi",
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
const columnsCoverage = [
  {
    title: "No",
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
    title: "E'lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritilgan OAV nomi va linki!",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Yaratilgan sanasi",
    dataIndex: "publishDate",
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

  const reLoadPost = useMutation(oavIV.getPostReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  const reLoadMediaEvent = useMutation(oavIV.getMediaEventReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  const reLoadMaterial = useMutation(oavIV.getMaterialReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  const reLoadOnline = useMutation(oavIV.getOnlineReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  const reLoadOfficial = useMutation(oavIV.getOfficialReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });
  const reLoadMediaProjects = useMutation(oavIV.getMediaProjectsReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  const reLoadCoverages = useMutation(oavIV.getCoveragesReload, {
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deletePost = useMutation(oavIV.deletePosttoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // MediaEventni o'chirish uchun backendga so'rov Yuborish
  const deleteMediaEvent = useMutation(oavIV.deleteMediaEventtoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // Materialni o'chirish uchun backendga so'rov Yuborish
  const deleteMaterial = useMutation(oavIV.deleteMaterialtoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });
  // Materialni o'chirish uchun backendga so'rov Yuborish
  const deleteOnline = useMutation(oavIV.deleteOnlinetoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // Officialni o'chirish uchun backendga so'rov Yuborish
  const deleteOfficial = useMutation(oavIV.deleteOfficialtoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // MediaProjectsni o'chirish uchun backendga so'rov Yuborish
  const deleteMediaProjects = useMutation(oavIV.deleteMediaProjectstoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  // MediaProjectsni o'chirish uchun backendga so'rov Yuborish
  const deleteCoverages = useMutation(oavIV.deleteCoveragestoTrash, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("delete ketti");
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    getTrash.mutate();
  }, []);

  const handleReLoadPost = (id) => {
    reLoadPost.mutate(id);
  };
  const handleDeletePost = (id) => {
    deletePost.mutate(id);
  };

  const handleReLoadMediaEvent = (id) => {
    reLoadMediaEvent.mutate(id);
  };
  const handleDeleteMediaEvent = (id) => {
    deleteMediaEvent.mutate(id);
  };
  const handleReLoadMaterial = (id) => {
    reLoadMaterial.mutate(id);
  };
  const handleDeleteMaterial = (id) => {
    deleteMaterial.mutate(id);
  };
  const handleReLoadOnline = (id) => {
    reLoadOnline.mutate(id);
  };
  const handleDeleteOnline = (id) => {
    deleteOnline.mutate(id);
  };
  const handleReLoadOfficial = (id) => {
    reLoadOfficial.mutate(id);
  };
  const handleDeleteOfficial = (id) => {
    deleteOfficial.mutate(id);
  };
  const handleReLoadMediaProjects = (id) => {
    reLoadMediaProjects.mutate(id);
  };
  const handleDeleteMediaProjects = (id) => {
    deleteMediaProjects.mutate(id);
  };
  const handleReLoadCoverages = (id) => {
    reLoadCoverages.mutate(id);
  };
  const handleDeleteCoverages = (id) => {
    deleteCoverages.mutate(id);
  };
  const { data: trashData } = useGetTrashes();
  let trashPosts = [];
  let trashMaterial = [];
  let trashMediaEvent = [];
  let trashOnline = [];
  let trashOfficial = [];
  let trashMediaProjects = [];
  let trashCoverages = [];

  if (trashData) {
    Object.entries(trashData).forEach(([key, value]) => {
      if (key === "POSTS") {
        trashPosts = value;
      } else if (key === "MEDIA_EVENT") {
        trashMediaEvent = value;
      } else if (key === "MATERIALS") {
        trashMaterial = value;
      } else if (key === "ONLINE_BROADCAST") {
        trashOnline = value;
      } else if (key === "OFFICIAL_PAGE") {
        trashOfficial = value;
      } else if (key === "MEDIA_PROJECTS") {
        trashMediaProjects = value;
      } else if (key === "COVERAGES") {
        trashCoverages = value;
      }
    });
  } else {
    console.log("yoq");
  }

  // console.log(trashPosts);

  const dataTable = trashPosts
    ? trashPosts?.map((item, index) => {
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
              onConfirm={() => handleReLoadPost(item.id)}
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
              onConfirm={() => handleDeletePost(item.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];
  const dataTableMedia = trashMediaEvent
    ? trashMediaEvent?.map((item, index) => {
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
              onConfirm={() => handleReLoadMediaEvent(item.id)}
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
              onConfirm={() => handleDeleteMediaEvent(item.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  const dataMaterial = trashMaterial
    ? trashMaterial?.map((item, index) => {
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
              onConfirm={() => handleReLoadMaterial(item.id)}
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
              onConfirm={() => handleDeleteMaterial(item.id)}
            >
              <Button danger> Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  const dataOfficial = trashOfficial
    ? trashOfficial?.map((item, index) => {
        return {
          key: index + 1,
          telegram: (
            <div className="flex gap-3">
              <Link
                to={item.messengersAndLinks.TELEGRAM}
                className="font-semibold"
              >
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
              <Link
                to={item.messengersAndLinks.YOUTUBE}
                className="font-semibold"
              >
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
          reload: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleReLoadOfficial(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteOfficial(item.id)}
            >
              <Button danger> Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  const dataOnline = trashOnline
    ? trashOnline?.map((item, index) => {
        const publishDate = item.eventDate
          .map((num) => (num > 10 ? num : `0${num}`))
          .join("-");
        return {
          key: index + 1,
          title: `${item.title}`,
          date: publishDate,
          participation: item.stuff,
          mesengerTitle: item.messenger,
          amountAttand: item.numberOfPeople,
          link: <Link to={`${item.link}`}> {item.link}</Link>,
          reload: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleReLoadOnline(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
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
      })
    : [];

  const dataMediaProjects = trashMediaProjects
    ? trashMediaProjects?.map((item, index) => {
        return {
          key: index + 1,
          title: `${item.name}`,
          description: item.description,
          tarmoqTuri: item.massMedia,
          period: item.period,
          link: <Link to={`${item.link}`}> {item.link}</Link>,
          reload: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleReLoadMediaProjects(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteMediaProjects(item.id)}
            >
              <Button danger> Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  const dataCoverage = trashCoverages
    ? trashCoverages?.map((item, index) => {
        return {
          key: index + 1,
          title: `${item.eventName}`,
          tadbirTuri: item.eventType,
          yoritShakli: item.publishType,
          type: item.massMedia,
          link: item.mediaLinks
            ? Object.entries(item.mediaLinks).map(([name, url]) => (
                <div key={name}>
                  <span>{name}</span>: <Link to={url}>`{url}`</Link>
                </div>
              ))
            : "",
          publishDate: item.publishDate,
          reload: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleReLoadCoverages(item.id)}
            >
              <Button className="border-green-500 text-green-500">
                <FiRefreshCw />
              </Button>
            </Popconfirm>
          ),
          action: (
            <Popconfirm
              title={`ga tegishli post`}
              description="Haqiqatdan ham o'chirmoqchimisiz?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteCoverages(item.id)}
            >
              <Button danger> Delete</Button>
            </Popconfirm>
          ),
        };
      })
    : [];

  if (
    trashPosts?.length < 1 &&
    trashMaterial?.length < 1 &&
    trashMediaEvent?.length < 1 &&
    trashOnline?.length < 1 &&
    trashOfficial?.length < 1 &&
    trashMediaProjects?.length < 1 &&
    trashCoverages?.length < 1
  ) {
    return (
      <div>
        <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center z-[]">
          <div className="text-3xl text-[#0000007e] select-none">
            <img src={gif} alt="" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {trashPosts.length > 0 ? (
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
          </div>
        ) : (
          ""
        )}

        {trashMediaEvent.length > 0 ? (
          <div>
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
          </div>
        ) : (
          ""
        )}

        {trashMaterial.length > 0 ? (
          <div>
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
        ) : (
          ""
        )}

        {trashOnline.length > 0 ? (
          <div>
            <div className="mb-3">
              <h2 className="text-[20px]  dark:text-white">
                <span className="font-[500] mr-2">
                  Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat) lar
                  soni
                </span>
              </h2>
            </div>
            <div>
              <div className="televediniya z-[] relative">
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

        {trashOfficial.length > 0 ? (
          <div>
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
        ) : (
          ""
        )}

        {trashMediaProjects.length > 0 ? (
          <div>
            {" "}
            <div className="mb-3">
              <h2 className="text-[20px]  dark:text-white">
                <span className="font-[500] mr-2">
                  Axborot xizmati tomonidan yo'lga qo'yilgan medialoyihalar
                </span>
              </h2>
            </div>
            <div>
              <div className="televediniya z-[] relative">
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

        {trashCoverages.length > 0 ? (
          <div>
            {" "}
            <div className="mb-3">
              <h2 className="text-[20px]  dark:text-white">
                <span className="font-[500] mr-2">
                  OTM faoliyatidagi turli tadbirlarni ommaviy axborot vositalari
                  orqali yoritilganlik darajasi
                </span>
              </h2>
            </div>
            <div>
              <div className="televediniya z-[] relative">
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
    );
  }
}
