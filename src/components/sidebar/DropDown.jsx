import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { oavIV } from "../../feature/queryApi";
import { useMutation, useQueryClient } from "react-query";

function DropDown({ elements, name, icon, activePath, setActivePath }) {
  const [isDown, setIsDown] = useState(false);
  const queryClient = useQueryClient();

  const tvContent = useMutation(oavIV.tv, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Mutation muvaffaqiyatli bajarildi");
    },
    onError: () => {
      console.log("Xato yuz berdi mutationda");
    },
  });

  const eventMediaGetChannel = useMutation(oavIV.eventMediaGetChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Mutation muvaffaqiyatli bajarildi");
    },
    onError: () => {
      console.log("Xato yuz berdi mutationda");
    },
  });

  const eventMediaAll = useMutation(oavIV.eventMediaAll, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Mutation muvaffaqiyatli bajarildi");
    },
    onError: () => {
      console.log("Xato yuz berdi mutationda");
    },
  });

  const handleClickContent = (item) => {
    setActivePath(item); // Tanlangan elementni yangilash

    // Shartlarga ko'ra mutationlarni qo'llash
    if (
      item === "/brifing" ||
      item === "/press_tur" ||
      item === "/matbuot_anjumani"
    ) {
      if (!eventMediaGetChannel.isLoading) {
        eventMediaGetChannel.mutate();
      }
      if (!eventMediaAll.isLoading) {
        eventMediaAll.mutate();
      }
    } else if (
      item === "/infografika" ||
      item === "/audio" ||
      item === "/video"
    ) {
      return;
    } else {
      if (!tvContent.isLoading) {
        tvContent.mutate(item);
      }
    }
  };

  return (
    <>
      <div
        onClick={() => setIsDown(!isDown)}
        className="flex hover:bg-green-100 items-center justify-between w-full border-b dark:border-b-[#2B2B2B] border-b-slate-100 dark:hover:border-b-[#848484] hover:border-b-gray-500 pb-1 transition cursor-pointer"
      >
        <div className="flex items-center gap-2 text-[28px] dark:text-white text-gray-800 ">
          {icon}
          <span className="text-[14px] w-[270px] font-[500] ">{name}</span>
        </div>
        <RiArrowDownSFill
          className={`transition-all duration-150 text-gray-800 dark:text-white ${
            isDown ? "rotate-180 " : ""
          }`}
        />
      </div>
      <div
        className={`transition-all duration-150 ${
          isDown ? "h-full opacity-[1]" : "h-[0px] opacity-0 hidden"
        }`}
      >
        <div>
          {elements?.map((el) => (
            <Link
              to={el.path}
              key={el.path}
              className={`flex text-[20px] ms-8 mb-2 gap-2 border-b dark:border-b-[#2B2B2B] border-b-slate-100 dark:hover:border-b-[#848484] hover:border-b-gray-600 pb-1 transition text-gray-800 dark:text-white ${
                activePath === el.path ? "text-green-500" : ""
              }`} // Tanlangan elementga yashil rang berish
              onClick={() => handleClickContent(el.path)}
            >
              <span className="text-[13px]">{el.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default DropDown;
