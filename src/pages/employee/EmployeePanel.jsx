import React from "react";
import HeaderEmployee from "../../components/header/HeaderEmployee";
import SidebarJS from "../../components/sidebar/SidebarJS";
import { Outlet } from "react-router-dom";
// import SideBarAnt from "../../components/sidebar/SideBarAnt";

export default function EmployeePanel() {
  return (
    <div>
      <div className="dark:bg-gray-600 min-h-[100vh]">
        <HeaderEmployee />
        <div className="">
          <SidebarJS />
          {/* <SideBarAnt /> */}
        </div>
        <div className="md:ms-[420px] ms-[50px] md:me-[30px] me-[10px] md:pt-24 pt-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
