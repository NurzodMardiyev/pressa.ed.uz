import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className=" dark:bg-[#1F2937]">
      <div className="fixed z-10">
        <Header />
      </div>
      <div className="z-10">
        <Outlet />
      </div>
    </div>
  );
}
