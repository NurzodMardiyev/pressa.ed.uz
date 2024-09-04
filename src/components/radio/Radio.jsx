import React, { useRef, useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import "../../App.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Toast } from "primereact/toast";
let index = 0;

export default function Radio() {
  const [mediaItems, setMediaItems] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [channelValue, setChannelValue] = useState("");
  const [showedMediaValue, setShowedMediaValue] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();
  const toast = useRef(null);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(["tv", "/radio"], () =>
    oavIV.tv("/radio")
  );

  useEffect(() => {
    if (data) {
      // Ma'lumotlarni o'rnatish
      const media = Array.isArray(data?.media) ? data.media : [];
      const shows = Array.isArray(data?.shows) ? data.shows : [];
      setMediaItems(media);
      setShowItems(shows);
    }
  }, [data]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addPost = useMutation(oavIV.addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      showSuccess();
    },
    onError: () => {
      showError();
      console.log("error mutation");
    },
  });

  const addItem = (e) => {
    e.preventDefault();
    setMediaItems([...mediaItems, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    // addChanal.mutate(name);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleTakeValueForm = (data) => {
    console.log(data);
    addPost.mutate(data);
    reset();
    setSelectedValue("");
    setSelectedDateTime(null);
    setChannelValue(""); // TV nomi qiymatini tozalash
    setShowedMediaValue(""); // Dastur nomini tozalash
  };

  const handleChange = (value) => {
    setSelectedValue(value);
    setValue("scale", value);
    setValue("type", "radio");
  };

  const handleDateTimeChange = (date) => {
    if (!isDateSelected) {
      // Sana tanlanganda vaqt tanlashga o'tamiz
      setIsDateSelected(true);
      setSelectedDateTime(date);
    } else {
      // Vaqt tanlanganda yakuniy qiymatni saqlaymiz
      setSelectedDateTime(date);
      setValue("time", date);
    }
  };

  // If code success give to backend

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Muvaffaqiyatli yuborildi!",
      life: 3000,
    });
  };

  // If code error give to backend
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Ma'lumotlarni qayta kiriting!",
      life: 3000,
    });
  };

  return (
    <div className=" ">
      <div>
        <h2 className="font-semibold text-xl">Radio</h2>
      </div>
      <form onSubmit={handleSubmit(handleTakeValueForm)}>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="fio_otm"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Eshittirish qatnashgan OTM vakili F.I.O
            </label>
            <div className="mt-2">
              <input
                id="fio_otm"
                name="fio_otm"
                type="text"
                autoComplete="kotibining-kompetentsiyasi"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#1677ff] transition-all duration-100 hover:ring-[#4096ff] sm:text-sm sm:leading-6"
                {...register("showedUser")}
              />
            </div>
          </div>

          <div className="sm:col-span-3 ">
            <label
              htmlFor=""
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white mb-2"
            >
              Radio kanal nomi
            </label>
            <Select
              value={channelValue}
              className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[37px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 dropdownTv"
              placeholder="custom dropdown render"
              onChange={(value) => {
                setValue("channel", value);
                setChannelValue(value);
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={mediaItems.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor=""
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white mb-2"
            >
              Dastur nomi
            </label>
            <Select
              value={showedMediaValue}
              className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[37px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
              placeholder="custom dropdown render"
              onChange={(value) => {
                setValue("showedMedia", value);
                setShowedMediaValue(value);
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={showItems.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          {/* <div className="sm:col-span-3">
            <label
              htmlFor="enter-date-work"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Chiqqan sanasi
            </label>
            <div className="mt-2">
              <Calendar
                className="w-full"
                value={date}
                onChange={(e) => setDate(e.value)}
                inputClassName="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 dark:ring-0 dark:text-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                {...register("time")}
              />
            </div>
          </div> */}
          <div className="sm:col-span-3">
            <label
              htmlFor="date-time-picker"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Chiqqan sanasi va vaqti
            </label>
            <div className="mt-2 ">
              <DatePicker
                selected={selectedDateTime}
                onChange={handleDateTimeChange}
                showTimeSelect
                dateFormat={
                  isDateSelected ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy"
                }
                placeholderText="Sanani tanlang"
                timeIntervals={15} // Vaqt intervallari 15 daqiqalik bo'lib o'rnatilgan
                timeCaption="Vaqt"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block md:w-[500px] rounded-md border-0 py-[7px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="kotibining-kompetentsiyasi"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Miqyosi (respublika yoki hududiy telekanal)
            </label>
            <div className="mt-2">
              <Select
                value={selectedValue}
                style={{ width: "100%" }}
                onChange={handleChange} // Foydalanuvchi tanlaganda chaqiriladigan funksiyani o'rnatamiz
                // className="dark:bg-gray-700 dark:text-white dark:ring-0 block md:w-[500px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                className="h-[36px]"
                options={[
                  {
                    label: <span>telekanal turi</span>,
                    title: "telekanal turi",
                    options: [
                      {
                        label: <span>Respublika</span>,
                        value: "Respublika",
                      },
                      {
                        label: <span>Hududiy</span>,
                        value: "Hududiy",
                      },
                      {
                        label: <span>Xorijiy</span>,
                        value: "Xorijiy",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="kotibining-kompetentsiyasi"
              className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
            >
              Havolasi
            </label>
            <div className="mt-2">
              <input
                id="kotibining-kompetentsiyasi"
                name="kotibining-kompetentsiyasi"
                type="text"
                autoComplete="kotibining-kompetentsiyasi"
                className="dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                {...register("link")}
              />
            </div>
          </div>
        </div>
        <Toast ref={toast} />
        <div className="flex justify-end mt-10">
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded"
            label="Success"
            severity="success"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
