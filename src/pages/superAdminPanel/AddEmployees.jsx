import React, { useRef } from "react";
import { Button, Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { oavIV } from "../../feature/queryApi";

export default function AddEmployees() {
  const toast = useRef(null);
  const navigate = useNavigate();

  // const token = JSON.parse(localStorage.getItem("token"));

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const addPostInfografika = useMutation(
    (values) =>
      oavIV.addPostInfografika(values, {
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
    addPostInfografika.mutate(values);
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

  return (
    <div className="flex">
      <div className="md:ms-[370px] ms-[50px] md:me-[20px] me-[10px] md:pt-24 pt-14 flex-1 overflow-x-scroll">
        <div className=" w-full">
          <div className="container w-[95%] mx-auto  ">
            <Form
              name="time_related_controls"
              // {...formItemLayout}
              onFinish={onFinish}
              labelCol={{
                span: 48,
              }}
              wrapperCol={{
                span: 48,
              }}
              className="w-full"
            >
              {/* form input group step1 */}
              <div className={`w-full  `}>
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white md:text-xl">
                    Xodimlarni Qo'shish
                  </h2>
                </div>
                <div className="md:mt-5 grid grid-cols-1 gap-x-6 md:gap-y-2 sm:gap-y-2 sm:grid-cols-6">
                  <div className="sm:col-span-3 border">
                    <Form.Item
                      name="showedUser"
                      label="Eshittirish qatnashgan OTM vakili F.I.O"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Eshittirishga chiqishini kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-1.5" />
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3">
                    <Form.Item
                      name="showedUser"
                      label="Eshittirish qatnashgan OTM vakili F.I.O"
                      rules={[
                        {
                          required: true,
                          message: "Iltimos Eshittirishga chiqishini kiriting!",
                        },
                      ]}
                    >
                      <Input className="py-1.5" />
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* form input group step2 */}

              {/* form Steps */}
              <div className="md:mt-[30px] md:mb-[40px] mb-6">
                {/* <Toast ref={toast} /> */}
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
