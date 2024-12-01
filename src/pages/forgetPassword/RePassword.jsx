import React, { useRef } from "react";
// import logo from "../../images/logo_black.png";
import logo from "../../images/pressa logo.png";
import { Button, Form, Input } from "antd";
import "../../App.css";
import { useMutation, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { Toast } from "primereact/toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function RePassword() {
  const toast = useRef(null);
  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const forgetToken = queryParams.get("token");
  // console.log(forgetToken);

  const rePassword = useMutation(
    (values) =>
      oavIV.rePassword(values, { headers: { Authorization: `${token}` } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        showSuccess();
        navigate("/");
      },
      onError: (error) => {
        showError(error);
      },
    }
  );

  const onFinish = (fieldValue) => {
    const values = {
      ...fieldValue,
      token: forgetToken,
    };
    console.log("Success:", values);
    rePassword.mutate(values);
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
            className="text-[29px] my-3 "
            style={{ fontFamily: "Gloock, serif" }}
          >
            Parolni Yangilash
          </h2>
        </div>
        <div>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col gap-0 w-full "
          >
            <Form.Item
              label="Parolni kiriting!"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Iltimos Inputga qiymat kiriting!",
                },
              ]}
              className="mb-[10px] flex flex-col"
            >
              <Input className="w-full" />
            </Form.Item>

            <Form.Item
              label="Parolni takrorlang!"
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: "Iltimos Inputga qiymat kiriting!",
                },
              ]}
              className="mb-[10px] flex flex-col"
            >
              <Input.Password className="py-2" />
            </Form.Item>
            <Toast ref={toast} />
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-none bg-gray-800 py-2 hover:bg-gray-900 "
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
