import React, { useEffect } from "react";
import logo from "../../images/pressa logo.png";
import { IoPersonAdd } from "react-icons/io5";
import { FaGoogleWallet } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function DetailsSidebar({ next, prev, current, setCurrent }) {
  const navigate = useNavigate();
  const loginEmail = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    const loginEmail = localStorage.getItem("login");
    if (!loginEmail) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleStepClick = (index) => {
    if (index > current) {
      next();
    } else if (index < current) {
      prev();
    }
    setCurrent(index);
  };

  return (
    <div className="bg-white drop-shadow-2xl min-h-[100%] md:w-[340px] h-[100vh] ">
      <div className="container">
        <div className="border-b px-6 py-4 ">
          <img src={logo} alt="pressa.edu.uz" />
        </div>
        <div className="px-6 my-4">
          <h2
            className="text-[18px] font-[500]"
            style={{ fontFamily: "Poppins" }}
          >
            O‘zbekiston Respublikasi Oliy taʼlim, fan va innovatsiyalar
            vazirligi
          </h2>
          <p className="text-[16px] text-blue-500">{loginEmail?.email}</p>

          <ul className="mt-10">
            <li
              className={`flex items-center text-[18px] gap-2 py-2 px-4 my-3 ${
                current === 0 ? "bg-green-100" : "hover:bg-green-100"
              } transition-all duration-150 cursor-pointer rounded-lg`}
              onClick={() => handleStepClick(0)}
            >
              <IoPersonAdd className="text-[#4CA852] text-[20px]" />
              <p className="font-[500]">Shaxsiy malumotlaringiz</p>
            </li>
            <li
              className={`flex items-center text-[18px] gap-2 py-2 px-4 my-3 ${
                current === 1 ? "bg-green-100" : "hover:bg-green-100"
              } transition-all duration-150 cursor-pointer rounded-lg`}
              onClick={() => handleStepClick(1)}
            >
              <FaGoogleWallet className="text-[#4CA852] text-[20px]" />
              <p className="font-[500]">Umumiy malumotlaringiz</p>
            </li>
            <li
              className=" flex items-center text-[18px] gap-2 py-2 px-4 my-3 hover:bg-green-100 transition-all duration-150 cursor-pointer rounded-lg"
              onClick={() => {
                localStorage.removeItem("login");
                navigate("/signup");
              }}
            >
              <IoLogOutSharp className="text-[#4CA852] text-[20px]" />
              <p className="font-[500]">Chiqish</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
