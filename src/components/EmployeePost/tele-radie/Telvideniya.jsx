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
import { useNavigate } from "react-router-dom";
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

export default function Televediniye1() {
  // const queryClient = useQueryClient();
  const { Option } = Select;
  const [mediaItems, setMediaItems] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const addPost = useMutation(
    (values) =>
      oavIV.addPost(values, { headers: { Authorization: `${token}` } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        setTimeout(() => {
          navigate("/televediniye_dashboard");
        }, 300);
      },
      onError: () => {
        showError();
        console.log("error mutation");
      },
    }
  );

  const { data, isLoading, error } = useQuery(
    ["tv", "/televediniye"],
    () => oavIV.tv("/televediniye"),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      // Ma’lumotlarni oʻrnatish
      const media = Array.isArray(data?.media) ? data.media : [];
      const shows = Array.isArray(data?.shows) ? data.shows : [];
      setMediaItems(media);
      setShowItems(shows);

      // items va items1 ni yangilash
      setItems(media);
      setItems1(shows);
    }
  }, [data]);

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      time: fieldsValue["time"],
      showedMedia: fieldsValue["showedMedia"],
      type: "televediniye",
    };
    addPost.mutate(values);
  };
  // Submit bosilganda ishlaydigan Funksiya

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

  // Sellect Dastur Nomi
  const [items1, setItems1] = useState(showItems);
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

  // Sellect Dastur Nomi
  const [items2, setItems2] = useState([
    "Rektor",
    "Prorektor",
    "Matbuot kotibi",
    "Boshqarma boshlig‘i",
    "Boʻlim boshlig‘i",
    "Dekan",
    "Dekan oʻrinbosari",
    "Kafedra mudiri",
  ]);
  const [name2, setName2] = useState("");
  const inputRef2 = useRef(null);
  const onNameChange2 = (event) => {
    setName2(event.target.value);
  };
  const addItem2 = (e) => {
    e.preventDefault();
    setItems2([...items2, name2 || `New item ${index++}`]);
    setName2("");
    setTimeout(() => {
      inputRef2.current?.focus();
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

  if (isLoading)
    return (
      <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center">
        <Flex>
          <Spin size="large" />
        </Flex>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

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
                    Faoliyatga doir axborotni OAV, Internet saytlar va ijtimoiy
                    tarmoqlar <br /> orqali yoritilishi.{" "}
                    <span className="uppercase">Televedeniye</span>
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="showedUser"
                      label="Koʻrsatuvda qatnashgan OTM vakilining F.I.O"
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
                      name="stuff"
                      label="Lavozimi"
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
                        dropdownRender={(menu2) => (
                          <>
                            {menu2}
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
                                ref={inputRef2}
                                value={name2}
                                onChange={onNameChange2}
                                onKeyDown={(e) => e.stopPropagation()}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addItem2}
                              >
                                Qoʻshish
                              </Button>
                            </Space>
                          </>
                        )}
                        options={items2.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="channel"
                      label="Telekanal nomi"
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
                      name="showedMedia"
                      label="Dastur nomi"
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
                      name="time"
                      label="Tadbir oʻtkazilgan sanasi va vaqti"
                      {...config}
                      className=""
                    >
                      <DatePicker
                        showTime={{ format: "HH:mm" }} // Sekundsiz faqat soat va daqiqa
                        format="YYYY-MM-DD HH:mm" // Umumiy format, sana + vaqt
                        className="w-full py-2"
                      />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="scale"
                      label="Miqyosi "
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Tegishlisini tanlang"
                        className="h-[41px]"
                      >
                        <Option value="Respublika">Respublika</Option>
                        <Option value="Hududiy">Hududiy</Option>
                        <Option value="Xorijiy">Xorijiy</Option>
                        <Option value="Otm">OTM</Option>
                      </Select>
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
