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

export default function MatbuotAnjumaniJS() {
  // const [showItems, setShowItems] = useState([]);
  const toast = useRef(null);
  const { Option } = Select;
  // channels
  const navigate = useNavigate();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const addPostMatbuot = useMutation(
    (values) =>
      oavIV.eventMedia(values, { headers: { Authorization: `${token}` } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        // reset();
        setTimeout(() => {
          navigate("/matbuot_dashboard");
        }, 300);
      },
      onError: () => {
        showError();
        console.log("error mutation");
      },
    }
  );

  // const { data, isLoading, error } = useQuery(
  //   ["eventMediaGetChannel"],
  //   () => oavIV.eventMediaGetChannel("eventMediaGetChannel"),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const {
    data: dataAll,
    isLoading,
    error,
  } = useQuery(["eventMediaAll"], () => oavIV.eventMediaAll());

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dateOfEvent: fieldsValue["dateOfEvent"],
    };

    if (values.tv_channels) {
      values.tv_channels = values.tv_channels.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }
    if (values.radio_channels) {
      values.radio_channels = values.radio_channels.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }

    if (values.newspapers) {
      values.newspapers = values.newspapers.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }

    if (values.messengers) {
      values.messengers = values.messengers.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }
    if (values.web_sites) {
      values.web_sites = values.web_sites.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
    }
    console.log("Received values of form: ", values);
    addPostMatbuot.mutate(values);
  };

  const [items1, setItems1] = useState([]);
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

  const [items3, setItems3] = useState([]);
  const [name3, setName3] = useState("");
  const inputRef3 = useRef(null);
  const onNameChange3 = (event) => {
    setName3(event.target.value);
  };
  const addItem3 = (e) => {
    e.preventDefault();
    setItems3([...items3, name3 || `New item ${index++}`]);
    setName3("");
    setTimeout(() => {
      inputRef3.current?.focus();
    }, 0);
  };

  const [items4, setItems4] = useState([]);
  const [name4, setName4] = useState("");
  const inputRef4 = useRef(null);
  const onNameChange4 = (event) => {
    setName4(event.target.value);
  };
  const addItem4 = (e) => {
    e.preventDefault();
    setItems4([...items4, name4 || `New item ${index++}`]);
    setName4("");
    setTimeout(() => {
      inputRef4.current?.focus();
    }, 0);
  };

  const [items5, setItems5] = useState([]);
  const [name5, setName5] = useState("");
  const inputRef5 = useRef(null);
  const onNameChange5 = (event) => {
    setName5(event.target.value);
  };
  const addItem5 = (e) => {
    e.preventDefault();
    setItems5([...items5, name5 || `New item ${index++}`]);
    setName5("");
    setTimeout(() => {
      inputRef5.current?.focus();
    }, 0);
  };

  const [items6, setItems6] = useState([]);
  const [name6, setName6] = useState("");
  const inputRef6 = useRef(null);
  const onNameChange6 = (event) => {
    setName6(event.target.value);
  };
  const addItem6 = (e) => {
    e.preventDefault();
    setItems6([...items6, name6 || `New item ${index++}`]);
    setName6("");
    setTimeout(() => {
      inputRef6.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (dataAll) {
      // Ma’lumotlarni oʻrnatish

      Array.isArray(
        dataAll?.body.map((item) => {
          if (item.postType === "televediniye") {
            setItems1(item.media);
          } else if (item.postType === "radio") {
            setItems3(item.media);
          } else if (item.postType === "gazeta") {
            setItems4(item.shows);
          } else if (item.postType === "messenger") {
            setItems5(item.shows);
          } else if (item.postType === "internet_sites") {
            // console.log(item);
            setItems6(item.shows);
          } else {
            return "";
          }
        })
      );
    }
  }, [dataAll]);

  // Success boʻlganda ishlidigan funksiya
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
                    Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar. <br />{" "}
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="eventName"
                      label="Tadbir nomi"
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
                      name="type"
                      label="Tadbir turi "
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
                        <Option value="Matbuot_anjumani">
                          Matbuot anjumani
                        </Option>
                        <Option value="Brifing">Brifing</Option>
                        <Option value="Press_tur">Press tur</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="stuffs"
                      label="Rahbar xodimlarning ishtiroki"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Tegishlisini tanlang"
                        // defaultValue={[]}
                        options={[
                          { label: "Rektor", value: "Rektor" },
                          { label: "Prorektor", value: "Prorektor" },
                          { label: "Matbuot kotibi", value: "Matbuot kotibi" },
                          {
                            label: "Boshqarma boshlig‘i",
                            value: "Boshqarma boshlig‘i",
                          },
                          {
                            label: "Boʻlim boshlig‘i",
                            value: "Boʻlim boshlig‘i",
                          },
                          { label: "Dekan", value: "Dekan" },
                          {
                            label: "Dekan oʻrinbosari",
                            value: "Dekan oʻrinbosari",
                          },
                          { label: "Kafedra mudiri", value: "Kafedra mudiri" },
                        ]}
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="tv_channels"
                      label="Telekanal nomi va havolasi"
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <Form.List name="tv_channels">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: -10,
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
                                      message: "Telekanal nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
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
                                            ref={inputRef1}
                                            value={name1}
                                            onChange={onNameChange1}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
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
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing url  direction",
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

                  {/* Radio Channels */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="radio_channels"
                      label="Radiokanal nomi va havolasi"
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Form.List name="radio_channels">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: -10,
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
                                      message: "Radiokanal nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Select
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full h-[41px]  rounded-md border-0 py-0 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="Tegishlisini tanlang"
                                    dropdownRender={(menu3) => (
                                      <>
                                        {menu3}
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
                                            ref={inputRef3}
                                            value={name3}
                                            onChange={onNameChange3}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem3}
                                          >
                                            Qoʻshish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={items3.map((item) => ({
                                      label: item,
                                      value: item,
                                    }))}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing url  direction",
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

                  {/* gazeta va jurnallar Channels */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="newspapers"
                      label="Gazeta, jurnal nomi va havolasi"
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Form.List name="newspapers">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: -10,
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
                                      message: "Gazeta, jurnal nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Select
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full  h-[41px]  rounded-md border-0 py-0 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="Tegishlisini tanlang"
                                    dropdownRender={(menu4) => (
                                      <>
                                        {menu4}
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
                                            ref={inputRef4}
                                            value={name4}
                                            onChange={onNameChange4}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem4}
                                          >
                                            Qoʻshish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={items4.map((item) => ({
                                      label: item,
                                      value: item,
                                    }))}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing url  direction",
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

                  {/* Messangers */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="messengers"
                      label="Ijtimoiy tarmoqlar nomi va havolasi"
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Form.List name="messengers">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: -10,
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
                                      message: "Ijtimoiy tarmoqlar nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Select
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full h-[41px]  rounded-md border-0 py-0 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="Tegishlisini tanlang"
                                    dropdownRender={(menu5) => (
                                      <>
                                        {menu5}
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
                                            ref={inputRef5}
                                            value={name5}
                                            onChange={onNameChange5}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem5}
                                          >
                                            Qoʻshish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={items5.map((item) => ({
                                      label: item,
                                      value: item,
                                    }))}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing url  direction",
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

                  {/* Web sites */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="web_sites"
                      label="Veb sayt nomi va havolasi"
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Form.List name="web_sites">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  marginBottom: -10,
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
                                      message: "Web sayt nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Select
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full  h-[41px]  rounded-md border-0 py-0 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="Tegishlisini tanlang"
                                    dropdownRender={(menu6) => (
                                      <>
                                        {menu6}
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
                                            ref={inputRef6}
                                            value={name6}
                                            onChange={onNameChange6}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem6}
                                          >
                                            Qoʻshish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={items6.map((item) => ({
                                      label: item,
                                      value: item,
                                    }))}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing url  direction",
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

                  {/* bular oxirida */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="dateOfEvent"
                      label="Tadbir oʻtkazilgan sanasi va vaqti"
                      {...config}
                    >
                      <DatePicker
                        showTime={{ format: "HH:mm" }} // Sekundsiz faqat soat va daqiqa
                        format="YYYY-MM-DD HH:mm" // Umumiy format, sana + vaqt
                        className="w-full py-2"
                      />
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
