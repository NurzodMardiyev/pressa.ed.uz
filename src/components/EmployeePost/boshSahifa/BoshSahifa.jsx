import React, { useEffect } from "react";
// import { useEmployeeInfo } from "../../../hooks/useEmployeeInfo";
import { Button, Flex, Popconfirm, Spin, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../../feature/queryApi";
import {
  useGetMediaProjects,
  useGetTypeMaterial,
  useGetTypeMediaEvent,
  useGetTypeOfficial,
  useGetTypeOnline,
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
    title: "web_sites",
    dataIndex: "web_sites",
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
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

export default function BoshSahifa() {
  const queryClient = useQueryClient();

  const {
    data: postData,
    error: postError,
    isLoading: isLoadingPosts,
  } = useGetTypePosts();
  const {
    data: mediaData,
    error: mediaError,
    isLoading: isLoadingMedia,
  } = useGetTypeMediaEvent();
  const {
    data: material,
    error: materialError,
    isLoading: isLoadingMaterial,
  } = useGetTypeMaterial();
  const {
    data: official,
    error: officialError,
    isLoading: isLoadingOfficial,
  } = useGetTypeOfficial();
  const {
    data: online,
    error: onlenError,
    isLoading: isLoadingOnline,
  } = useGetTypeOnline();
  const {
    data: mediaProjects,
    error: errorMediaProjects,
    isLoading: isLoadingMediaprojects,
  } = useGetMediaProjects();

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

  const getOnlineEvent = useMutation(oavIV.getOnlineEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const getMediaProjects = useMutation(oavIV.getMediaProjects, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    // Barcha so'rovlarni parallel ravishda yuborish uchun Promise.all ishlatilmoqda
    Promise.all([
      getTypePost.mutateAsync(),
      getTypeMediaEvent.mutateAsync(),
      getTypematerial.mutateAsync(),
      getOfficialPage.mutateAsync(),
      getOnlineEvent.mutateAsync(),
      getMediaProjects.mutateAsync(),
    ])
      .then(() => {
        console.log("All requests finished");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

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

    let label;
    if (item.stuff === "RECTOR") {
      label = "Rektor";
    } else if (item.stuff === "VICE_RECTOR") {
      label = "Prorektor";
    } else if (item.stuff === "PRESS_SECRETARY") {
      label = "Matbuot kotibi";
    } else if (item.stuff === "HEAD_OF_ADMINISTRATION") {
      label = "Boshqarma boshlig‘i";
    } else if (item.stuff === "HEAD_OF_DIVISION") {
      label = "Bo'lim boshlig‘i";
    } else if (item.stuff === "DEAN") {
      label = "Dekan";
    } else if (item.stuff === "VICE_DEAN") {
      label = "Dekan o‘rinbosari";
    } else {
      label = "Kafedra mudiri";
    }

    return {
      key: index + 1,
      fio: `${item.showedUser}`,
      stuff: label,
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

  console.log(mediaData);
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
      web_sites: item.web_sites
        ? Object.entries(item.web_sites).map(([name, url]) => (
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
      link: <Link to={`${item.link}`}>{item.link}</Link>,
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
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
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
      participation: item.stuff,
      mesengerTitle: item.messenger,
      amountAttand: item.numberOfPeople,
      link: <Link to={`${item.link}`}> {item.link}</Link>,
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
  });

  const dataMediaProjects = mediaProjects?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.name}`,
      description: item.description,
      tarmoqTuri: item.massMedia,
      period: item.period,
      link: <Link to={`${item.link}`}> {item.link}</Link>,
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
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

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deletePost = useMutation(oavIV.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deleteMediaEvent = useMutation(oavIV.deleteMediaEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deletematerial = useMutation(oavIV.deleteMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Postni o'chirish uchun backendga so'rov Yuborish
  const deleteofficial = useMutation(oavIV.deleteOfficial, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // Onlineni o'chirish uchun backendga so'rov Yuborish
  const deleteOnline = useMutation(oavIV.deleteOnline, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error");
    },
  });

  // MediaProjects o'chirish uchun backendga so'rov Yuborish
  const deleteMediaProjects = useMutation(oavIV.deleteMediaProjects, {
    onSuccess: () => {
      queryClient.invalidateQueries();
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
  const handleDeleteofficail = (id) => {
    deleteofficial.mutate(id);
  };
  const handleDeleteOnline = (id) => {
    deleteOnline.mutate(id);
  };
  const handleDeleteMediaProjects = (id) => {
    deleteMediaProjects.mutate(id);
  };

  // if (
  //   postData &&
  //   mediaData &&
  //   material &&
  //   online &&
  //   official &&
  //   mediaProjects
  // ) {
  //   return (
  //     <div>
  //       <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center z-[]">
  //         <div className="text-3xl text-[#0000007e] select-none">
  //           Ma'lumot Yo'q
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // loading va Error qismi
  if (
    isLoadingPosts ||
    isLoadingMedia ||
    isLoadingMaterial ||
    isLoadingOfficial ||
    isLoadingOnline ||
    isLoadingMediaprojects
  )
    return (
      <div>
        <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center bg-[#000000ab] z-[999]">
          <Flex>
            <Spin size="large" />
          </Flex>
        </div>
      </div>
    );
  if (
    postError ||
    mediaError ||
    materialError ||
    officialError ||
    onlenError ||
    errorMediaProjects
  ) {
    return <div>Error loading data</div>;
  }
  return (
    <div>
      <div className="pb-16 container w-[95%] mx-auto">
        {/* Televediniya */}

        {postData?.length > 0 ? (
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
          </div>
        ) : (
          ""
        )}

        {mediaData?.body?.length > 0 ? (
          <div>
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
          </div>
        ) : (
          ""
        )}

        {material?.length > 0 ? (
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
          </div>
        ) : (
          ""
        )}

        {online?.length > 0 ? (
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

        {official?.length > 0 ? (
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

        {mediaProjects?.length > 0 ? (
          <div>
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
      </div>
    </div>
  );
}
