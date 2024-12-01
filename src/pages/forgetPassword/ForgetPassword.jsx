import React, { useRef } from "react";
// import logo from "../../images/logo_black.png";
import logo from "../../images/pressa logo.png";
import { Link } from "react-router-dom";
import { Button, Form, Input, message, Upload } from "antd";
import "../../App.css";
import { UploadOutlined } from "@ant-design/icons";
import { InputOtp } from "primereact/inputotp";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { Toast } from "primereact/toast";

export default function ForgetPassword() {
  const toast = useRef(null);
  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));

  const forgetpassword = useMutation(
    (values) =>
      oavIV.forgetPassword(values, { headers: { Authorization: `${token}` } }),
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

  const onFinish = (values) => {
    console.log("Success:", values);
    forgetpassword.mutate(values);
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
    <div className="flex  justify-center items-center w-full h-[100vh] bg-green-50">
      <div className="border p-10 bg-white w-[600px]">
        <div className="h-16">
          <img src={logo} alt="Server Csti" className="h-full" />
        </div>
        <div>
          <h2
            className="text-[29px] mt-3 mb-2"
            style={{ fontFamily: "Gloock, serif" }}
          >
            Parolingizni Unutdingizmi
          </h2>
          <p className="text-[14px]">
            Agar sizda account mavjud boʻlsa{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 border-b border-b-blue-700"
            >
              Kirish
            </Link>{" "}
            ga oʻting!
          </p>
        </div>
        <div>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col gap-0 w-full "
          >
            <Form.Item
              label="Emailingizni kiriting!"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Iltimos Inputga qiymat kiriting!",
                },
              ]}
              className="mb-[10px] mt-3"
            >
              <Input className="w-full flex" />
            </Form.Item>

            <Toast ref={toast} />
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-none bg-gray-800 py-2 hover:bg-gray-900  mt-2"
            >
              Yuborish
            </Button>
          </Form>
        </div>
      </div>
      <style jsx="true">
        {`
          :where(.css-dev-only-do-not-override-11lehqq)[class^="ant-form"]
            [class*=" ant-form"],
          :where(.css-dev-only-do-not-override-11lehqq)[class*=" ant-form"]
            [class*=" ant-form"] {
            width: 100%;
            display: flex;
            justify-content: start;
          }
          :where(.css-dev-only-do-not-override-11lehqq).ant-btn-primary:not(
              :disabled
            ):not(.ant-btn-disabled):hover {
            background: green;
          }
        `}
      </style>
    </div>
  );
}
