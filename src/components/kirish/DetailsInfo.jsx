import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Steps,
  Upload,
  Select,
  message,
  Space,
  Divider,
  Radio,
} from "antd";
import DetailsSidebar from "./DetailsSidebar";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import logo from "../../images/pressa logo.png";
import "../../App.css";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { Toast } from "primereact/toast";
let index = 0;

const IP = "10.10.2.131";

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const optionsAOKA = [
  {
    label: "Yo'q",
    value: "yo'q",
  },
  {
    label: "Ha",
    value: "ha",
  },
];

// Steps
const steps = [
  {
    title: "Shaxsiy Ma'lumotlar",
    content: 1,
  },
  {
    title: "Umumiy Ma'lumotlar",
    content: 2,
  },
];

export default function DetailsInfo() {
  // commands for Steps
  const [current, setCurrent] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isRadioAdd, setIsRadioAdd] = useState(false);
  const [isTvAdd, setIsTvAdd] = useState(false);
  const { Option } = Select;
  const queryClient = useQueryClient();
  const toast = useRef(null);
  const [radioValue, setRadioValue] = useState("");
  const [radioValueQualificationInfo, setRadioValueQualificationInfo] =
    useState("");
  const [radioValueRoom, setRadioValueRoom] = useState("");
  const [
    radioValueDepartmentOrganisation,
    setRadioValueDepartmentOrganisation,
  ] = useState("");
  const [radioValueBusinessTrip, setRadioValueBusinessTrip] = useState("");

  // const convertToWebP = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file); // Faylni base64 formatida o'qib olish

  //     reader.onload = function (e) {
  //       const img = new Image();
  //       img.src = e.target.result;

  //       img.onload = function () {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");

  //         // Rasm o'lchamini belgilash (masalan, maksimal kenglik va balandlik)
  //         const maxWidth = 800; // Kenglikni cheklash
  //         const maxHeight = 800; // Balandlikni cheklash
  //         let width = img.width;
  //         let height = img.height;

  //         if (width > height) {
  //           if (width > maxWidth) {
  //             height *= maxWidth / width;
  //             width = maxWidth;
  //           }
  //         } else {
  //           if (height > maxHeight) {
  //             width *= maxHeight / height;
  //             height = maxHeight;
  //           }
  //         }

  //         canvas.width = width;
  //         canvas.height = height;

  //         // Rasmni canvasga chizish
  //         ctx.drawImage(img, 0, 0, width, height);

  //         // WebP formatiga o'zgartirish
  //         canvas.toBlob(
  //           (blob) => {
  //             if (blob) resolve(blob); // WebP faylni qaytarish
  //             else reject(new Error("WebP ga o'zgartirishda xatolik!"));
  //           },
  //           "image/webp",
  //           0.8
  //         ); // 0.8 - sifat
  //       };
  //     };
  //   });
  // };

  // // Uploaddan oldin rasmni WebP formatiga o'zgartirish
  // const beforeUpload = async (file) => {
  //   const isImage = file.type.startsWith("image/");
  //   if (!isImage) {
  //     message.error("Faqat rasm fayllarini yuklashingiz mumkin!");
  //     return false;
  //   }

  //   // Rasmni WebP formatiga o'tkazish
  //   try {
  //     const webpFile = await convertToWebP(file);
  //     const newFile = new File([webpFile], file.name.split(".")[0] + ".webp", {
  //       type: "image/webp",
  //     });
  //     return newFile; // WebP faylni yuklash uchun qaytaramiz
  //   } catch (error) {
  //     message.error("Rasmni WebP formatiga o'zgartirishda xatolik yuz berdi!");
  //     return false;
  //   }
  // };

  // -----------------

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Faqat JPG yoki PNG formatdagi fayllarni yuklash mumkin!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2; // 2MB dan katta fayllarni yuklashni oldini olish
    if (!isLt2M) {
      message.error("Rasm hajmi 2MB dan oshmasligi kerak!");
      return false;
    }

    return isJpgOrPng && isLt2M;
  };

  const deatilsInfo = useMutation(oavIV.detailInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries();

      showSuccess();
      // reset();
    },
    onError: (data) => {
      showError(data.message);
      console.log("error mutation detailInfo");
    },
  });

  const token = JSON.parse(localStorage.getItem("token"));

  const [mediaItems, setMediaItems] = useState([]);

  // Sellect Channel
  const [items, setItems] = useState(mediaItems);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const allOrganization = useMutation(() => oavIV.allOrganization());

  useEffect(() => {
    allOrganization.mutate();
  }, []);

  const { data } = useQuery(
    ["allOrganization"],
    () => oavIV.allOrganization(),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      // Ma'lumotlarni o'rnatish
      const oraganizations = Array.isArray(data) ? data : [];
      setMediaItems(oraganizations);

      // items va items1 ni yangilash
      setItems(oraganizations);
    }
  }, [data]);

  const onFinish = (fieldsValue) => {
    let licenseValue = "";

    if (radioValue === "ha" && fieldsValue.license.length > 0) {
      licenseValue = fieldsValue.license[0].value; // "ha" bo'lsa, birinchi input qiymati yuboriladi
    } else {
      licenseValue = "yo'q"; // "yo'q" bo'lsa, "yo'q" text yuboriladi
    }

    let qualificationInfo = "";

    if (
      radioValueQualificationInfo === "ha" &&
      fieldsValue.qualificationInfo.length > 0
    ) {
      qualificationInfo = fieldsValue.qualificationInfo[0].value; // "ha" bo'lsa, birinchi input qiymati yuboriladi
    } else {
      qualificationInfo = "yo'q"; // "yo'q" bo'lsa, "yo'q" text yuboriladi
    }
    let room = "";

    if (radioValueRoom === "ha") {
      room = "ha"; // "yo'q" bo'lsa, "yo'q" text yuboriladi
    } else {
      room = fieldsValue.room[0].value; // "ha" bo'lsa, birinchi input qiymati yuboriladi
    }

    let departmentOrganisation = "";

    if (
      radioValueDepartmentOrganisation === "ha" &&
      fieldsValue.departmentOrganisation.length > 0
    ) {
      departmentOrganisation = fieldsValue.departmentOrganisation[0].value; // "ha" bo'lsa, birinchi input qiymati yuboriladi
    } else {
      departmentOrganisation = "yo'q"; // "yo'q" bo'lsa, "yo'q" text yuboriladi
    }

    let businessTrip = "";

    if (
      radioValueBusinessTrip === "ha" &&
      fieldsValue.businessTrip.length > 0
    ) {
      businessTrip = fieldsValue.businessTrip[0].value; // "ha" bo'lsa, birinchi input qiymati yuboriladi
    } else {
      businessTrip = "yo'q"; // "yo'q" bo'lsa, "yo'q" text yuboriladi
    }
    const values = {
      ...fieldsValue,
      birthday: fieldsValue["birthday"].format("YYYY-MM-DD"),
      entryDate: fieldsValue["entryDate"].format("YYYY-MM-DD"),
      license: licenseValue,
      qualificationInfo: qualificationInfo,
      room: room,
      departmentOrganisation: departmentOrganisation,
      businessTrip: businessTrip,
    };

    if (values.specialities) {
      values.specialities = values.specialities.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }
    if (values.workType) {
      values.workType = values.workType.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }
    console.log("Received values of form: ", values);
    deatilsInfo.mutate(values);
  };
  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 0,
    });
  };

  const showError = (data) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `${data}`,
      life: 0,
    });
  };

  // End step commands

  return (
    <div>
      <div className="md:flex">
        <div className="md:fixed">
          <DetailsSidebar
            next={next}
            prev={prev}
            current={current}
            setCurrent={setCurrent}
          />
        </div>
        <div className=" md:hidden shadow-xl px-2 py-4">
          <img src={logo} alt="pressa.edu.uz" className="w-[50%]" />
        </div>
        <div className="md:ms-[340px] w-full">
          <div className="container w-[90%] mx-auto  ">
            <Steps
              current={current}
              // items={items}
              className="md:w-[70%] mx-auto md:py-10 pt-6"
            />
            {/* <div style={contentStyle}>{steps[current].content}</div> */}

            <Form
              name="time_related_controls"
              // {...formItemLayout}
              onFinish={onFinish}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              {/* form input group step1 */}
              <div
                className={`w-full  ${
                  steps[current].content === 1 ? "flex flex-col" : "hidden"
                }`}
              >
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                    Matbuot kotibi shaxsiy ma'lumotlari
                  </h2>
                  <p className="mt-1 text-md leading-6 text-gray-600 dark:text-gray-400">
                    Har bir matbuot kotibi o'z malumotlarini kiritishi kerak!
                  </p>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="fullName"
                      label="F. I. O"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos F.I.Oingizni kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="birthday"
                      label="Tug'ilgan yilingiz"
                      {...config}
                      className=""
                    >
                      <DatePicker className="w-full py-2" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="phone"
                      label="Telefon raqamingiz (yoki telegram raqamingiz)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos telefon raqamingiz kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="gender"
                      label="Jinsingizni kiriting!"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos jinsingizni kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="select your gender"
                        className="min-h-[41px]"
                      >
                        <Option value="male">Erkak</Option>
                        <Option value="female">Ayol</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3 relative">
                    <Form.Item
                      name="province"
                      label="Yashayotgan viloyatingizni kiriting!"
                      rules={[
                        {
                          required: true,
                          message:
                            "Iltimos Yashayotgan viloyatingizni kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="select your province"
                        className="h-[41px]"
                      >
                        <Option value="Toshkent" className="">
                          Toshkent
                        </Option>
                        <Option value="Samarqand">Samarqand</Option>
                        <Option value="Jizzax">Jizzax</Option>
                        <Option value="Farg'ona">Farg'ona</Option>
                        <Option value="Andijon">Andijon</Option>
                        <Option value="Namangan">Namangan</Option>
                        <Option value="Qashqadaryo">Qashqadaryo</Option>
                        <Option value="Surxondaryo">Surxondaryo</Option>
                        <Option value="Xorazm">Xorazm</Option>
                        <Option value="Buxoro">Buxoro</Option>
                        <Option value="Navoiy">Navoiy</Option>
                        <Option value="Qoraqalpogiston">
                          Qoraqalpog'iston respublikasi
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="specialities"
                      label="Ilmiy darajangizni qo'shing!"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos, ilmiy darajangizni qo'shing!",
                        },
                      ]}
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <Form.List name="specialities">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: 0,
                                }}
                                align="baseline"
                                className="w-full grid grid-cols-2 relative items-center"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "key"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Darajangizni kiriting!",
                                    },
                                  ]}
                                  className="col-span-1 mb-1"
                                >
                                  <Select
                                    placeholder="select your degree"
                                    className="h-[41px]"
                                  >
                                    <Option value="bakalavr" className="">
                                      Bakalavr
                                    </Option>
                                    <Option value="magistr">Magistr</Option>
                                    <Option value="phd">
                                      PhD (Doctor of Philosophy)
                                    </Option>
                                    <Option value="dsc">
                                      DSc (Doctor of Science)
                                    </Option>
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing  direction",
                                    },
                                  ]}
                                  className="col-span-1 mb-1"
                                >
                                  <Input.TextArea
                                    placeholder="Yo'nalishingiz"
                                    autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                                    onKeyDown={(e) => {
                                      if (e.shiftKey && e.key === "Enter") {
                                        e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga o'tkazadi
                                        e.target.value += "\n"; // Kursorni yangi qatorga o'tkazadi
                                      }
                                    }}
                                    style={{
                                      height: 41,
                                    }}
                                    // className="h-[41px] inline-block"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type=""
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                className="py-1.5 h-[41px]"
                              >
                                Qo'shish
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Upload
                      action={`http://${IP}:8080/api/employee/settings/upload-photo`}
                      listType="picture"
                      beforeUpload={beforeUpload} // Uploaddan oldin JPG yoki PNG formatini tekshirish
                      headers={{
                        Authorization: `${token}`, // Headerlarda tokenni qo'shamiz
                      }}
                      enctype="multipart/form-data"
                      name="photo"
                      className="w-full"
                      onChange={(info) => {
                        if (info.file.status === "done") {
                          message.success(`${info.file.name} yuklandi.`);
                          console.log("Yuklash tugadi:", info.file.response);
                        } else if (info.file.status === "error") {
                          message.error(`${info.file.name} yuklanmadi.`);
                          console.log("Yuklashda xato:", info.file.response);
                        }
                      }}
                    >
                      <div className="w-full flex flex-col gap-2">
                        <label htmlFor="" className="flex items-center gap-1">
                          <span className="text-[17px] text-red-500  inline-block">
                            *
                          </span>{" "}
                          Rasmingizni yuklang (JPG yoki PNG)
                        </label>
                        <Button
                          type="bg-[#73d13d]"
                          icon={<UploadOutlined />}
                          className="w-full bg-inherit h-[41px] text-[#333] border border-[#D9D9D9] hover:text-[#4CA852] hover:border-[#4CA852]"
                        >
                          Yuklash
                        </Button>
                      </div>
                    </Upload>
                  </div>
                </div>
              </div>

              {/* form input group step2 */}
              <div
                className={`w-full  ${
                  steps[current].content === 2 ? "flex flex-col" : "hidden"
                }`}
              >
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                    Matbuot kotibi Umumiy ma'lumotlari
                  </h2>
                  <p className="mt-1 text-md leading-6 text-gray-600 dark:text-gray-400">
                    Har bir matbuot kotibi o'z malumotlarini kiritishi kerak!
                  </p>
                </div>

                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  {/* <div className="sm:col-span-3">
                    <Form.Item
                      name="organization"
                      label="OTM nomi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos OTM nomi kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div> */}
                  <div className="sm:col-span-3 w-full">
                    <Form.Item
                      name="organizationId"
                      label="OTM nomi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                        placeholder="custom dropdown render"
                        dropdownRender={(menu1) => (
                          <>
                            {menu1}
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
                                placeholder="Boshqa bo'lsa kiriting!"
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
                                Qo'shish
                              </Button>
                            </Space>
                          </>
                        )}
                        options={mediaItems.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  {/* <div className="sm:col-span-3">
                    <Form.Item
                      name="orgType"
                      label="OTM turlari"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos OTM turini kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="select your organization type"
                        className="h-[41px]"
                      >
                        <Option value="Xususiy">Xususiy</Option>
                        <Option value="Davlat">Davlat</Option>
                        <Option value="Chet el">Chet el</Option>
                      </Select>
                    </Form.Item>
                  </div> */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="commendNumber"
                      label="Buyruq raqami yoziladi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Buyruq raqami kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="entryDate"
                      label="Ishga qabul qilingan yil"
                      {...config}
                      className=""
                    >
                      <DatePicker className="w-full py-2" />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="license"
                      label="AOKAdan attestatsiyadan o'tganligi (agar ha bo'lsa qachon,
                      guvohnoma raqami)"
                      rules={[
                        {
                          required: true,
                          message:
                            "Iltimos attestatsiyadan o'tganligini kiriting!",
                        },
                      ]}
                    >
                      <Form.List name="license">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: "-20px",
                                }}
                                align="baseline"
                                className="w-full relative items-center grid grid-cols-1"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: radioValue === "ha", // faqat "ha" tanlanganida kerak
                                      message: "Missing direction",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="Qachon va guvohnoma raqami"
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                    style={{
                                      height: 41,
                                      display: "block",
                                    }}
                                    className="w-full"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Radio.Group
                                block
                                options={optionsAOKA}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={(e) => {
                                  setRadioValue(e.target.value); // Radio qiymatini saqlab qo'yamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha bo'lsa input qo'shiladi
                                  } else {
                                    remove(0); // Yo'q bo'lsa inputni olib tashlaymiz
                                  }
                                }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="qualificationInfo"
                      label="AOKA yoki OTFIVning malaka oshirish kurslari yoki
                      seminarlarida ishtirok etganligi (qachon, qayerda)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Form.List name="qualificationInfo">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: "-20px",
                                }}
                                align="baseline"
                                className="w-full relative items-center grid grid-cols-1"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: radioValue === "ha", // faqat "ha" tanlanganida kerak
                                      message: "Missing direction",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="Qachon va qayerda"
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                    style={{
                                      height: 41,
                                      display: "block",
                                    }}
                                    className="w-full"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Radio.Group
                                block
                                options={optionsAOKA}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={(e) => {
                                  setRadioValueQualificationInfo(
                                    e.target.value
                                  ); // Radio qiymatini saqlab qo'yamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha bo'lsa input qo'shiladi
                                  } else {
                                    remove(0); // Yo'q bo'lsa inputni olib tashlaymiz
                                  }
                                }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="workType"
                      label="Shtatdagi o'rni"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos shtatdagi o'rni kiriting!",
                        },
                      ]}
                    >
                      <Form.List name="workType">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: 0,
                                }}
                                align="baseline"
                                className="w-full grid grid-cols-2 relative items-center"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "key"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Darajangizni kiriting!",
                                    },
                                  ]}
                                  className="col-span-1 mb-1"
                                >
                                  <Select
                                    placeholder="select your degree"
                                    className="h-[41px]"
                                  >
                                    <Option value="1shtat" className="">
                                      1 shtat
                                    </Option>
                                    <Option value="0.5shtat">0.5 shtat</Option>
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing  direction",
                                    },
                                  ]}
                                  className="col-span-1 mb-1"
                                >
                                  <Select
                                    placeholder="select your degree"
                                    className="h-[41px]"
                                  >
                                    <Option value="asosiy" className="">
                                      Asosiy
                                    </Option>
                                    <Option value="o'rindosh">O'rindosh</Option>
                                  </Select>
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type=""
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                className="py-1.5 h-[41px]"
                              >
                                Qo'shish
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="advisor"
                      label="Rektorning axborot siyosati masalalari bo'yicha
                      maslahatchisi etib belgilangan (Asos hujjat raqami)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                        onKeyDown={(e) => {
                          if (e.shiftKey && e.key === "Enter") {
                            e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga o'tkazadi
                            e.target.value += "\n"; // Kursorni yangi qatorga o'tkazadi
                          }
                        }}
                        style={{
                          height: 41,
                        }}
                        // className="h-[41px] inline-block"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="skills"
                      label="Matbuot kotibining kasbiy va qo'shimcha kompetentsiyasi
                      (siz nima qilasiz)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                        onKeyDown={(e) => {
                          if (e.shiftKey && e.key === "Enter") {
                            e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga o'tkazadi
                            e.target.value += "\n"; // Kursorni yangi qatorga o'tkazadi
                          }
                        }}
                        style={{
                          height: 41,
                        }}
                        // className="h-[41px] inline-block"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="room"
                      label="Matbuot bo'limi uchun alohida xona ajratilganligi (ha/yo'q
                      bo'lsa qaysi bo'lim bilan birga o'tiradi)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Form.List name="room">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: "-20px",
                                }}
                                align="baseline"
                                className="w-full relative items-center grid grid-cols-1"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: radioValue === "ha", // faqat "ha" tanlanganida kerak
                                      message: "Missing direction",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="Qachon va qayerda"
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                    style={{
                                      height: 41,
                                      display: "block",
                                    }}
                                    className="w-full"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Radio.Group
                                block
                                options={optionsAOKA}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={(e) => {
                                  setRadioValueRoom(e.target.value); // Radio qiymatini saqlab qo'yamiz
                                  if (e.target.value === "ha") {
                                    remove(0); // Yo'q bo'lsa inputni olib tashlaymiz
                                  } else {
                                    add(); // Ha bo'lsa input qo'shiladi
                                  }
                                }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="averageSalary"
                      label="Oxirgi bir yillik oylik maoshining o'rtacha miqdori
                      (UzASBO tizimi yoki my.gov.uz orqali olingan ma'lumot fayl
                      shaklida taqdim etiladi)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                        onKeyDown={(e) => {
                          if (e.shiftKey && e.key === "Enter") {
                            e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga o'tkazadi
                            e.target.value += "\n"; // Kursorni yangi qatorga o'tkazadi
                          }
                        }}
                        style={{
                          height: 41,
                        }}
                        // className="h-[41px] inline-block"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="departmentOrganisation"
                      label="Alohida Matbuot/axborot xizmati bo'limi tashkil
                      etilganligi (bo'lsa unda nechta shtat bor yoki nechta
                      boshqa bo'limdan jalb qilingan)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Form.List name="departmentOrganisation">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: "-20px",
                                }}
                                align="baseline"
                                className="w-full relative items-center grid grid-cols-1"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: radioValue === "ha", // faqat "ha" tanlanganida kerak
                                      message: "Missing direction",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="Nechta shtat borligi va nechta boshqadan jalb qilingabligi"
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                    style={{
                                      height: 41,
                                      display: "block",
                                    }}
                                    className="w-full"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Radio.Group
                                block
                                options={optionsAOKA}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={(e) => {
                                  setRadioValueDepartmentOrganisation(
                                    e.target.value
                                  ); // Radio qiymatini saqlab qo'yamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha bo'lsa input qo'shiladi
                                  } else {
                                    remove(0); // Yo'q bo'lsa inputni olib tashlaymiz
                                  }
                                }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="businessTrip"
                      label="Matbuot kotibini xorijga xizmat safarlariga yuborilganligi
                      (qachon, qayerga)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Form.List name="businessTrip">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: "-20px",
                                }}
                                align="baseline"
                                className="w-full relative items-center grid grid-cols-1"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: radioValue === "ha", // faqat "ha" tanlanganida kerak
                                      message: "Missing direction",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="Qachon va qayerga"
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                    style={{
                                      height: 41,
                                      display: "block",
                                    }}
                                    className="w-full"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-4 right-1"
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Radio.Group
                                block
                                options={optionsAOKA}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={(e) => {
                                  setRadioValueBusinessTrip(e.target.value); // Radio qiymatini saqlab qo'yamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha bo'lsa input qo'shiladi
                                  } else {
                                    remove(0); // Yo'q bo'lsa inputni olib tashlaymiz
                                  }
                                }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>

                  {/* Moddiy-texnik bazasining holati  (kamera soni va uning
                    nomi, modeli;// telefon: bor/yo'q; televizor: bor/yo'q;
                    kompyuter jamlamasi soni va nechtasi hujjat bilan
                    ishlash uchun, nechtasi montaj uchun; Qo'shimcha izoh) */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="resource"
                      label="Moddiy-texnik bazasining holati 
                          (Kamera soni va uning nomi, modeli)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input />
                      {/* <Form.List name="resource">
                        {(fields, { add, remove }) => (
                          <>
                            <Form.Item>
                              <Input
                                onChange={(e) => {
                                  console.log(e.target.value.split("").length);
                                  if (
                                    e.target.value.split("").length > 3 &&
                                    !isAdded
                                  ) {
                                    add();
                                    setIsAdded(true);
                                  } else if (
                                    e.target.value.split("").length < 4
                                  ) {
                                    console.log("yes");
                                    remove(0);
                                    setIsAdded(false);
                                  }
                                }}
                              />
                            </Form.Item>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: "-20px",
                                }}
                                align="baseline"
                                className="w-full relative items-center grid grid-cols-1"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: radioValue === "ha", // faqat "ha" tanlanganida kerak
                                      message: "Missing direction",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Form.List name="telefon">
                                    {(fields, { add, remove }) => (
                                      <>
                                        <Form.Item
                                          label="Telefon bor yo'qligi"
                                          style={{
                                            marginTop: "-20px",
                                          }}
                                        >
                                          <Radio.Group
                                            block
                                            options={optionsAOKA}
                                            optionType="button"
                                            buttonStyle="solid"
                                            onChange={(e) => {
                                              //setRadioValueRoom(e.target.value); // Radio qiymatini saqlab qo'yamiz
                                              if (
                                                e.target.value &&
                                                !isRadioAdd
                                              ) {
                                                add(); // Ha bo'lsa input qo'shiladi
                                                setIsRadioAdd(true);
                                              }
                                            }}
                                          />
                                        </Form.Item>
                                        {fields.map(
                                          ({ key, name, ...restField }) => (
                                            <Space
                                              key={key}
                                              style={{
                                                marginTop: "-10px",
                                              }}
                                              align="baseline"
                                              className="w-full relative items-center grid grid-cols-1"
                                            >
                                              <Form.Item
                                                {...restField}
                                                name={[name, "value"]}
                                                rules={[
                                                  {
                                                    required:
                                                      radioValue === "ha", // faqat "ha" tanlanganida kerak
                                                    message:
                                                      "Missing direction",
                                                  },
                                                ]}
                                                className="col-span-1"
                                              >
                                                <Form.List name="telefon">
                                                  {(
                                                    fields,
                                                    { add, remove }
                                                  ) => (
                                                    <>
                                                      <Form.Item
                                                        label="Telefon bor yo'qligi"
                                                        style={{
                                                          marginTop: "-20px",
                                                        }}
                                                      >
                                                        <Radio.Group
                                                          block
                                                          options={optionsAOKA}
                                                          optionType="button"
                                                          buttonStyle="solid"
                                                          onChange={(e) => {
                                                            //setRadioValueRoom(e.target.value); // Radio qiymatini saqlab qo'yamiz
                                                            if (
                                                              e.target.value &&
                                                              !isRadioAdd
                                                            ) {
                                                              add(); // Ha bo'lsa input qo'shiladi
                                                              setIsRadioAdd(
                                                                true
                                                              );
                                                            }
                                                          }}
                                                        />
                                                      </Form.Item>
                                                      {fields.map(
                                                        ({
                                                          key,
                                                          name,
                                                          ...restField
                                                        }) => (
                                                          <Space
                                                            key={key}
                                                            style={{
                                                              marginTop:
                                                                "-10px",
                                                            }}
                                                            align="baseline"
                                                            className="w-full relative items-center grid grid-cols-1"
                                                          >
                                                            <Form.Item
                                                              {...restField}
                                                              name={[
                                                                name,
                                                                "value",
                                                              ]}
                                                              rules={[
                                                                {
                                                                  message:
                                                                    "Missing direction",
                                                                },
                                                              ]}
                                                              className="col-span-1"
                                                            >
                                                              <Input />
                                                            </Form.Item>
                                                            <MinusCircleOutlined
                                                              onClick={() =>
                                                                remove(name)
                                                              }
                                                              className="absolute z-10 top-4 right-1"
                                                            />
                                                          </Space>
                                                        )
                                                      )}
                                                    </>
                                                  )}
                                                </Form.List>
                                              </Form.Item>
                                              <MinusCircleOutlined
                                                onClick={() => remove(name)}
                                                className="absolute z-10 top-4 right-1"
                                              />
                                            </Space>
                                          )
                                        )}
                                      </>
                                    )}
                                  </Form.List>
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="absolute z-10 top-6 right-1"
                                />
                              </Space>
                            ))}
                          </>
                        )}
                      </Form.List> */}
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* form Steps */}

              <div className="md:mt-[24px] md:mb-[40px] mb-6">
                {current > 0 && (
                  <Button
                    style={{
                      margin: "2px 8px",
                    }}
                    onClick={() => prev()}
                    className="px-10 py-6 rounded-full shadow-lg text-[#4CA852] text-[16px]"
                  >
                    Oldingi
                  </Button>
                )}
                <Toast ref={toast} />
                {current === steps.length - 1 && (
                  <Button
                    htmlType="submit"
                    className="float-right px-10 py-6 rounded-full shadow-lg bg-[#4CA852] text-white text-[16px]"
                  >
                    Yuborish
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button
                    onClick={() => next()}
                    className="float-right px-10 py-6 rounded-full shadow-lg bg-[#4CA852] text-white text-[16px] "
                  >
                    Keyingi
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
