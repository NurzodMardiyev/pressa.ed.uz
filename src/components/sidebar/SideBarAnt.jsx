import React from "react";
import { Menu } from "antd";
import { SiGooglenews } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { FaTrashAlt } from "react-icons/fa";
import "../../App.css";

const items = [
  {
    key: "/dashboard",
    label: "Bosh Sahifa",
    icon: <SiGooglenews />,
  },
  {
    key: "sub2",
    label:
      "Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy tarmoqlar orqali yoritilishi",
    icon: <SiGooglenews />,
    children: [
      { key: "/televediniye", label: "Telvideniye" },
      { key: "/radio", label: "Radio" },
      { key: "/oav", label: "Bosma OAV (gazeta va jurnallar)" },
      { key: "/internet_sites", label: "Internet saytlari" },
      { key: "/messenger", label: "Ijtimoiy tarmoq va messenjerlar" },
    ],
  },
  {
    key: "sub4",
    label: "Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar",
    icon: <SiGooglenews />,
    children: [
      { key: "/matbuot_anjumani", label: "Matbuot anjumani" },
      { key: "/brifing", label: "Brifing" },
      { key: "/press_tur", label: "Press tur" },
    ],
  },
  {
    key: "sub5",
    label:
      "Faoliyatga doir axborotni yetkazib berishda akustik va vizual materiallardan foydalanganligi",
    icon: <SiGooglenews />,
    children: [
      { key: "/infografika", label: "Infografika" },
      { key: "/audio", label: "Audio" },
      { key: "/video", label: "Video" },
    ],
  },
  {
    key: "/onlayn_efir",
    label: "Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat)lar soni",
    icon: <SiGooglenews />,
  },
  {
    key: "sub6",
    label:
      "Ijtimoiy tarmoq va messenjerlardagi OTM rasmiy sahifalarida obunachilar soni.",
    icon: <SiGooglenews />,
    children: [
      { key: "/telegram", label: "Ijtimoiy tarmoqlar" },
      { key: "/organization", label: "Xodimlar" },
    ],
  },
  {
    key: "/trashbox",
    label: "Karzinka",
    icon: <FaTrashAlt />,
  },
];

const SideBarAnt = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const tvMutation = useMutation(oavIV.tv, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.error("Error in tv mutation"),
  });

  const mediaMutation = useMutation(oavIV.eventMediaGetChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Media mutation succeeded");
    },
    onError: () => console.error("Error in media mutation"),
  });

  const mediaAllMutation = useMutation(oavIV.eventMediaAll, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.error("Error in mediaAll mutation"),
  });

  const handleClick = (e) => {
    const key = e.key;

    const mediaKeys = [
      "/brifing",
      "/press_tur",
      "/matbuot_anjumani",
      "/infografika",
      "/audio",
      "/video",
    ];

    if (mediaKeys.includes(key)) {
      if (!mediaMutation.isLoading) mediaMutation.mutate();
      if (!mediaAllMutation.isLoading) mediaAllMutation.mutate();
    } else {
      if (!tvMutation.isLoading) tvMutation.mutate(key); // telegramlar ketmasligi kerak
    }

    navigate(key);
  };

  return (
    <div>
      <Menu
        onClick={handleClick}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        className="bg-slate-100 dark:bg-gray-800 dark:text-white pt-20 md:w-[400px] h-[100vh] fixed overflow-y-scroll z-[99]"
      />
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 1px;
        }
        ::-webkit-scrollbar-track {
          background: inherit;
        }
        ::-webkit-scrollbar-thumb {
          background: #9b9b9b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default SideBarAnt;
