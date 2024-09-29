import React, { useRef, useState } from "react";
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
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { Toast } from "primereact/toast";

const IP = "10.10.1.166";

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

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
  const { Option } = Select;
  const queryClient = useQueryClient();
  const toast = useRef(null);

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

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      birthday: fieldsValue["birthday"].format("YYYY-MM-DD"),
      entryDate: fieldsValue["entryDate"].format("YYYY-MM-DD"),
    };

    if (values.specialities) {
      values.specialities = values.specialities.reduce((acc, item) => {
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
  // const items = steps.map((item) => ({
  //   key: item.title,
  //   title: item.title,
  // }));

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  const showError = (data) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `${data}`,
      life: 3000,
    });
  };

  // End step commands

  // Radio buttons value
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

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
                      label="Jindsingizni kiriting!"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos jinsingizni kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="select your gender"
                        className="h-[41px]"
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
                      // defaultFileList={fileList}
                      headers={{
                        Authorization: `${token}`, // Agar token yoki boshqa kerakli headerlar bo'lsa qo'shing
                      }}
                      enctype="multipart/form-data"
                      name="photo"
                      className="w-full"
                      onChange={(info) => {
                        if (info.file.status === "done") {
                          message.success(
                            `${info.file.name} uploaded successfully.`
                          );
                          console.log("Upload done:", info.file.response);
                        } else if (info.file.status === "error") {
                          message.error(`${info.file.name} upload failed.`);
                          console.log("Upload failed:", info.file.response);
                        }
                      }}
                    >
                      <div className="w-full flex flex-col gap-2">
                        <label htmlFor="" className="flex items-center gap-1">
                          <span className="text-[17px] text-red-500  inline-block">
                            *
                          </span>{" "}
                          Rasmingizni kiriting
                        </label>
                        <Button
                          type="bg-[#73d13d]"
                          icon={<UploadOutlined />}
                          className="w-full bg-[#4CA852] h-[41px] text-[#fff]"
                        >
                          Rasmingizni kiriting!
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
                  <div className="sm:col-span-3">
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
                  </div>
                  <div className="sm:col-span-3">
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
                  </div>
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
                      name="license"
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
                      name="qualificationInfo"
                      label="AOKA yoki OTFIVning malaka oshirish kurslari yoki
                      seminarlarida ishtirok etganligi (qachon, qayerda)"
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
                      name="workType"
                      label="Shtatdagi o'rni"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos shtatdagi o'rni kiriting!",
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
                      name="room"
                      label="Matbuot bo'limi uchun alohida xona ajratilganligi (ha/yo'q
                      bo'lsa qaysi bo'lim bilan birga o'tiradi)"
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
                      name="departmentOrganisation"
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
                      name="businessTrip"
                      label="Matbuot kotibini xorijga xizmat safarlariga yuborilganligi
                      (qachon, qayerga)"
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

                  {/* Moddiy-texnik bazasining holati  (kamera soni va uning
                    nomi, modeli;// telefon: bor/yo'q; televizor: bor/yo'q;
                    kompyuter jamlamasi soni va nechtasi hujjat bilan
                    ishlash uchun, nechtasi montaj uchun; Qo'shimcha izoh) */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="resource"
                      label={
                        <>
                          Moddiy-texnik bazasining holati <br />
                          (Kamera soni va uning nomi, modeli; telefon: bor/yo'q;
                          televizor: bor/yo'q; kompyuter jamlamasi soni va
                          nechtasi hujjat bilan ishlash uchun, nechtasi montaj
                          uchun; Qo'shimcha izoh)
                        </>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input.TextArea autoSize={{ minRows: 1, maxRows: 5 }} />
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
