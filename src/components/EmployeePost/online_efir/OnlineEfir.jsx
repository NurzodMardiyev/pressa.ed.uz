import React, { useRef, useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Select, Space } from "antd";
import "../../../App.css";
import { oavIV } from "../../../feature/queryApi";
import { Toast } from "primereact/toast";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
let index = 0;

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

export default function OnlineEfir() {
  // const queryClient = useQueryClient();
  const toast = useRef(null);
  const navigate = useNavigate();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const onlineEent = useMutation(
    (values) =>
      oavIV.online_event(values, {
        headers: { Authorization: `${token}` },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        // reset();
        setTimeout(() => {
          navigate("/dashboard");
        }, 300);
      },
      onError: () => {
        showError();
        console.log("error mutation");
      },
    }
  );

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      publishDate: fieldsValue["publishDate"],
      materialType: "Video",
    };
    console.log("Received values of form: ", values);
    onlineEent.mutate(values);
  };
  // Submit bosilganda ishlaydigan Funksiya

  const stuffs = [
    "Rektor",
    "Prorektor",
    "Matbuot kotibi",
    "Boshqarma boshlig'i",
    "Dekan",
    "Dekan o'rinbosari",
    "Kafedra mudiri",
  ];

  const messengers = ["Telegram", "Instagram", "Facebook", "YouTube"];
  // Sellect Dastur Nomi
  const [items1, setItems1] = useState(stuffs);
  const [name1, setName1] = useState("");
  const inputRef1 = useRef(null);
  const onNameChange1 = (event) => {
    setName1(event.target.value);
  };
  const addItem1 = (e) => {
    e.preventDefault();
    setItems1([...items1, name1 || `New item ${index++}`]);
    setName1("");
    setTimeout(() => {
      inputRef1.current?.focus();
    }, 0);
  };

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
      summary: "Xato",
      detail: `To'g'ri kiritganingizga e'tibor bering! `,
      life: 3000,
    });
  };

  // End step commands

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
                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                    Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli chat) lar
                    soni
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="title"
                      label="Onlayn efir/ovozli chat mavzusi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos material mavzusini kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="eventDate"
                      label="O'tkazilgan sanasi"
                      {...config}
                      className=""
                    >
                      <DatePicker
                        //showTime={{ format: "HH:mm" }} // Sekundsiz faqat soat va daqiqa
                        format="YYYY-MM-DD" // Umumiy format, sana + vaqt
                        className="w-full py-2"
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="stuffs"
                      label="OTM rahbar hodimlarining ishtiroki"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                          height: 41,
                        }}
                        placeholder="Please select"
                        defaultValue={[]}
                        options={stuffs.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="messenger"
                      label="Ijtimoiy tarmoq nomi"
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
                                placeholder="Boshqa bo'lsa kiriting!"
                                ref={inputRef1}
                                value={name1}
                                onChange={onNameChange1}
                                onKeyDown={(e) => e.stopPropagation()}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addItem1}
                              >
                                Qo'shish
                              </Button>
                            </Space>
                          </>
                        )}
                        options={messengers?.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="amount"
                      label="Ishtirokchilar soni"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        className="rounded-md"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="link"
                      label="Havolasini kiriting (http bilan boshlanishi shart!)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Havolasini kiriting!",
                        },
                        {
                          type: "url",
                          warningOnly: true,
                        },
                      ]}
                    >
                      <Input placeholder="https://kun.uz" />
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
