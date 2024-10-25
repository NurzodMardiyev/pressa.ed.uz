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
    key: "/superadminpanel/dashboard",
    label: "Bosh Sahifa",
    icon: <SiGooglenews />,
  },

  {
    key: "sub2",
    label:
      "Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy tarmoqlar orqali yoritilishi",
    icon: <SiGooglenews />,
    children: [
      { key: "/superadminpanel/televediniye", label: "Telvideniye" },
      { key: "/superadminpanel/radio", label: "Radio" },
      { key: "/superadminpanel/oav", label: "Bosma OAV (gazeta va jurnallar)" },
      { key: "/superadminpanel/internet_sites", label: "Internet saytlari" },
      {
        key: "/superadminpanel/messenger",
        label: "Ijtimoiy tarmoq va messenjerlar",
      },
    ],
  },
  {
    key: "/superadminpanel/allemployees",
    label: "Barcha Xodimlar",
    icon: <SiGooglenews />,
  },
  {
    key: "sub4",
    label: "Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar",
    icon: <SiGooglenews />,
    children: [
      { key: "/superadminpanel/matbuot_anjumani", label: "Matbuot anjumani" },
      { key: "/superadminpanel/brifing", label: "Brifing" },
      { key: "/superadminpanel/press_tur", label: "Press tur" },
    ],
  },
  {
    key: "/superadminpanel/addemployees",
    label: "Xodim Qo'shish",
    icon: <SiGooglenews />,
  },

  {
    key: "/superadminpanel/onlayn_efir",
    label: "Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat)lar soni",
    icon: <SiGooglenews />,
  },
  {
    key: "/superadminpanel/korzinka",
    label: "Karzinka",
    icon: <SiGooglenews />,
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
        className="bg-slate-100 dark:bg-gray-800 dark:text-white pt-20 md:w-[330px] h-[100vh] fixed overflow-y-scroll z-[99]"
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
