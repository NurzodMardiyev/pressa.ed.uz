import React, { useState, useRef, useEffect } from "react";
import logo from "../../images/pressa logo.png";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
// import { useTranslation } from "react-i18next";
import "../../App.css";
export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("Uz");
  const [show, setShow] = useState(true);
  const menuRef = useRef(null);
  const location = useLocation();
  let display = "";
  if (location.pathname.startsWith("/superadminpanel")) {
    display = "hidden";
  } else {
    display = "";
  }

  const languages = [
    {
      title: "Uz",
      flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAbFBMVEX///8etToAmbXOESbKAAAlk67WABDWACQzrjkAl7QAmLUAkrAAlLEAkbAAja0Wnbhvu83f8PSq1eBIrMLu+PpftcnT6u+GxdTn9Pey2uQtpLz0+vx5v9COydfG5OtRsMWg0d2PyNe/4OguorzHBxS5AAAE0UlEQVR4nO2caYOiOBCGs+wxWyQYbpRb/f//cTnUwPZwOGXPtJn3+RYFGx4rSaVIKxzAQPzqC3hvoI8F9LGAPhb79ZFSUqmX/FH3JZ/yFdinj6TMy/ZS15Xed3xOs3Y+a7n6uu/ivj579CmV1KLjWF13RZ/rqFRNQsyVdU6TpsrOypIA3NZHsox7eUHi7ey6VycSkfOIMO2QOJO+x63Wqk6V3hfGX51NfSoPenkik7R16A2qhhOq2/GUDPYvd195OnwZ+eL578SWPpkNLo75E5OGjLozInlvkhP09s3bp07m7i/ja7OhT7aDvcB55m4pF4GYRJcqjiIz+uVFFLX8znlvyLo+OfbD43OhotrskLUPX5RcZGR8uTrVTmrH0LeuT5WDveKp2OvQylF61qRps/s0+g30dZ1wILJjnPoM1vR545x78n7a1bwdK/rIH4Pv513M+7EixzsO9trXrHPtZFkfNWPwWTLIfw7L+vrstiO1JEP7HFb0FYO+8w/1XUsqApss63sua5l3cVe7K+9axKK++7y7786v4SxI1WXeDGcFPvJLWzLJRX1qXK/FO27UVV4ZH0wRQEkttDSLNnmIS89U+OThdDnYXjJQY7HguD1zuLoOYpEG/r1C1QaBCIL23iyDVMRBfe/PUZp2E1Jqx1JmWV+4V1/HpVsYN49wU32Ry5RYVNNNQpeHLboGfbnPCnvb0bdn4lXdOBlMl3bztUq/+PPN53jdF3OyJB16xdjnyLTScTQ5tXbryox9UayrSfpIcdLs+tg3YHnmTfbPvBRJIqOPGunIxgiKiKQZ6tzrVZG2o1b/oryPPja/89INm1LqZX1ejIrBJsv6blNvYMkg/zmsVFyisfdakmJ8Div1PpmOxWaE3zJr1WYU/DZZfdYx7GwRNZ51LLL+JGMs+fk7Jt/lPOU7TXtY1XdPnT/OHpQ009dcnc0OUdXMOGWzAYCaxBafG7sMxufksZ7fLinv1Jr9Vq6SSXBQpmClnMIxOylJHY6JNAUr5bUnT9khcGuPy83fbGMfNWFVxOfwtkxzddimog0fBatzexKn9rHDyg9bkbbho2AVnuO4Ci0vWN2Q4/RbNNP0hQapd119TaBfnjx86D7jMbtYqK/dxA9dYxnbknrz5kNwcsb5N5zua+43XlVGqOocpwdziuqOn+g+dDqjScGq6lxbkkzu2EMgmyF/LjKS9y22smjDSSFVXdJMmMcZVBZ+4ZvwuooynTz8kMewLX4ffQ55UTjUD07JrUfmifT8ia/Mk5GZTal0lGN6JyWR9CYzc+5L6VtfsJpCSl6TrA3D8nbbNM/l+uak3QWpS7N3Pxz9o9f7xXjq/zqUJenG68D+KRbQxwL6WEAfC/E3YCD+AQzEn4CB+AswEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgfv/rXAN4b/JIGC/ENMBD/AgbiD8AA+lhAHwvoYwF9LKCPBfSxgD4W0McC+lhAHwvoYwF9LKCPBfSxgD4W0McC+lhAHwvoYwF9LKCPBfSxgD4W0McC+lhAHwvoYwF9LKCPBfSxgD4W0McC+lhAHwvoYwF9LKCPBfSxgD4W0McC+lhAHwvoYwF9LKCPBfSxgD4W0McC+lj8BytNFGBx8GG2AAAAAElFTkSuQmCC",
    },
    {
      title: "Ru",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Y9UKrDPiNrvGiwuhru3ETteOH4XJnBIakw&s",
    },
    {
      title: "En",
      flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
    },
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(true);
      }
    };
    // refetch();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="dark:bg-gray-800  bg-slate-100 w-full z-[99] flex  fixed">
      <div className="header-wrapper container lg:max-w-[2560px] md:max-w-[1600px] shadow-md  mx-auto flex justify-between py-4 md:px-5 max-w-[768px] ">
        <div className="logpSection flex gap-6 items-center ">
          <Link to="/" className="logo md:h-[50px]  h-[40px]">
            <img className="w-full h-full" src={logo} alt="OTFIV logo" />
          </Link>
        </div>
        <div className="loginSection flex items-center">
          <div className="darkMode flex items-center">
            <Flowbite>
              <DarkThemeToggle />
            </Flowbite>
          </div>
          <Menu as="div" className="relative md:ml-0 md:mr-4  mx-3">
            <div>
              <MenuButton className="relative flex text-sm focus:outline-none rounded-l-lg md:border-r">
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center gap-2 md:px-4 ps-0  md:py-2 py-1">
                  <img
                    alt=""
                    src={
                      languages.find((lang) => lang.title === selectedLanguage)
                        ?.flag
                    }
                    className="md:w-7 w-5"
                  />
                  <span className="font-[500] dark:text-white md:text-[14px] text-[12px]">
                    {selectedLanguage}
                  </span>
                </div>
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute dark:bg-gray-800 right-0 z-10 mt-2 md:w-36 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            >
              {languages
                .filter((lang) => lang.title !== selectedLanguage)
                .map((lang) => (
                  <MenuItem
                    key={lang.title}
                    onClick={() => handleLanguageChange(lang.title)}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                      <img alt="" src={lang.flag} className="md:w-7 w-5" />
                      <span className="font-[500] md:text-[14px] text-[12px] dark:text-white ">
                        {lang.title}
                      </span>
                    </div>
                  </MenuItem>
                ))}
            </MenuItems>
          </Menu>
          <div className="md:block hidden">
            <Link
              className={`md:px-8 md:py-2 px-6 py-1.5 md:text-[14px] text-[12px] rounded bg-green-200 hover:shadow-xl transition-all duration-150 flex font-semibold ${display}`}
              style={{ fontFamily: "Roboto" }}
              to="/login"
            >
              Kirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
