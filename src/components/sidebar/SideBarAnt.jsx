import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiChatVoiceFill } from "react-icons/ri";
import { MdPermMedia } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { SiLevelsdotfyi } from "react-icons/si";
import "../../App.css";

const items = [
  {
    key: "sub2",
    label:
      "Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy tarmoqlar orqali yoritilishi",
    icon: <RiChatVoiceFill />,
    children: [
      { key: "/televediniye_dashboard", label: "Televedeniye" },
      { key: "/radio_dashboard", label: "Radio" },
      { key: "/oav_dashboard", label: "Bosma OAV (gazeta va jurnallar)" },
      { key: "/internet_sites_dashboard", label: "Internet saytlari" },
      { key: "/messenger_dashboard", label: "Ijtimoiy tarmoq va messenjerlar" },
    ],
  },

  {
    key: "/matbuot_dashboard",
    label: "Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar",
    icon: <MdPermMedia />,
  },
  {
    key: "/foreign_dashboard",
    label: "Xorijiy OAVlarida OTM faoliyatiga doir E’lon qilingan materiallar",
    icon: <IoSchoolSharp />,
  },
  {
    key: "/infografika_dashboard",
    label:
      "Faoliyatga doir axborotni yetkazib berishda akustik va vizual materiallardan foydalanganligi",
    icon: <SiMaterialformkdocs />,
  },
  {
    key: "/onlayn_efir_dashboard",
    label: "Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat)lar soni",
    icon: <BsPersonLinesFill />,
  },
  {
    key: "sub6",
    label:
      "Ijtimoiy tarmoq va messenjerlardagi OTM rasmiy sahifalarida obunachilar soni.",
    icon: <FaFacebookMessenger />,
    children: [
      { key: "/telegram_dashboard", label: "Ijtimoiy tarmoqlar" },
      { key: "/organization", label: "Xodimlar" },
    ],
  },

  {
    key: "/mediaprojects_dashboard",
    label: "Axborot xizmati tomonidan yoʻlga qoʻyilgan medialoyihalar",
    icon: <AiFillProject />,
  },
  {
    key: "/levelIllumination_dashboard",
    label:
      "OTM faoliyatidagi turli tadbir (media reja)larni ommaviy axborot vositalari orqali yoritilganlik darajasi",
    icon: <SiLevelsdotfyi />,
  },
  {
    key: "/trashbox",
    label: "Savat",
    icon: <FaTrashAlt />,
  },
];

const SideBarAnt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    const key = e.key;

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
      <style jsx="true">{`
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
