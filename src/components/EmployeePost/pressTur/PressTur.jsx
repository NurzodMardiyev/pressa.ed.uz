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
      message: "Please select time!",
    },
  ],
};

export default function PressTur() {
  // const [showItems, setShowItems] = useState([]);
  const toast = useRef(null);

  // channels
  const [mediaItems, setMediaItems] = useState([]);
  const [tvChannalNames, setTvChannalNames] = useState([]);
  const [radioChannal, setRadioChannal] = useState([]);
  const [newspaper, setNewspaper] = useState([]);
  const [webSite, setWebSite] = useState([]);
  const [messanger, setMessanger] = useState([]);
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
          navigate("/dashboard");
        }, 300);
      },
      onError: () => {
        showError();
        console.log("error mutation");
      },
    }
  );

  const { data, isLoading, error } = useQuery(
    ["eventMediaGetChannel"],
    () => oavIV.eventMediaGetChannel("eventMediaGetChannel"),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: dataAll } = useQuery(["eventMediaAll"], () =>
    oavIV.eventMediaAll()
  );

  useEffect(() => {
    if (data && dataAll) {
      console.log(data);
      console.log(dataAll);
      // Ma'lumotlarni o'rnatish

      const media = Array.isArray(data) ? data : [];
      const tvChananal = Array.isArray(dataAll?.body[0]?.media)
        ? dataAll?.body[0]?.media
        : [];
      const radioChannal = Array.isArray(dataAll?.body[1]?.media)
        ? dataAll?.body[1]?.media
        : [];
      const newspaper = Array.isArray(dataAll?.body[2]?.shows)
        ? dataAll?.body[2]?.shows
        : [];
      const webSite = Array.isArray(dataAll?.body[3]?.shows)
        ? dataAll?.body[3]?.shows
        : [];
      const messanger = Array.isArray(dataAll?.body[4]?.shows)
        ? dataAll?.body[4]?.shows
        : [];
      setMediaItems(media);
      setTvChannalNames(tvChananal);
      setRadioChannal(radioChannal);
      setNewspaper(newspaper);
      setWebSite(webSite);
      setMessanger(messanger);
    }
  }, [data, dataAll]);

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dateOfEvent: fieldsValue["dateOfEvent"],
      showedMedia: fieldsValue["showedMedia"],
      type: "Press_tur",
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

  // Sellect Channel
  const [itemsValue, setItemsValue] = useState(tvChannalNames);
  const [nameValue, setNameValue] = useState("");
  const inputRef_channal = useRef(null);
  const onNameChange_channal = (event) => {
    setNameValue(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItemsValue([...itemsValue, nameValue || `New item ${index++}`]);
    setNameValue("");
    setTimeout(() => {
      inputRef_channal.current?.focus();
    });
  };

  // Radio kanallar nomi uzi kiritadi
  const [items_radio, setItems_radio] = useState(radioChannal);
  const [nameValue_radio, setNameValue_radio] = useState("");
  const inputRef_radio = useRef(null);
  const onNameChange_radio = (event) => {
    setNameValue_radio(event.target.value);
  };
  const addItem_radio = (e) => {
    e.preventDefault();
    setItems_radio([...items_radio, nameValue_radio || `New item ${index++}`]);
    setNameValue_radio("");
    setTimeout(() => {
      inputRef_radio.current?.focus();
    });
  };

  // newspapers kanallar nomi uzi kiritadi
  const [items_news, setItems_news] = useState(newspaper);
  const [nameValue_news, setNameValue_news] = useState("");
  const inputRef_news = useRef(null);
  const onNameChange_news = (event) => {
    setNameValue_news(event.target.value);
  };
  const addItem_news = (e) => {
    e.preventDefault();
    setItems_news([...items_news, nameValue_news || `New item ${index++}`]);
    setNameValue_news("");
    setTimeout(() => {
      inputRef_radio.current?.focus();
    });
  };

  // newspapers kanallar nomi uzi kiritadi
  const [items_messenger, setItems_messenger] = useState(newspaper);
  const [nameValue_messenger, setNameValue_messenger] = useState("");
  const inputRef_messenger = useRef(null);
  const onNameChange_messenger = (event) => {
    setNameValue_messenger(event.target.value);
  };
  const addItem_messenger = (e) => {
    e.preventDefault();
    setItems_messenger([
      ...items_messenger,
      nameValue_messenger || `New item ${index++}`,
    ]);
    setNameValue_messenger("");
    setTimeout(() => {
      inputRef_messenger.current?.focus();
    });
  };

  // website kanallar nomi uzi kiritadi
  const [items_web_sites, setItems_web_sites] = useState(newspaper);
  const [nameValue_web_sites, setNameValue_web_sites] = useState("");
  const inputRef_web_sites = useRef(null);
  const onNameChange_web_sites = (event) => {
    setNameValue_web_sites(event.target.value);
  };
  const addItem_web_sites = (e) => {
    e.preventDefault();
    setItems_web_sites([
      ...items_web_sites,
      nameValue_web_sites || `New item ${index++}`,
    ]);
    setNameValue_messenger("");
    setTimeout(() => {
      inputRef_web_sites.current?.focus();
    });
  };

  // Success bo'lganda ishlidigan funksiya
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
                    Matbuot kotibi tomonidan o‘tkazilgan mediyatadbirlar. <br />{" "}
                    <span className="uppercase">Press tur</span>
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="eventName"
                      label="Tadbir Nomi"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos tadbir nomini kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-2" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="stuffs"
                      label="Ishchi hodimlarning ro'yhatini kiriting!"
                      rules={[
                        {
                          required: true,
                          message:
                            "Iltimos, Ishchi hodimlarning ro'yhatini kiriting!",
                        },
                      ]}
                      style={{
                        marginBottom: 20,
                      }}
                    >
                      <Select
                        mode="multiple"
                        style={{
                          width: "100%",
                          height: 41,
                        }}
                        placeholder="Please select"
                        defaultValue={[]}
                        options={mediaItems.map((item) => {
                          let label, value;
                          if (item === "RECTOR") {
                            label = "Rektor";
                            value = "Rektor";
                          } else if (item === "VICE_RECTOR") {
                            label = "Prorektor";
                            value = "Prorektor";
                          } else if (item === "PRESS_SECRETARY") {
                            label = "Matbuot kotibi";
                            value = "Matbuot kotibi";
                          } else if (item === "HEAD_OF_ADMINISTRATION") {
                            label = "Boshqarma boshlig‘i";
                            value = "Boshqarma boshlig‘i";
                          } else if (item === "HEAD_OF_DIVISION") {
                            label = "Bo'lim boshlig‘i";
                            value = "Bo'lim boshlig‘i";
                          } else if (item === "DEAN") {
                            label = "Dekan";
                            value = "Dekan";
                          } else if (item === "VICE_DEAN") {
                            label = "Dekan o‘rinbosari";
                            value = "Dekan o‘rinbosari";
                          } else if (item === "HEAD_OF_DEPARTMENT") {
                            label = "Kafedra mudiri";
                            value = "Kafedra mudiri";
                          } else {
                            label = "boshqa";
                            value = "boshqa";
                          }
                          return { label, value };
                        })}
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="tv_channels"
                      label="Telekanal nomi va url manzilini qo'shing!"
                      style={{
                        marginBottom: 20,
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
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="tv channal's name"
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
                                            ref={inputRef_channal}
                                            value={nameValue}
                                            onChange={onNameChange_channal}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
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
                                    options={tvChannalNames?.map((item) => ({
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
                                    placeholder="Url manzilini kiriting!"
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

                  {/* Radio Channels */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="radio_channels"
                      label="Radio kanal nomi va url manzilini qo'shing!"
                      style={{
                        marginBottom: 20,
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
                                      message: "Radio kanal nomi!",
                                    },
                                  ]}
                                  className="col-span-1"
                                >
                                  <Select
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="radio channal's name"
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
                                            ref={inputRef_radio}
                                            value={nameValue_radio}
                                            onChange={onNameChange_radio}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem_radio}
                                          >
                                            Qo'shish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={radioChannal?.map((item) => ({
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
                                    placeholder="Url manzilini kiriting!"
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

                  {/* gazeta va jurnallar Channels */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="newspapers"
                      label="Gazeta, jurnal nomi va url manzilini qo'shing!"
                      style={{
                        marginBottom: 20,
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
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="newspapers name"
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
                                            ref={inputRef_news}
                                            value={nameValue_news}
                                            onChange={onNameChange_news}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem_news}
                                          >
                                            Qo'shish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={newspaper?.map((item) => ({
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
                                    placeholder="Url manzilini kiriting!"
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

                  {/* Messangers */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="messengers"
                      label="Ijtimoiy tarmoqlar nomi va url manzilini qo'shing!"
                      style={{
                        marginBottom: 20,
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
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="messengers name"
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
                                            ref={inputRef_messenger}
                                            value={nameValue_messenger}
                                            onChange={onNameChange_messenger}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem_messenger}
                                          >
                                            Qo'shish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={messanger?.map((item) => ({
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
                                    placeholder="Url manzilini kiriting!"
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

                  {/* Web sites */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="web_sites"
                      label="Web sayt nomi va url manzilini qo'shing!"
                      style={{
                        marginBottom: 20,
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
                                    className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full rounded-md border-0 py-0 h-[41px] text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
                                    placeholder="web site name"
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
                                            ref={inputRef_web_sites}
                                            value={nameValue_web_sites}
                                            onChange={onNameChange_web_sites}
                                            onKeyDown={(e) =>
                                              e.stopPropagation()
                                            }
                                          />
                                          <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addItem_web_sites}
                                          >
                                            Qo'shish
                                          </Button>
                                        </Space>
                                      </>
                                    )}
                                    options={webSite?.map((item) => ({
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
                                    placeholder="Url manzilini kiriting!"
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

                  {/* bular oxirida */}
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="dateOfEvent"
                      label="Chiqqan sanasi va vaqti"
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
