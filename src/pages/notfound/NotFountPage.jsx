import React from "react";

export default function NotFountPage() {
  return (
    <div className="w-full h-[100vh] bg-white justify-center items-center flex">
      <div className="text-white text-center">
        <img
          src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
          alt=""
        />
        <h1 className="text-3xl text-green-500 font-bold select-none">
          404 NOT FOUND
        </h1>
        <p className="text-[18px] text-black">Page Topilmadi</p>
      </div>
    </div>
  );
}
