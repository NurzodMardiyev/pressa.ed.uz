import React, { useRef } from "react";
import { Button, Form, Input } from "antd";
import "../../../App.css";
import { oavIV } from "../../../feature/queryApi";
import { Toast } from "primereact/toast";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Organization() {
  // const queryClient = useQueryClient();
  const toast = useRef(null);
  const navigate = useNavigate();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const organization = useMutation(
    (values) =>
      oavIV.organization(values, {
        headers: { Authorization: `${token}` },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        // reset();
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

  // Submit bosilganda ishlaydigan Funksiya
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
    };
    console.log("Received values of form: ", values);
    organization.mutate(values);
  };
  // Submit bosilganda ishlaydigan Funksiya

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
                    Xodimlar soni.
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6 ">
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="allEmployeesAmount"
                      label="OTMda rasman faoliyat yuritadiganlar soni jami (barchasi, asosiy va o'rindoshlar soni)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="employeesOfAdministrationAmount"
                      label="Boshqaruv xodimlari umumiy soni."
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="professorTeachersAmount"
                      label="Professor-o'qituvchilar soni jami (asosiy, o'rindosh)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Form.Item
                      name="allStudentsAmount"
                      label="Talabalar soni jami (kunduzgi, sirtqi, kechki, masofaviy, magister, doktorant)"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos qiymat kiriting!",
                        },
                      ]}
                    >
                      <Input type="number" />
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
