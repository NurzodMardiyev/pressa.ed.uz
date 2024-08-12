import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [image, setImage] = useState(null);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const handleImageUpload = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitClear = (e) => {
    e.preventDefault();
    setImage(null);
    e.target[0].value = "";
  };
  return (
    <div className="md:max-w-6xl mx-auto md:px-0 z-30">
      <div className="border-b border-gray-900/10 pt-24 pb-4  px-10">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Ism
            </label>
            <div className="mt-2">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 dark:text-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Familya
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="dark:bg-gray-700   block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 dark:text-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Otasining Ismi
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset dark:text-white focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Sizning Rasmingiz
            </label>
            <form className="mt-2" onSubmit={handleSubmitClear}>
              <div className="flex items-center justify-between">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  autoComplete="photo"
                  className="rounded-md dark:text-white"
                  onChange={handleImageUpload}
                />
                {image && <button className="dark:text-white">x</button>}
              </div>
              {image && (
                <img
                  src={image}
                  alt="Uploaded"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    marginTop: "10px",
                  }}
                />
              )}
            </form>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="dark:bg-gray-700 dark:text-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              City
            </label>
            <div className="mt-2">
              <select
                id="city"
                name="city"
                autoComplete="city-name"
                className="dark:bg-gray-700 dark:text-white block w-full rounded-md border-0 py-1.5 dark:ring-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Toshkent</option>
                <option>Samarqand</option>
                <option>Jizzax</option>
                <option>Farg'ona</option>
                <option>Andijon</option>
                <option>Namangan</option>
                <option>Qashqadaryo</option>
                <option>Surxandaryo</option>
                <option>Xorazm</option>
                <option>Buxoro</option>
                <option>Navoiy</option>
                <option>Qoraqalpog'iston respublikasi</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="pasportSeria"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Pasport seriya
            </label>
            <div className="mt-2">
              <input
                id="pasportSeria"
                name="pasportSeria"
                type="text"
                autoComplete="pasportSeria"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="posportNumber"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Pasport raqam
            </label>
            <div className="mt-2">
              <input
                id="posportNumber"
                name="posportNumber"
                type="number"
                autoComplete="posportNumber"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Parol qo'ying
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={`${show1 ? "password" : "text"}`}
                autoComplete="password-level2"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {show1 ? (
                <FaRegEye
                  className="absolute right-3 top-2.5 cursor-pointer dark:text-white"
                  onClick={() => setShow1(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-2.5 cursor-pointer dark:text-white"
                  onClick={() => setShow1(true)}
                />
              )}
            </div>
          </div>
          <div className="sm:col-span-2 ">
            <label
              htmlFor="password2"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Parolingizni takrorlang
            </label>
            <div className="mt-2 relative">
              <input
                id="password2"
                name="password2"
                type={`${show2 ? "password" : "text"}`}
                autoComplete="password-level2"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {show2 ? (
                <FaRegEye
                  className="absolute right-3 top-2.5 cursor-pointer dark:text-white"
                  onClick={() => setShow2(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-2.5 cursor-pointer dark:text-white"
                  onClick={() => setShow2(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pb-3 flex items-center justify-end gap-x-6 px-10">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900  dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
