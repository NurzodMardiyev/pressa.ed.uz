import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white py-4">
      <div className="container md:max-w-10xl  mx-auto flex justify-between py-4 md:px-5 flex-col md:flex-row  gap-4  md:items-center items-start">
        <div className="flex gap-3">
          <div>
            <Link
              to="tel:+998 71 203-13-2"
              className="font-[500] md:text-[16px] text-[14px] hover:text-blue-400"
            >
              +998 71 203-13-24
            </Link>
            <p className="text-[12px] md:text-[15px]">Aloqa markazi</p>
          </div>
          <div>
            <h4 className="font-[500] md:text-[16px] text-[14px]">
              Maxfiylik siyosati
            </h4>
            <p className="text-[12px] md:text-[15px]">
              © o‘zRes oliy ta’lim, fan va innovatsiya vazirligi 2020-2023
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-[500] md:text-[16px] text-[14px]">
            Raqamli ta’lim texnologiyalarini rivojlantirish markazi
          </h4>
          <p className="text-[12px] md:text-[15px]">Ishlab chiqaruvchi</p>
        </div>
      </div>
    </div>
  );
}
