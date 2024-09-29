import React, { useState, useRef, useEffect } from "react";
import logo from "../../images/pressa logo.png";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
import "../../App.css";
import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";
import { Flex, Spin } from "antd";

export default function HeaderEmployee() {
  const [selectedLanguage, setSelectedLanguage] = useState("Uz");
  const [show, setShow] = useState(true);
  const menuRef = useRef(null);

  const { data, error, isLoading } = useEmployeeInfo();

  // const { t, i18n } = useTranslation();
  // useEffect(() => {
  //   const lng = navigator.language;
  // i18n.changeLanguage(lng);
  // }, [i18n]);

  // const lng = navigator.language

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

  const handleShowMenu = () => {
    setShow(!show);
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

  if (isLoading)
    return (
      <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center">
        <Flex>
          <Spin size="large" />
        </Flex>
      </div>
    );
  if (error) return <div>Xato: {error.message}</div>;

  const base64Image = `data:image/png;base64,${data?.user.base64}`;

  return (
    <div className="dark:bg-gray-800 fixed top-0 bg-slate-100 w-full z-[999] ">
      <div className="header-wrapper container lg:max-w-[2560px] md:max-w-[1600px]  mx-auto flex justify-between py-4 md:px-5  ">
        <div className="logpSection flex gap-6 items-center ">
          <div className="logo h-[30px]  md:h-[40px]">
            <img className="w-full h-full" src={logo} alt="OTFIV logo" />
          </div>
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
                <div className="flex items-center gap-2 md:px-4 ps-0  md:py-1.5 py-1">
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
                    <div className="flex items-center gap-2 px-4 py-1.5 cursor-pointer">
                      <img alt="" src={lang.flag} className="md:w-7 w-5" />
                      <span className="font-[500] md:text-[14px] text-[12px] dark:text-white ">
                        {lang.title}
                      </span>
                    </div>
                  </MenuItem>
                ))}
            </MenuItems>
          </Menu>
          <div
            className="responsiveMenu relative md:hidden  ps-3 py-1"
            ref={menuRef}
          >
            <Link className="transition-all duration-150">
              {show ? (
                <GiHamburgerMenu
                  onClick={handleShowMenu}
                  className="dark:text-white"
                />
              ) : (
                <IoCloseSharp
                  onClick={handleShowMenu}
                  className="dark:text-white"
                />
              )}
            </Link>
            <div
              className={`responsive ${
                show
                  ? "h-0 opacity-0 translate-y-[-100%] z-0 hidden"
                  : "h-[167px] opacity-100 translate-y-[0] z-[90] "
              } absolute right-0 w-[120px] mt-3 shadow-md px-3 rounded-b-sm transition-all duration-150 bg-white dark:bg-gray-800`}
            >
              <div className="loginOrSignUp flex items-start mt-1 mb-3">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={base64Image}
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sign out
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          <div className="loginOrSignUp md:flex items-center gap-2 hidden">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={base64Image}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800  py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm dark:text-white hover:dark:bg-gray-700 text-gray-700 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm dark:text-white hover:dark:bg-gray-700 text-gray-700 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm dark:text-white hover:dark:bg-gray-700 text-gray-700 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
