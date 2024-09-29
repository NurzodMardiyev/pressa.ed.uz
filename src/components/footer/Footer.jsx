import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white py-4">
      <div className="container md:max-w-10xl  mx-auto flex justify-between py-4 md:px-5   items-center">
        <div className="flex gap-3">
          <div>
            <Link
              to="tel:+998 71 203-13-2"
              className="font-[500] text-[16px] hover:text-blue-400"
            >
              +998 71 203-13-24
            </Link>
            <p>Aloqa markazi</p>
          </div>
          <div>
            <h4 className="font-[500] text-[16px]">Maxfiylik siyosati</h4>
            <p>© O'zRes oliy ta'lim, fan va innovatsiya vazirligi 2020-2023</p>
          </div>
        </div>
        <div>
          <h4 className="font-[500] text-[16px]">
            Raqamli ta'lim texnologiyalarini rivojlantirish markazi
          </h4>
          <p>Ishlab chiqaruvchi</p>
        </div>
      </div>
    </div>
  );
}
