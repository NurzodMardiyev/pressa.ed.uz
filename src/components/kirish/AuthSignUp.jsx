import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/pressa logo.png";
import { useForm } from "react-hook-form";
import { oavIV } from "../../feature/queryApi";
import { useMutation, useQueryClient } from "react-query";
import { Toast } from "primereact/toast";
import { Carousel } from "antd";
import img from "../../images/07.jpg";

export default function AuthSignUp() {
  const { register, handleSubmit, reset } = useForm();
  const toast = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);

  const queryClient = useQueryClient();

  const userReg = useMutation(oavIV.login, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      showSuccess();
    },
    onError: () => {
      showError();
      console.log(Error, "Mutation Erorr");
    },
  });
  const haveDetails = useMutation(oavIV.isHaveDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
      life: 3000,
    });
  };

  const handleTakeValue = (data) => {
    userReg.mutate(data, {
      onSuccess: (response) => {
        // Tokenni localStorage ga saqlaymiz
        localStorage.setItem("token", JSON.stringify(response));

        reset();
        localStorage.setItem("login", JSON.stringify(data));

        // 1.5 sekund kutib, token mavjudligini tekshiramiz va so'rov yuboramiz
        setTimeout(() => {
          const token = JSON.parse(localStorage.getItem("token"));
          console.log(token);
          if (token) {
            haveDetails.mutate();
          }
        }, 1500);
      },
      onError: (error) => {
        console.error("Xatolik yuz berdi:", error.message);
      },
    });
  };

  return (
    <div className="bg-slate-100 flex justify-between h-[100vh] items-center">
      <div className="flex-1 w-1/2 relative">
        <div
          className="w-full h-full overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          }}
        >
          <Carousel autoplay>
            <div className="w-[800px] relative h-[100vh]">
              <div className="h-full">
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-0 left-0 z-[99] w-full h-full bg-[#00000045]">
                <div className="flex w-full h-[100vh] justify-center items-center">
                  <div>
                    <h1 className="text-white">Titil 1</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[800px] relative h-[100vh]">
              <div className="h-full">
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-0 left-0 z-[99] w-full h-full bg-[#00000045]">
                <div className="flex w-full h-[100vh] justify-center items-center">
                  <div>
                    <h1 className="text-white">Titil 2</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[800px] relative h-[100vh]">
              <div className="h-full">
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-0 left-0 z-[99] w-full h-full bg-[#00000045]">
                <div className="flex w-full h-[100vh] justify-center items-center">
                  <div>
                    <h1 className="text-white">Titil 3</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-[800px] relative h-[100vh]">
              <div className="h-full">
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-0 left-0 z-[99] w-full h-full bg-[#00000045]">
                <div className="flex w-full h-[100vh] justify-center items-center">
                  <div>
                    <h1 className="text-white">Titil 4</h1>
                  </div>
                </div>
              </div>
            </div> */}
          </Carousel>
        </div>
      </div>

      {/* Sign up */}
      {showSignUp && (
        <div className="flex w-1/2 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-16 ms-[20px] w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sizning accountingizga kiring!
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit(handleTakeValue)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("email")}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        setShowSignUp(false);
                        setShowPassword(true);
                      }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password")}
                  />
                </div>
              </div>

              <div>
                <Toast ref={toast} />

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Forget password */}
      {showPassword && (
        <div className="flex w-1/2 flex-1 flex-col justify-center px-6 py-12 lg:px-8 border">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-16 ms-[20px] w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Parolingiz esingizdan chiqdimi?
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit(handleTakeValue)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("email")}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        setShowSignUp(true);
                        setShowPassword(false);
                      }}
                    >
                      Have you password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password")}
                  />
                </div>
              </div>

              <div>
                <Toast ref={toast} />

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
