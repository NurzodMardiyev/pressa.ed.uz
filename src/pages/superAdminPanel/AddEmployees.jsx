import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Flex, Form, Input, Select, Space, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { oavIV } from "../../feature/queryApi";
import { PlusOutlined } from "@ant-design/icons";
import { Toast } from "primereact/toast";

export default function AddEmployees() {
  const toast = useRef(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));

  // Add Admin
  const addAdmin = useMutation(
    (values) =>
      oavIV.addAdmin(values, { headers: { Authorization: `${token}` } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        // setTimeout(() => {
        //   navigate("/dashboard");
        // }, 300);
      },
      onError: (error) => {
        showError(error);
      },
    }
  );

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
    };
    addAdmin.mutate(fieldsValue);
    console.log("Received values of form: ", values);
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 0,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Xato kiritdingiz",
      detail: `Bunday foydalanuvchi boʻlishi mumkin! `,
      life: 0,
    });
  };

  return (
    <div className="flex ">
      <div className="  w-full ">
        <div className=" w-full">
          <div className="container w-full mx-auto   flex ">
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
              className="w-full"
            >
              {/* form input group step1 */}
              <div className={`w-full  `}>
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                    Xodimlarni Qoʻshish
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-12 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-12">
                  <div className="sm:col-span-6 w-full">
                    <Form.Item
                      name="email"
                      label="Xodimning emaili"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-2 w-full flex" />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-6 w-full">
                    <Form.Item
                      name="password"
                      label="Xodimning paroli"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Inputga qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-2 w-full flex" />
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
