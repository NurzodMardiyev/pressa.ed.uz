import React from "react";
// import { useEmployeeInfo } from "../../../hooks/useEmployeeInfo";
import HeaderEmployee from "../../components/header/HeaderEmployee";
import SuperSideBar from "./SuperSideBar";
import { Outlet } from "react-router-dom";

export default function SuperAdmin() {
  // console.log(data);

  return (
    <div>
      <div className="dark:bg-gray-600 min-h-[100vh]">
        <div>
          <HeaderEmployee className="z-10 " />
        </div>
        <div className=" lg:max-w-[2560px] md:max-w-[1600px]  mx-auto flex z-10">
          {/* <SidebarJS className="z-10 " /> */}
          <SuperSideBar className="z-10" />
          <div className="md:ms-[370px] ms-[50px] md:me-[20px] me-[10px]  flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
