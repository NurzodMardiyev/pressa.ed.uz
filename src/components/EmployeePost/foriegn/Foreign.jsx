import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Spin,
} from "antd";
import "../../../App.css";
import { oavIV } from "../../../feature/queryApi";
import { Toast } from "primereact/toast";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
let index = 0;
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Iltimos Inputga qiymat kiriting!",
    },
  ],
};

export default function Foreign() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const addLavel = useMutation(
    (values) =>
      oavIV.foreign(values, {
        headers: { Authorization: `${token}` },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        if (location.pathname === "/superadminpanel/foreign") {
          setTimeout(() => {
            navigate("/superadminpanel/dashboard");
          }, 300);
        } else {
          setTimeout(() => {
            navigate("/dashboard");
          }, 300);
        }
      },
      onError: () => {
        showError();
        console.log("error mutation");
      },
    }
  );

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const formattedTvChannels = {};
    fieldsValue.mediaNameAndLink.forEach((item) => {
      formattedTvChannels[item.key] = item.value; // { textValue1: textValue2 }
    });

    const typeMediaSocial = fieldsValue.typeMediaSocial.join(", ");
    const illumination = fieldsValue.illumination.join(", ");

    const values = {
      ...fieldsValue,
      mediaNameAndLink: formattedTvChannels,
      publishedDate: fieldsValue["publishedDate"].format("YYYY-MM-DD"),
      typeMediaSocial: typeMediaSocial,
      illumination: illumination,
    };
    console.log("Received values of form: ", values);
    addLavel.mutate(values);
  };
  // Submit bosilganda ishlaydigan Funksiya

  // Sellect Channel

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
      summary: "Xato",
      detail: `Toʻg‘ri kiritganingizga e'tibor bering! `,
      life: 0,
    });
  };

  return (
    <div>
      <div className="md:flex">
        <div className=" w-full">
          <div className="container w-[95%] mx-auto  ">
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
              <div className={`w-full  `}>
                <div>
                  {location.pathname === "/superadminpanel/foreign" ? (
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                      Xorijiy OAVlarida Vazirlik faoliyatiga doir E’lon qilingan
                      materiallar
                    </h2>
                  ) : (
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                      Xorijiy OAVlarida OTM faoliyatiga doir E’lon qilingan
                      materiallar
                    </h2>
                  )}
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="title"
                      label="E’lon qilingan material sarlavhasi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-2" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="illumination"
                      label="Yoritish shakli"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Tegishlisini tanlang"
                        // defaultValue={[]}
                        options={[
                          {
                            label: "Reportaj",
                            value: "Reportaj",
                          },
                          {
                            label: "Ko‘rsatuv",
                            value: "Ko‘rsatuv",
                          },
                          {
                            label: "Tok-shou",
                            value: "Tok-shou",
                          },
                          {
                            label: "Intervyu",
                            value: "Intervyu",
                          },
                          {
                            label: "Podkast",
                            value: "Podkast",
                          },
                          {
                            label: "Maqola",
                            value: "Maqola",
                          },
                          {
                            label: "Videorolik",
                            value: "Videorolik",
                          },
                          {
                            label: "Xabar",
                            value: "Xabar",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="typeMediaSocial"
                      label="E’lon qilingan OAV/Ijtimoiy tarmoq turi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Tegishlisini tanlang"
                        // defaultValue={[]}
                        options={[
                          {
                            label: "Televideniye",
                            value: "Televideniye",
                          },
                          {
                            label: "Radio",
                            value: "Radio",
                          },
                          {
                            label: "Gazeta/jurnallar",
                            value: "Gazeta/jurnallar",
                          },
                          {
                            label: "Internet saytlari",
                            value: "Internet saytlari",
                          },
                          {
                            label: "Telegram",
                            value: "Telegram",
                          },
                          {
                            label: "Instagram",
                            value: "Instagram",
                          },
                          {
                            label: "Youtube",
                            value: "Youtube",
                          },
                          {
                            label: "Facebook",
                            value: "Facebook",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="mediaNameAndLink"
                      label="Yoritilgan OAV nomi va havolasii!"
                      style={{ marginBottom: 0 }}
                      rules={[
                        {
                          required: true,
                          message: "OAV nomi!",
                        },
                      ]}
                    >
                      <Form.List name="mediaNameAndLink">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{ marginBottom: -10 }}
                                align="baseline"
                                className="w-full grid grid-cols-2 relative items-center"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "key"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "OAV nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="OAV nomini kiriting!"
                                    autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                                    onKeyDown={(e) => {
                                      if (e.shiftKey && e.key === "Enter") {
                                        e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga oʻtkazadi
                                        e.target.value += "\n"; // Kursorni yangi qatorga oʻtkazadi
                                      }
                                    }}
                                    style={{ height: 41 }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing url direction",
                                    },
                                    {
                                      type: "url",
                                      warningOnly: true,
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Input.TextArea
                                    placeholder="havolasi"
                                    autoSize={{ minRows: 1, maxRows: 5 }} // Kursor avtomatik yangi qatorga tushadi
                                    onKeyDown={(e) => {
                                      if (e.shiftKey && e.key === "Enter") {
                                        e.preventDefault(); // Bu "shift + enter" ni ushlab qoladi, lekin kursorni yangi qatorga oʻtkazadi
                                        e.target.value += "\n"; // Kursorni yangi qatorga oʻtkazadi
                                      }
                                    }}
                                    style={{ height: 41 }}
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
                      name="publishedDate"
                      label="Yoritilgan sanasi"
                      {...config}
                      className=""
                    >
                      <DatePicker className="w-full py-2" />
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* form input group step2 */}

              {/* form Steps */}
              <div className="md:mt-[30px] md:mb-[40px] mb-6">
                <Toast ref={toast} />
                <Button
                  htmlType="submit"
                  className="float-right px-10  py-6 rounded-full shadow-lg bg-[#4CA852] text-white text-[16px]"
                >
                  Yuborish
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
