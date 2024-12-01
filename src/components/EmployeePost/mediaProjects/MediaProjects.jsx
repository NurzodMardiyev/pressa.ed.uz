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
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
let index = 0;

export default function MediaProjects() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const addMediaProjectt = useMutation(
    (values) =>
      oavIV.media_event(values, { headers: { Authorization: `${token}` } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        if (location.pathname === "/superadminpanel/mediaprojects") {
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
    const values = {
      ...fieldsValue,
    };
    addMediaProjectt.mutate(values);
  };
  // Submit bosilganda ishlaydigan Funksiya

  // Sellect Channel
  const [items, setItems] = useState([
    "Televediniye",
    "Radio",
    "Gazeta/jurnal",
    "Internet saytlari",
    "Telegram",
    "Instagram",
    "Youtube",
    "Facebook",
  ]);
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

  // Sellect Dastur Nomi
  const [items1, setItems1] = useState([
    "Kunlik",
    "Haftalik",
    "Oylik",
    "Choraklik",
    "Yillik",
  ]);
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
                    Axborot xizmati tomonidan yoʻlga qoʻyilgan medialoyihalar
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="name"
                      label="Medialoyiha nomi"
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
                      name="description"
                      label="Loyiha tavsifi"
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
                      name="massMedia"
                      label="Loyiha platformasi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                        placeholder="Tegishlisini tanlang"
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
                        options={items.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="period"
                      label="Davriyligi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
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
                                placeholder="Bu yerga kiriting"
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
                                Qoʻshish
                              </Button>
                            </Space>
                          </>
                        )}
                        options={items1.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="link"
                      label="Havolasi "
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Havolasi!",
                        },
                        {
                          type: "url",
                          warningOnly: true,
                        },
                      ]}
                    >
                      <Input placeholder="https://kun.uz" id="warning" />
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
