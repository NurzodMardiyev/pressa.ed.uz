import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="bg-slate-100 h-[100vh]">
      <div className="profile  container md:max-w-6xl  mx-auto  py-4 md:px-5 px-5 lg:max-w-7xl lg:mx-auto md:pt-24 md:mt-0 pt-15 ">
        <div className="overalInfo">
          <Link>Asosiy</Link>
          <span>/</span>
          <Link>Umumiy</Link>
        </div>
        <div className="flex justify-between bg-white mt-4 relative px-7 py-5 rounded-md">
          <div className="userImg w-[300px] h-[400px] ">
            <img
              src="https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="User Name"
              className="object-cover w-full h-full rounded-sm"
            />
          </div>
          <div className="userInfo flex">
            <div className="flex gap-6 w-full">
              <div className="flex flex-col gap-6 md:w-[410px] w-[300px]">
                <div className=" ">
                  <span className="text-[12px] font-[500]">F.I.O</span>
                  <p className="bg-slate-100 px-5 py-3 rounded-md uppercase font-[500]">
                    Mardiyev Nurzod Faxriddinovich
                  </p>
                </div>
                <div className=" ">
                  <span className="text-[12px] font-[500]">
                    Pasport (ID karta) seriya va raqami
                  </span>
                  <p className="bg-slate-100 px-5 py-3 rounded-md uppercase font-[500]">
                    AC 2281557
                  </p>
                </div>
                <div className=" ">
                  <span className="text-[12px] font-[500]">Jinsi</span>
                  <p className="bg-slate-100 px-5 py-3 rounded-md uppercase font-[500]">
                    Erkak
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 md:w-[410px] w-[300px]">
                <div className=" ">
                  <span className="text-[12px] font-[500]">JSh ShIR</span>
                  <p className="bg-slate-100 px-5 py-3 rounded-md uppercase font-[500]">
                    62907026084044
                  </p>
                </div>
                <div className=" ">
                  <span className="text-[12px]">Tug‘ilgan sanasi</span>
                  <p className="bg-slate-100 px-5 py-3 rounded-md uppercase font-[500]">
                    29.07.2002
                  </p>
                </div>
                <div className=" ">
                  <span className="text-[12px]">Telefon raqami</span>
                  <p className="bg-slate-100 px-5 py-3 rounded-md uppercase font-[500]">
                    +998883921383
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-8">
            <button className="px-7 py-2 rounded bg-blue-500 text-white">
              O'zgartirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
