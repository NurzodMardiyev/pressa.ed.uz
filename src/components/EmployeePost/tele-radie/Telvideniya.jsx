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
      message: "Please select time!",
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
        // setTimeout(() => {
        //   navigate("/dashboard");
        // }, 300);
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
      // Ma'lumotlarni o'rnatish
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
    console.log("Received values of form: ", values);
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
                    <span className="uppercase">Televediniya</span>
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="showedUser"
                      label="Ko'rsatuvda qatnashgan OTM vakili F.I.O"
                      rules={[
                        {
                          required: true,
                          message:
                            "Iltimos Televediniyega chiqishini kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-1.5" />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="channel"
                      label="TV nomi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos TV nomini kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[37px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
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
                          message: "Iltimos Dastur nomini kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[37px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
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
                                placeholder="Please enter item"
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
                                Add item
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
                      label="Chiqqan sanasi va vaqti"
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
                      label="Miqyosi (respublika yoki hududiy telekanal)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos miqyosini kiriting!",
                        },
                      ]}
                    >
                      <Select placeholder="select scale" className="h-[41px]">
                        <Option value="Respublika">Respublika</Option>
                        <Option value="Hududiy">Hududiy</Option>
                        <Option value="Xorijiy">Xorijiy</Option>
                      </Select>
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
