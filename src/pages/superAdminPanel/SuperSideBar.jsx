import React from "react";
import { Menu } from "antd";
import { SiGooglenews } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { FaTrashAlt } from "react-icons/fa";
import "../../App.css";

const items = [
  {
    key: "",
    label: "Bosh Sahifa",
    icon: <SiGooglenews />,
  },
  {
    key: "/superadminpanel/allemployees",
    label: "Barcha Xodimlar",
    icon: <SiGooglenews />,
  },
  {
    key: "/superadminpanel/addemployees",
    label: "Xodim Qo'shish",
    icon: <SiGooglenews />,
  },

  {
    key: "/",
    label: "Karzinka",
    icon: <SiGooglenews />,
  },
];

const SuperSideBar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const tvMutation = useMutation(oavIV.tv, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.error("Error in tv mutation"),
  });

  const mediaMutation = useMutation(oavIV.eventMediaGetChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Media mutation succeeded");
    },
    onError: () => console.error("Error in media mutation"),
  });

  const mediaAllMutation = useMutation(oavIV.eventMediaAll, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.error("Error in mediaAll mutation"),
  });

  const handleClick = (e) => {
    const key = e.key;

    const mediaKeys = [
      "/brifing",
      "/press_tur",
      "/matbuot_anjumani",
      "/infografika",
      "/audio",
      "/video",
    ];

    if (mediaKeys.includes(key)) {
      if (!mediaMutation.isLoading) mediaMutation.mutate();
      if (!mediaAllMutation.isLoading) mediaAllMutation.mutate();
    } else {
      if (!tvMutation.isLoading) tvMutation.mutate(key);
    }

    navigate(key);
  };

  return (
    <div>
      <Menu
        onClick={handleClick}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        className="bg-slate-100 dark:bg-gray-800 dark:text-white pt-20 md:w-[330px] h-[100vh] fixed overflow-y-scroll z-[99]"
      />
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 1px;
        }
        ::-webkit-scrollbar-track {
          background: inherit;
        }
        ::-webkit-scrollbar-thumb {
          background: #9b9b9b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default SuperSideBar;
