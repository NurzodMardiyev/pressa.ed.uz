import React from "react";
import { Menu } from "antd";
import { SiGooglenews } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
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
import { FaStubber } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import "../../App.css";

const items = [
  {
    key: "/superadminpanel/dashboard",
    label: "Bosh Sahifa",
    icon: <MdDashboard />,
  },
  {
    key: "sub",
    label: "Post joylashtirish",
    icon: <SiGooglenews />,
    children: [
      {
        key: "sub2",
        label:
          "Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy tarmoqlar orqali yoritilishi",
        icon: <RiChatVoiceFill />,
        children: [
          {
            key: "/superadminpanel/televediniye_dashboard",
            label: "Telvideniye",
          },
          { key: "/superadminpanel/radio_dashboard", label: "Radio" },
          {
            key: "/superadminpanel/oav_dashboard",
            label: "Bosma OAV (gazeta va jurnallar)",
          },
          {
            key: "/superadminpanel/internet_sites_dashboard",
            label: "Internet saytlari",
          },
          {
            key: "/superadminpanel/messenger_dashboard",
            label: "Ijtimoiy tarmoq va messenjerlar",
          },
        ],
      },

      {
        key: "/superadminpanel/matbuot_anjumani_dashboard",
        label: "Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar",
        icon: <MdPermMedia />,
      },
      {
        key: "/superadminpanel/foreign_dashboard",
        label:
          "Xorijiy ommaviy axborot vositalarida OTM faoliyatiga doir E’lon qilingan materiallar soni",
        icon: <IoSchoolSharp />,
      },
      {
        key: "/superadminpanel/infografika_dashboard",
        label:
          "Faoliyatga doir axborotni yetkazib berishda akustik va vizual materiallardan foydalanganligi",
        icon: <SiMaterialformkdocs />,
      },
      {
        key: "/superadminpanel/onlayn_efir_dashboard",
        label:
          "Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat)lar soni",
        icon: <BsPersonLinesFill />,
      },
      {
        key: "/superadminpanel/mediaprojects_dashboard",
        label: "Axborot xizmati tomonidan yoʻlga qoʻyilgan medialoyihalar",
        icon: <AiFillProject />,
      },
      {
        key: "/superadminpanel/levelIllumination_dashboard",
        label:
          "Vazirlik faoliyatidagi turli tadbir (media reja)larni ommaviy axborot vositalari orqali yoritilganlik darajasi",
        icon: <SiLevelsdotfyi />,
      },
    ],
  },

  {
    key: "/superadminpanel/allemployees",
    label: "Barcha Xodimlar",
    icon: <FaStubber />,
  },

  {
    key: "/superadminpanel/addemployees",
    label: "Xodim Qoʻshish",
    icon: <IoPersonAddSharp />,
  },
  {
    key: "/superadminpanel/korzinka",
    label: "Savat",
    icon: <FaTrashAlt />,
  },
];

const SuperSideBar = () => {
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
        className="bg-slate-100 dark:bg-gray-800 dark:text-white pt-24 md:w-[330px] h-[100vh] fixed overflow-y-scroll z-[9]"
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

export default SuperSideBar;
