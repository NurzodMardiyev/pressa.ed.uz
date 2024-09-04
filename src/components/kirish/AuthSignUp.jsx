import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useForm } from "react-hook-form";
import { oavIV } from "../../feature/queryApi";
import { useMutation, useQueryClient } from "react-query";
import { Toast } from "primereact/toast";

export default function AuthSignUp() {
  const { register, handleSubmit, reset } = useForm();
  const toast = useRef(null);

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

  const employeeInfo = useMutation(oavIV.employeeInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleTakeValue = (data) => {
    userReg.mutate(data, {
      onSuccess: (response) => {
        // Tokenni localStorage ga saqlaymiz
        localStorage.setItem("token", JSON.stringify(response));

        employeeInfo.mutate();

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

    reset();
  };
  return (
    <div className="bg-slate-100 flex justify-center h-[100vh] items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Write to Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
