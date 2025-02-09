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
// import DetailsSidebar from "../kirish/DetailsSidebar";
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
import { ip } from "../../ips";
let index = 0;

const IP = ip;

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Iltimos Inputga qiymat kiriting!",
    },
  ],
};

const optionsAOKA = [
  {
    label: "Yoʻq",
    value: "yoʻq",
  },
  {
    label: "Ha",
    value: "ha",
  },
];

// Steps
const steps = [
  {
    title: "Shaxsiy Ma’lumotlar",
    content: 1,
  },
  {
    title: "Umumiy Ma’lumotlar",
    content: 2,
  },
];

export default function EditProfile() {
  // commands for Steps
  const [current, setCurrent] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isRadioAdd, setIsRadioAdd] = useState(false);
  const [isSecondRadioAdded, setIsSecondRadioAdded] = useState(false);
  const [isSecondInputAdded, setIsSecondInputAdded] = useState(false);
  const [resourceInput, setResourceInput] = useState("");
  const [resourceInput2, setResourceInput2] = useState("");
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
      // Ma’lumotlarni oʻrnatish
      const oraganizations = Array.isArray(data) ? data : [];
      setMediaItems(oraganizations);

      // items va items1 ni yangilash
      setItems(oraganizations);
    }
  }, [data]);

  const onFinish = (fieldsValue) => {
    let resource = `${resourceInput}, telefon: ${fieldsValue.resource[0].value}, televizor: ${fieldsValue.resource[1].value}, ${resourceInput2}`;
    let licenseValue = "";

    if (radioValue === "ha" && fieldsValue.license.length > 0) {
      licenseValue = fieldsValue.license[0].value; // "ha" boʻlsa, birinchi input qiymati yuboriladi
    } else {
      licenseValue = "yoʻq"; // "yoʻq" boʻlsa, "yoʻq" text yuboriladi
    }

    let qualificationInfo = "";

    if (
      radioValueQualificationInfo === "ha" &&
      fieldsValue.qualificationInfo.length > 0
    ) {
      qualificationInfo = fieldsValue.qualificationInfo[0].value; // "ha" boʻlsa, birinchi input qiymati yuboriladi
    } else {
      qualificationInfo = "yoʻq"; // "yoʻq" boʻlsa, "yoʻq" text yuboriladi
    }
    let room = "";

    if (radioValueRoom === "ha") {
      room = "ha"; // "yoʻq" boʻlsa, "yoʻq" text yuboriladi
    } else {
      room = fieldsValue.room[0].value; // "ha" boʻlsa, birinchi input qiymati yuboriladi
    }

    let departmentOrganisation = "";

    if (
      radioValueDepartmentOrganisation === "ha" &&
      fieldsValue.departmentOrganisation.length > 0
    ) {
      departmentOrganisation = fieldsValue.departmentOrganisation[0].value; // "ha" boʻlsa, birinchi input qiymati yuboriladi
    } else {
      departmentOrganisation = "yoʻq"; // "yoʻq" boʻlsa, "yoʻq" text yuboriladi
    }

    let businessTrip = "";

    if (
      radioValueBusinessTrip === "ha" &&
      fieldsValue.businessTrip.length > 0
    ) {
      businessTrip = fieldsValue.businessTrip[0].value; // "ha" boʻlsa, birinchi input qiymati yuboriladi
    } else {
      businessTrip = "yoʻq"; // "yoʻq" boʻlsa, "yoʻq" text yuboriladi
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
      resource: resource,
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
        <div className=" md:hidden shadow-xl px-2 py-4">
          <img src={logo} alt="pressa.edu.uz" className="w-[50%]" />
        </div>
        <div className="md:ms-[0px] w-full">
          <div className="container w-[90%] mx-auto  ">
            <Steps
              current={current}
              // items={items}
              className="md:w-[70%] mx-auto md:py-2 pt-6"
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
                    Matbuot kotibining shaxsiy ma’lumotlari
                  </h2>
                  <p className="mt-1 text-md leading-6 text-gray-600 dark:text-gray-400">
                    Har bir matbuot kotibi oʻz ma’lumotlarini kiritishi kerak!
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
                      label="Tug‘ilgan sanasi"
                      {...config}
                      className=""
                    >
                      <DatePicker className="w-full py-2" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="phone"
                      label="Telefon raqami va Telegram"
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
                      label="Jinsi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Tegishlisini tanlang"
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
                      label="Yashash viloyati"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Manzilni tanlang"
                        className="h-[41px]"
                      >
                        <Option value="Toshkent" className="">
                          Toshkent
                        </Option>
                        <Option value="Samarqand">Samarqand</Option>
                        <Option value="Jizzax">Jizzax</Option>
                        <Option value="Farg‘ona">Farg‘ona</Option>
                        <Option value="Andijon">Andijon</Option>
                        <Option value="Namangan">Namangan</Option>
                        <Option value="Qashqadaryo">Qashqadaryo</Option>
                        <Option value="Surxondaryo">Surxondaryo</Option>
                        <Option value="Xorazm">Xorazm</Option>
                        <Option value="Buxoro">Buxoro</Option>
                        <Option value="Navoiy">Navoiy</Option>
                        <Option value="Qoraqalpogiston">
                          Qoraqalpog‘iston respublikasi
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="specialities"
                      label="Ilmiy darajani belgilash"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos, ilmiy darajangizni qoʻshing!",
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
                                    placeholder="Darajangizni belgilang"
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
                                    placeholder="Yoʻnalish/Mutaxassislik/Ixtisoslik"
                                    autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                                    onKeyDown={(e) => {
                                      if (e.shiftKey && e.key === "Enter") {
                                        e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga oʻtkazadi
                                        e.target.value += "\n"; // Kursorni yangi qatorga oʻtkazadi
                                      }
                                    }}
                                    style={{}}
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
                                className="py-2"
                              >
                                Qoʻshish
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Upload
                      action={`${ip}/employee/settings/upload-photo`}
                      listType="picture"
                      beforeUpload={beforeUpload} // Uploaddan oldin JPG yoki PNG formatini tekshirish
                      headers={{
                        Authorization: `${token}`, // Headerlarda tokenni qoʻshamiz
                      }}
                      enctype="multipart/form-data"
                      name="photo"
                      className="w-full"
                      onChange={(info) => {
                        if (info.file.status === "done") {
                          message.success(`${info.file.name} yuklandi.`);
                          console.log(
                            "Muvaffaqqiyatli yuklandi:",
                            info.file.response
                          );
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
                          Rasmni yuklash (JPG yoki PNG)
                        </label>
                        <Button
                          type="bg-[#73d13d]"
                          icon={<UploadOutlined />}
                          className="w-full bg-inherit text-[#333] border border-[#D9D9D9] hover:text-[#4CA852] hover:border-[#4CA852]"
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
                    Matbuot kotibining umumiy ma’lumotlari
                  </h2>
                  <p className="mt-1 text-md leading-6 text-gray-600 dark:text-gray-400">
                    Har bir matbuot kotibi oʻz ma’lumotlarini kiritishi kerak!
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
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full h-[41px] rounded-md border-0 py-0 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                        placeholder="Tegishlisini tanlang"
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
                                placeholder="Boshqa boʻlsa kiriting!"
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
                                Qoʻshish
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
                      label="Ishga qabul qilingan sanasi"
                      {...config}
                      className=""
                    >
                      <DatePicker className="w-full py-2" />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="license"
                      label="AOKAdan attestatsiyadan oʻtganligi (agar ha boʻlsa qachon,
                      guvohnoma raqami)"
                      rules={[
                        {
                          required: true,
                          message:
                            "Iltimos attestatsiyadan oʻtganligini kiriting!",
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
                                  setRadioValue(e.target.value); // Radio qiymatini saqlab qoʻyamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha boʻlsa input qoʻshiladi
                                  } else {
                                    remove(0); // Yoʻq boʻlsa inputni olib tashlaymiz
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
                      seminarlarida ishtirok etganligi (agar ha boʻlsa qachon, qayerda)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
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
                                  ); // Radio qiymatini saqlab qoʻyamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha boʻlsa input qoʻshiladi
                                  } else {
                                    remove(0); // Yoʻq boʻlsa inputni olib tashlaymiz
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
                      label="Shtatdagi oʻrni"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos shtatdagi oʻrni kiriting!",
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
                                      message: "Tegishlisini tanlang",
                                    },
                                  ]}
                                  className="col-span-1 mb-1"
                                >
                                  <Select
                                    placeholder="Tegishlisini tanlang"
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
                                    placeholder="Tegishlisini tanlang"
                                    className="h-[41px]"
                                  >
                                    <Option value="asosiy" className="">
                                      Asosiy
                                    </Option>
                                    <Option value="oʻrindosh">oʻrindosh</Option>
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
                                className="py-2"
                              >
                                Qoʻshish
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
                      label="Rektorning axborot siyosati masalalari boʻyicha
                      maslahatchisi etib belgilanganligi (Asos hujjat raqami)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                        onKeyDown={(e) => {
                          if (e.shiftKey && e.key === "Enter") {
                            e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga oʻtkazadi
                            e.target.value += "\n"; // Kursorni yangi qatorga oʻtkazadi
                          }
                        }}
                        style={{}}
                        // className="h-[41px] inline-block"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="skills"
                      label="Matbuot kotibining kasbiy va qoʻshimcha kompetensiyasi
                      (siz nima qilolasiz)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                        onKeyDown={(e) => {
                          if (e.shiftKey && e.key === "Enter") {
                            e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga oʻtkazadi
                            e.target.value += "\n"; // Kursorni yangi qatorga oʻtkazadi
                          }
                        }}
                        style={{}}
                        // className="h-[41px] inline-block"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="room"
                      label="Matbuot boʻlimi uchun alohida xona ajratilganligi (yoʻq
                      boʻlsa qaysi boʻlim bilan birga oʻtiradi)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
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
                                    placeholder="Qaysi boʻlim birga oʻtiradi"
                                    autoSize={{ minRows: 1, maxRows: 5 }}
                                    style={{
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
                                  setRadioValueRoom(e.target.value); // Radio qiymatini saqlab qoʻyamiz
                                  if (e.target.value === "ha") {
                                    remove(0); // Yoʻq boʻlsa inputni olib tashlaymiz
                                  } else {
                                    add(); // Ha boʻlsa input qoʻshiladi
                                  }
                                }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3 ">
                    <Form.Item
                      name="averageSalary"
                      label="Oxirgi bir yillik oylik maoshining oʻrtacha miqdori
                      (UzASBO tizimi yoki my.gov.uz orqali olingan ma’lumot fayl
                      shaklida taqdim etiladi)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <div className="flex gap-1 ">
                        <Upload
                          action={`${ip}/employee/average-salary-upload`}
                          headers={{
                            Authorization: `${token}`, // Headerlarda tokenni qoʻshamiz
                          }}
                          name="averageSalaryFile"
                          className="w-1/2"
                          onChange={(info) => {
                            if (info.file.status === "done") {
                              message.success(`${info.file.name} yuklandi.`);
                              console.log(
                                "Muvaffaqqiyatli yuklandi:",
                                info.file.response
                              );
                            } else if (info.file.status === "error") {
                              message.error(`${info.file.name} yuklanmadi.`);
                              console.log(
                                "Yuklashda xato:",
                                info.file.response
                              );
                            }
                          }}
                        >
                          <div className="flex flex-col gap-2">
                            <Button
                              type="bg-[#73d13d]"
                              icon={<UploadOutlined />}
                              className="w-full bg-inherit text-[#333] border border-[#D9D9D9] hover:text-[#4CA852] hover:border-[#4CA852]"
                            >
                              Yuklash
                            </Button>
                          </div>
                        </Upload>
                        <Input.TextArea
                          autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                          onKeyDown={(e) => {
                            if (e.shiftKey && e.key === "Enter") {
                              e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga oʻtkazadi
                              e.target.value += "\n"; // Kursorni yangi qatorga oʻtkazadi
                            }
                          }}
                          className="w-1/2 inline-block"
                        />
                      </div>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      // name="departmentOrganisation"
                      label="Alohida Matbuot/axborot xizmati boʻlimi tashkil
                      etilganligi (boʻlsa unda nechta shtat bor yoki nechta
                      boshqa boʻlimdan jalb qilingan)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
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
                                  ); // Radio qiymatini saqlab qoʻyamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha boʻlsa input qoʻshiladi
                                  } else {
                                    remove(0); // Yoʻq boʻlsa inputni olib tashlaymiz
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
                      label="Matbuot kotibini chet el xizmat safarlariga yuborilganligi
                      (agar ha boʻlsa qachon, qayerga)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
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
                                  setRadioValueBusinessTrip(e.target.value); // Radio qiymatini saqlab qoʻyamiz
                                  if (e.target.value === "ha") {
                                    add(); // Ha boʻlsa input qoʻshiladi
                                  } else {
                                    remove(0); // Yoʻq boʻlsa inputni olib tashlaymiz
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
                    nomi, modeli;// telefon: bor/yoʻq; televizor: bor/yoʻq;
                    kompyuter jamlamasi soni va nechtasi hujjat bilan
                    ishlash uchun, nechtasi montaj uchun; Qoʻshimcha izoh) */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="resource"
                      label="Moddiy-texnik bazasining holati 
                          (Kamera soni va uning nomi, modeli)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      {/* <Input /> */}
                      <Form.List name="resource">
                        {(fields, { add, remove }) => (
                          <>
                            <Form.Item>
                              <Input
                                placeholder="namunali/yaxshi/qoniqarli/qoniqarsiz"
                                onChange={(e) => {
                                  // Inputning uzunligini tekshirish
                                  setResourceInput(e.target.value);
                                  if (e.target.value.length > 3 && !isAdded) {
                                    add(); // Radio tugma qoʻshish
                                    setIsAdded(true);
                                    setIsRadioAdd(false); // Radioga yangi element qoʻshish uchun tayyorlanadi
                                    setIsSecondRadioAdded(false); // Ikkinchi radio uchun flagni yana false qilish
                                  } else if (e.target.value.length < 4) {
                                    remove(0); // Input 4 harfdan kam boʻlsa, radio tugmani olib tashlash
                                    setIsAdded(false);
                                  }
                                }}
                              />
                            </Form.Item>

                            {fields.map(
                              ({ key, name, ...restField }, index) => (
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
                                    className="col-span-1 mt-[-10px]"
                                    label={
                                      index === 0
                                        ? "Telefon bor yoʻqligi"
                                        : "Televizor bor yoʻqligi"
                                    }
                                  >
                                    <Radio.Group
                                      block
                                      options={optionsAOKA}
                                      optionType="button"
                                      buttonStyle="solid"
                                      onChange={(e) => {
                                        // Radio tugmasi tanlanganligini tekshirish
                                        if (e.target.value && !isRadioAdd) {
                                          add(); // Yangi radio tugma qoʻshish
                                          setIsRadioAdd(true);
                                        } else if (
                                          e.target.value && // Ikkinchi radio tugma tanlanganligini tekshirish
                                          !isSecondRadioAdded // Yangi input faqat bir marta qoʻshiladi
                                        ) {
                                          setIsSecondRadioAdded(true);
                                          setIsSecondInputAdded(true);
                                        }
                                      }}
                                    />
                                  </Form.Item>

                                  <MinusCircleOutlined
                                    onClick={() => remove(name)}
                                    className="absolute z-10 top-8 right-1"
                                  />
                                </Space>
                              )
                            )}
                            {isSecondRadioAdded && isSecondInputAdded ? (
                              <Form.Item
                                label="Kompyuterlar soni, nechtasi hujjat bilan
                    ishlash uchun, nechtasi montaj uchun; Qoʻshimcha izoh"
                              >
                                <Input
                                  onChange={(e) => {
                                    setResourceInput2(e.target.value);
                                  }}
                                />
                                <MinusCircleOutlined
                                  onClick={() => setIsSecondRadioAdded(false)}
                                  className="absolute z-10 top-3 right-1"
                                />
                              </Form.Item>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* form Steps */}

              <div className="md:mt-[24px] md:mb-[40px] mb-6" id="nextPrev">
                {current > 0 && (
                  <Button
                    style={{
                      margin: "2px 8px",
                    }}
                    onClick={() => prev()}
                    className="px-10 py-6 rounded-xl shadow-lg text-[#4CA852] text-[16px] nextPrevBtn"
                  >
                    Oldingi
                  </Button>
                )}
                <Toast ref={toast} />
                {current === steps.length - 1 && (
                  <Button
                    htmlType="submit"
                    className="float-right px-10 py-6 rounded-xl shadow-lg bg-[#4CA852] text-white text-[16px] nextPrevBtn"
                  >
                    Yuborish
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button
                    onClick={() => next()}
                    className="float-right px-14 py-6 rounded-xl shadow-lg bg-[#4CA852] text-white text-[16px]  nextPrevBtn"
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
