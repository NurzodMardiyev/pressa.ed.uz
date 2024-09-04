import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { TiSocialSkype } from "react-icons/ti";
import { MdEventAvailable } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";

import DropDown from "./DropDown";
import "../../App.css";

export default function SidebarJS() {
  const elememtsPeople = [
    { title: "Telvideniye", path: "/televediniye" },
    { title: "Radio", path: "/radio" },
    { title: "Bosma OAV (gazeta va jurnallar)", path: "/oav" },
    { title: "Internet saytlari", path: "/internet_sites" },
    {
      title: "Ijtimoiy tarmoq va messenjerlar",
      path: "/messenger",
    },
  ];
  const elememtsBar = [
    { title: "Matbuot anjumani", path: "/matbuot_anjumani" },
    { title: "Brifing", path: "/brifing" },
    {
      title: "Press tur",
      path: "/press_tur",
    },
  ];
  const elementsMembership = [
    { title: "Infografika", path: "/infografika" },
    { title: "Audio", path: "/audio" },
    { title: "Video", path: "/video" },
  ];

  return (
    <div className="h-[100vh] dark:bg-gray-800 bg-slate-100 flex flex-col justify-between fixed overflow-y-scroll custom-scrollbars__content  md:w-[400px] w-[40px] ">
      <div className="flex flex-col  px-7 pt-10">
        <div className="flex flex-col text-white mt-16">
          <Link
            to="/dashboard"
            className="flex text-[24px] items-center mb-3 gap-2 border-b dark:border-b-[#2B2B2B] dark:hover:border-b-[#848484] border-b-slate-100 hover:border-b-gray-500 pb-1 transition text-gray-700 dark:text-white"
          >
            <MdDashboard />
            <span className="md:text-[14px] font-[500]">Bosh Sahifa</span>
          </Link>
          <div className="flex flex-col text-[20px]  gap-2 mb-3">
            <DropDown
              elememts={elememtsPeople}
              name={
                "Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy tarmoqlar orqali yoritilishi"
              }
              icon={<TiSocialSkype />}
            />
          </div>
          <div className="flex flex-col text-[20px]  gap-2  mb-3">
            <DropDown
              elememts={elememtsBar}
              name={"Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar"}
              icon={<MdEventAvailable />}
            />
          </div>
          <div className="flex flex-col text-[20px]  gap-2  mb-3">
            <DropDown
              elememts={elementsMembership}
              name={
                "Faoliyatga doir axborotni yetkazib berishda akustik va vizual materiallardan foydalanganligi"
              }
              icon={<FaCircleInfo />}
            />
          </div>
          <Link
            to="/payment"
            className="flex text-[24px] items-center mb-3 gap-2 border-b border-b-slate-100 dark:border-b-[#2B2B2B] dark:hover:border-b-[#848484] hover:border-b-gray-500 pb-1 transition text-gray-800 dark:text-white"
          >
            <MdPayment />
            <span className="text-[14px] font-[500]">Payments</span>
          </Link>
          <Link
            to="/reports"
            className="flex text-[24px] items-center mb-3 gap-2 border-b border-b-slate-100 dark:border-b-[#2B2B2B] dark:hover:border-b-[#848484] hover:border-b-gray-500 pb-1 transition text-gray-800 dark:text-white"
          >
            <TbReportSearch />
            <span className="text-[14px] font-[500]">Reports</span>
          </Link>
          <Link
            to="/setting"
            className="flex text-[24px] items-center mb-3 gap-2 border-b border-b-slate-100 dark:border-b-[#2B2B2B] dark:hover:border-b-[#848484] hover:border-b-gray-500 pb-1 transition text-gray-800 dark:text-white"
          >
            <IoMdSettings />
            <span className="text-[14px] font-[500]">Setting</span>
          </Link>
        </div>
      </div>
      <div className="profile mt-auto  dark:bg-gray-900 bg-slate-200  text-gray-800 py-4 px-7 dark:text-white cursor-pointer">
        <div className="flex items-center gap-1">
          <p>Nurzod Mardiyev</p>
          <FaAngleRight className="mt-1" />
        </div>
      </div>
    </div>
  );
}
