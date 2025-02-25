import React from "react";
import { Menu } from "antd";
import { SiGooglenews } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { RiChatVoiceFill } from "react-icons/ri";
import { MdPermMedia } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";
import { BsPersonLinesFill } from "react-icons/bs";
import { AiFillProject } from "react-icons/ai";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaStubber } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import "../../App.css";
import { ip } from "../../ips";

const SuperSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    const key = e.key;

    navigate(key);
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDownloadPosts = async () => {
    let baseUrl = `${ip}/excel/export-admin-posts`;
    let typeName = "AdminExcel";

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

  const items = [
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
      key: "download",
      label: (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Menyuni yopilib ketishining oldini oladi
            handleDownloadPosts();
          }}
          className=" text-black  py-2 flex items-center rounded-md w-full text-left"
        >
          Postlarni Yuklab Olish
        </button>
      ),
      icon: <FaFileDownload />,
    },
    {
      key: "/superadminpanel/korzinka",
      label: "Savat",
      icon: <FaTrashAlt />,
    },
  ];

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
