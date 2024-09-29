import React from "react";
import HeaderEmployee from "../../components/header/HeaderEmployee";
import SidebarJS from "../../components/sidebar/SidebarJS";
import { Outlet } from "react-router-dom";
import SideBarAnt from "../../components/sidebar/SideBarAnt";
// import SideBarAnt from "../../components/sidebar/SideBarAnt";

export default function EmployeePanel() {
  return (
    <div>
      <div className="dark:bg-gray-600 min-h-[100vh]">
        <div>
          <HeaderEmployee className="z-10 " />
        </div>
        <div className=" lg:max-w-[2560px] md:max-w-[1600px]  mx-auto flex z-10">
          {/* <SidebarJS className="z-10 " /> */}
          <SideBarAnt className="z-10" />
          <div className="md:ms-[420px] ms-[50px] md:me-[20px] me-[10px] md:pt-24 pt-14 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
