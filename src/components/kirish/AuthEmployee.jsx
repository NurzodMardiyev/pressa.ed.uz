import React, { useRef, useState } from "react";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import "../../App.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";

export default function AuthEmployee() {
  const toast = useRef(null);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOrgType, setSelectedOrgType] = useState(null);
  const stepperRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitClearImage = (event) => {
    event.preventDefault();
    if (!image) {
      console.error("No file selected");
      return;
    }

    setImage(null);
  };

  const cities = [
    { name: "Bakalavr", code: "NY" },
    { name: "Magister", code: "RM" },
    { name: "Ilmiy daraja", code: "LDN" },
  ];

  const orgtype = [
    { name: "Xususiy", code: "NY1" },
    { name: "Davlat", code: "RM2" },
    { name: "Chet el ", code: "LDN3" },
  ];

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
      life: 3000,
    });
  };

  const employeeInfo = useMutation(oavIV.employeeInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      console.log("error mutation employeeInfo");
    },
  });
  const deatilsInfo = useMutation(oavIV.detailInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries();

      showSuccess();
      reset();
    },
    onError: () => {
      showError();
      console.log("error mutation detailInfo");
    },
  });

  const handleTakeUsersValue = async (data) => {
    deatilsInfo.mutate(data);
    console.log(data);

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await fetch(
        "http://192.168.43.99:8080/api/employee/settings/upload-photo",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            // "Content-type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server xatosi");
      }

      const result = await response.json();
      console.log("Fayl muvaffaqiyatli yuborildi:", result);
    } catch (error) {
      console.error("Xatolik:", error);
    }

    employeeInfo.mutate();
  };
  return (
    <div className="">
      <div className="container md:max-w-10xl  mx-auto flex justify-between py-4 md:px-5 flex-col">
        <form
          className="border-b border-gray-900/10 md:pt-8 pt-4 pb-4  px-10"
          onSubmit={handleSubmit(handleTakeUsersValue)}
          encType="multipart/form-data"
        >
          <Stepper ref={stepperRef}>
            <StepperPanel header="Shaxsiy ma'lumotlar ">
              <div
                className={`flex flex-col justify-between ${
                  image ? "md:gap-[40px]" : "md:gap-[150px]"
                }`}
              >
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                    Matbuot kotibi shaxsiy ma'lumotlari
                  </h2>
                  <p className="mt-1 text-md leading-6 text-gray-600 dark:text-gray-400">
                    Har bir matbuot kotibi o'z malumotlarini kiritishi kerak!
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="f-i-o"
                        className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                      >
                        F. I. Sh
                      </label>
                      <div className="mt-2">
                        <input
                          id="f-i-o"
                          name="f-i-o"
                          type="text"
                          autoComplete="given-name"
                          className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 dark:text-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          {...register("fullName")}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="enter-date"
                        className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                      >
                        Tug'ilgan yilingiz
                      </label>
                      <div className="mt-2">
                        <Calendar
                          className="w-full"
                          value={date}
                          onChange={(e) => setDate(e.value)}
                          inputClassName="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 dark:text-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          {...register("birthday")}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="tel-number"
                        className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                      >
                        Telefon Raqam (Telegram raqam)
                      </label>
                      <div className="mt-2">
                        <input
                          id="tel-number"
                          name="tel-number"
                          type="tel"
                          autoComplete="family-name"
                          className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset dark:text-white focus:ring-gray-600 sm:text-sm sm:leading-6"
                          {...register("phone")}
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
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <input
                            id="photo"
                            name="photo"
                            type="file"
                            autoComplete="photo"
                            className="rounded-md dark:text-white"
                            onChange={handleImageUpload}
                            multiple="multiple"
                          />
                          {image && (
                            <button
                              className="dark:text-white"
                              onClick={handleSubmitClearImage}
                            >
                              x
                            </button>
                          )}
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
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                      >
                        Jinsingiz
                      </label>
                      <div className="mt-2">
                        <select
                          id="city"
                          name="city"
                          autoComplete="city-name"
                          className="dark:bg-gray-700 dark:text-white block w-full rounded-md border-0 py-1.5 dark:ring-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register("gender")}
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3 ">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                      >
                        Yashash Shahringiz
                      </label>
                      <div className="mt-2">
                        <select
                          id="city"
                          name="city"
                          autoComplete="city-name"
                          className="dark:bg-gray-700 dark:text-white block w-full rounded-md border-0 py-1.5 dark:ring-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register("province")}
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
                </div>
                <div className="flex pt-4 justify-content-end">
                  <Link
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    className="px-5 py-1 bg-blue-500 text-white rounded-md flex items-center gap-3 ms-auto"
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                    <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </StepperPanel>
            <StepperPanel header="Umumiy ma'lumotlar">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                  Matbuot kotibi umumiy ma'lumotlari
                </h2>
                <p className="mt-1 text-md leading-6 text-gray-600 dark:text-gray-400">
                  Har bir matbuot kotibi o'z malumotlarini kiritishi kerak!
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="otmName"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      OTM nomi
                    </label>
                    <div className="mt-2">
                      <input
                        id="otmName"
                        name="otmName"
                        type="text"
                        autoComplete="otmName"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("organization")}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mutaxassisligi"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Mutaxassisligi (bakalavr, magistr, ilmiy darajasi)
                    </label>
                    <div className="mt-2">
                      <Dropdown
                        {...register("degree")}
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        optionLabel="name"
                        placeholder=""
                        className="ring-1 ring-gray-300 w-full text-[14px] rounded-md dropdownMagister"
                        // className=" dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 "
                        checkmark={true}
                        highlightOnSelect={true}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="speciality"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Speciality
                    </label>
                    <div className="mt-2">
                      <input
                        id="speciality"
                        name="speciality"
                        type="text"
                        autoComplete="speciality"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("speciality")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mutaxassisligi"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      OTM turlari
                    </label>
                    <div className="mt-2">
                      <Dropdown
                        {...register("orgType")}
                        value={selectedOrgType}
                        onChange={(e) => setSelectedOrgType(e.value)}
                        options={orgtype}
                        optionLabel="name"
                        placeholder=""
                        className="ring-1 ring-gray-300 w-full text-[14px] rounded-md dropdownMagister"
                        checkmark={true}
                        highlightOnSelect={true}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="commendNumber"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Buyruq raqami yoziladi
                    </label>
                    <div className="mt-2">
                      <input
                        id="commendNumber"
                        name="commendNumber"
                        type="text"
                        autoComplete="icommendNumber"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("commendNumber")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="enter-date-work"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Ishga qabul qilingan yil
                    </label>
                    <div className="mt-2">
                      <Calendar
                        className="w-full"
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        inputClassName="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 dark:text-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("entryDate")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="attestatsiyadan-otganligi"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      AOKAdan attestatsiyadan o'tganligi (agar ha bo'lsa qachon,
                      guvohnoma raqami)
                    </label>
                    <div className="mt-2">
                      <input
                        id="attestatsiyadan-otganligi"
                        name="attestatsiyadan-otganligi"
                        type="text"
                        autoComplete="attestatsiyadan-otganligi"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("license")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="OTFIVning-malaka-oshirish"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      AOKA yoki OTFIVning malaka oshirish kurslari yoki
                      seminarlarida ishtirok etganligi (qachon, qayerda)
                    </label>
                    <div className="mt-2">
                      <input
                        id="OTFIVning-malaka-oshirish"
                        name="OTFIVning-malaka-oshirish"
                        type="text"
                        autoComplete="OTFIVning-malaka-oshirish"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("qualificationInfo")}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="shtatdagi-orni"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Shtatdagi o'rni
                    </label>
                    <div className="mt-2">
                      <input
                        id="shtatdagi-orni"
                        name="shtatdagi-orni"
                        type="text"
                        autoComplete="shtatdagi-orni"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("workType")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="axborot-siyosati"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Rektorning axborot siyosati masalalari bo'yicha
                      maslahatchisi etib belgilangan (Asos hujjat raqami)
                    </label>
                    <div className="mt-2">
                      <input
                        id="axborot-siyosati"
                        name="axborot-siyosati"
                        type="text"
                        autoComplete="axborot-siyosati"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("advisor")}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="kotibining-kompetentsiyasi"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Matbuot kotibining kasbiy va qo'shimcha kompetentsiyasi{" "}
                      (siz nima qilasiz)
                    </label>
                    <div className="mt-2">
                      <input
                        id="kotibining-kompetentsiyasi"
                        name="kotibining-kompetentsiyasi"
                        type="text"
                        autoComplete="kotibining-kompetentsiyasi"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("skills")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="xona-ajratilganligi"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Matbuot bo'limi uchun alohida xona ajratilganligi (ha/yo'q
                      bo'lsa qaysi bo'lim bilan birga o'tiradi)
                    </label>
                    <div className="mt-2">
                      <input
                        id="xona-ajratilganligi"
                        name="xona-ajratilganligi"
                        type="text"
                        autoComplete="xona-ajratilganligi"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("room")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="UzASBO"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Oxirgi bir yillik oylik maoshining o'rtacha miqdori
                      (UzASBO tizimi yoki my.gov.uz orqali olingan ma'lumot fayl
                      shaklida taqdim etiladi)
                    </label>
                    <div className="mt-2">
                      <input
                        id="UzASBO"
                        name="UzASBO"
                        type="text"
                        autoComplete="UzASBO"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("averageSalary")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="alohida-matbuot"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Alohida Matbuot/axborot xizmati bo'limi tashkil
                      etilganligi (bo'lsa unda nechta shtat bor yoki nechta
                      boshqa bo'limdan jalb qilingan)
                    </label>
                    <div className="mt-2">
                      <input
                        id="alohida-matbuot"
                        name="alohida-matbuot"
                        type="text"
                        autoComplete="alohida-matbuot"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("departmentOrganisation")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="xorijga-xizmat"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Matbuot kotibini xorijga xizmat safarlariga yuborilganligi
                      (qachon, qayerga)
                    </label>
                    <div className="mt-2">
                      <input
                        id="xorijga-xizmat"
                        name="xorijga-xizmat"
                        type="text"
                        autoComplete="xorijga-xizmat"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("businessTrip")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="kotibining-kompetentsiyasi"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Moddiy-texnik bazasining holati (kamera soni va uning
                      nomi, modeli; telefon: bor/yo'q; televizor: bor/yo'q;
                      kompyuter jamlamasi soni va nechtasi hujjat bilan ishlash
                      uchun, nechtasi montaj uchun; Qo'shimcha izoh)
                    </label>
                    <div className="mt-2">
                      <input
                        id="kotibining-kompetentsiyasi"
                        name="kotibining-kompetentsiyasi"
                        type="text"
                        autoComplete="kotibining-kompetentsiyasi"
                        className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register("resource")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pt-4 justify-content-between mt-4">
                <Link
                  severity="secondary"
                  className="px-5 py-1 bg-gray-500 text-white rounded-md flex items-center gap-3"
                  onClick={() => stepperRef.current.prevCallback()}
                >
                  <FaArrowLeftLong />
                  Back
                </Link>
                <Toast ref={toast} />
                <Button
                  label="Submit"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  className="ms-auto px-5 py-1 bg-blue-500 text-white"
                  onClick={() => stepperRef.current.nextCallback()}
                />
              </div>
            </StepperPanel>
          </Stepper>
        </form>
      </div>
    </div>
  );
}
