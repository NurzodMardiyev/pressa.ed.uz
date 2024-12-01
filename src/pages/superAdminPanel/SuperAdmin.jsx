import React from "react";
// import { useEmployeeInfo } from "../../../hooks/useEmployeeInfo";
import SuperSideBar from "./SuperSideBar";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

export default function SuperAdmin() {
  // console.log(data);

  return (
    <div>
      <div className="dark:bg-gray-600 min-h-[100vh] ">
        <div className="z-[99] flex ">
          <Header className="fixed" />
        </div>
        <div className=" lg:max-w-[2560px] md:max-w-[1600px]  mx-auto flex z-[9]">
          {/* <SidebarJS className="z-10 " /> */}
          <SuperSideBar className="z-[9]" />
          <div className="md:ms-[370px] ms-[50px] md:me-[20px] me-[10px] md:pt-24 pt-14 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
