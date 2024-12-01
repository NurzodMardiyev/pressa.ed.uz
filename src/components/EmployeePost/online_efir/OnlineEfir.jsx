import React, { useRef, useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Select, Space } from "antd";
import "../../../App.css";
import { oavIV } from "../../../feature/queryApi";
import { Toast } from "primereact/toast";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
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

export default function OnlineEfir() {
  // const queryClient = useQueryClient();
  const toast = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        if (location.pathname === "/superadminpanel/onlayn_efir") {
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
      publishDate: fieldsValue["publishDate"],
      materialType: "Video",
    };
    console.log(values);
    onlineEent.mutate(values);
  };
  // Submit bosilganda ishlaydigan Funksiya

  const stuffs =
    location.pathname === "/superadminpanel/onlayn_efir"
      ? [
          "Vazir",
          "Vazirning birinchi o‘rinbosari",
          "Vazir o‘rinbosari",
          "Vazir kotibiyati boshlig‘i",
          "Vazir maslahatchisi",
          "Vazir yordamchisi",
          "Department boshlig‘i",
          "Boshqarma boshlig‘i",
          "Boshqarma boshlig‘i o‘rinbosari",
          "Bo‘lim boshlig‘i",
          "Bo‘lim boshlig‘i o‘rinbosari",
          "Bosh mutaxassis",
          "Yetakchi mutaxassis",
          "Jamoatchilik kengashi raisi",
          "Jamoatchilik kengashi raisi o‘rinbosari",
          "Jamoatchilik kengashi a’zosi",
          "Ilmiy-texnik kengashlar raisi",
          "Ilmiy-texnik kengashlar raisi o‘rinbosari",
          "Ilmiy-texnik kengashlar a’zosi",
          "Ilm-fan va innovatsiyalar kengashi raisi",
          "Ilm-fan va innovatsiyalar kengashi raisi o‘rinbosari",
          "Ilm-fan va innovatsiyalar kengashi a’zosi",
        ]
      : [
          "Rektor",
          "Prorektor",
          "Matbuot kotibi",
          "Boʻlim boshlig‘i",
          "Boshqarma boshlig‘i",
          "Dekan",
          "Dekan oʻrinbosari",
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
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="eventDate"
                      label="oʻtkazilgan sanasi"
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
                        options={
                          location.pathname === "/superadminpanel/onlayn_efir"
                            ? [
                                { label: "Vazir", value: "Vazir" },
                                {
                                  label: "Vazirning birinchi o‘rinbosari",
                                  value: "Vazirning birinchi o‘rinbosari",
                                },
                                {
                                  label: "Vazir o‘rinbosari",
                                  value: "Vazir o‘rinbosari",
                                },
                                {
                                  label: "Vazir kotibiyati boshlig‘i",
                                  value: "Vazir kotibiyati boshlig‘i",
                                },
                                {
                                  label: "Vazir maslahatchisi",
                                  value: "Vazir maslahatchisi",
                                },
                                {
                                  label: "Vazir yordamchisi",
                                  value: "Vazir yordamchisi",
                                },
                                {
                                  label: "Department boshlig‘i",
                                  value: "Department boshlig‘i",
                                },
                                {
                                  label: "Boshqarma boshlig‘i",
                                  value: "Boshqarma boshlig‘i",
                                },
                                {
                                  label: "Boshqarma boshlig‘i o‘rinbosari",
                                  value: "Boshqarma boshlig‘i o‘rinbosari",
                                },
                                {
                                  label: "Bo‘lim boshlig‘i",
                                  value: "Bo‘lim boshlig‘i",
                                },
                                {
                                  label: "Bo‘lim boshlig‘i o‘rinbosari",
                                  value: "Bo‘lim boshlig‘i o‘rinbosari",
                                },
                                {
                                  label: "Bosh mutaxassis",
                                  value: "Bosh mutaxassis",
                                },
                                {
                                  label: "Yetakchi mutaxassis",
                                  value: "Yetakchi mutaxassis",
                                },
                                {
                                  label: "Jamoatchilik kengashi raisi",
                                  value: "Jamoatchilik kengashi raisi",
                                },
                                {
                                  label:
                                    "Jamoatchilik kengashi raisi o‘rinbosari",
                                  value:
                                    "Jamoatchilik kengashi raisi o‘rinbosari",
                                },
                                {
                                  label: "Jamoatchilik kengashi a’zosi",
                                  value: "Jamoatchilik kengashi a’zosi",
                                },
                                {
                                  label: "Ilmiy-texnik kengashlar raisi",
                                  value: "Ilmiy-texnik kengashlar raisi",
                                },
                                {
                                  label:
                                    "Ilmiy-texnik kengashlar raisi o‘rinbosari",
                                  value:
                                    "Ilmiy-texnik kengashlar raisi o‘rinbosari",
                                },
                                {
                                  label: "Ilmiy-texnik kengashlar a’zosi",
                                  value: "Ilmiy-texnik kengashlar a’zosi",
                                },
                                {
                                  label:
                                    "Ilm-fan va innovatsiyalar kengashi raisi",
                                  value:
                                    "Ilm-fan va innovatsiyalar kengashi raisi",
                                },
                                {
                                  label:
                                    "Ilm-fan va innovatsiyalar kengashi raisi o‘rinbosari",
                                  value:
                                    "Ilm-fan va innovatsiyalar kengashi raisi o‘rinbosari",
                                },
                                {
                                  label:
                                    "Ilm-fan va innovatsiyalar kengashi a’zosi",
                                  value:
                                    "Ilm-fan va innovatsiyalar kengashi a’zosi",
                                },
                              ]
                            : [
                                {
                                  label: "Rektor",
                                  value: "Rektor",
                                },
                                {
                                  label: "Prorektor",
                                  value: "Prorektor",
                                },
                                {
                                  label: "Matbuot kotibi",
                                  value: "Matbuot kotibi",
                                },
                                {
                                  label: "Boʻlim boshlig‘i",
                                  value: "Boʻlim boshlig‘i",
                                },
                                {
                                  label: "Boshqarma boshlig‘i",
                                  value: "Boshqarma boshlig‘i",
                                },
                                {
                                  label: "Dekan",
                                  value: "Dekan",
                                },
                                {
                                  label: "Dekan oʻrinbosari",
                                  value: "Dekan oʻrinbosari",
                                },
                                {
                                  label: "Kafedra mudiri",
                                  value: "Kafedra mudiri",
                                },
                              ]
                        }
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
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Select
                        className="sm:col-span-3  dark:bg-gray-700 dark:text-white dark:ring-0 block w-full h-[41px] rounded-md border-0 py-0 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 "
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
                          message: "Iltimos Inputga qiymat kiriting!",
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
