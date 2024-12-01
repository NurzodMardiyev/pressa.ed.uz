import React, { useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/pressa logo.png";
import { useForm } from "react-hook-form";
import { oavIV } from "../../feature/queryApi";
import { useMutation, useQueryClient } from "react-query";
import { Toast } from "primereact/toast";
import { Carousel, Input } from "antd";
import img from "../../images/head.jpg";
import img1 from "../../images/head1.jpg";
import img2 from "../../images/2.webp";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

export default function AuthSignUp() {
  const { register, handleSubmit } = useForm();
  const toast = useRef(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const showSuccess = useCallback(() => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 0,
    });
  }, []);

  const showError = useCallback(() => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
      life: 0,
    });
  }, []);

  const userReg = useMutation(oavIV.login, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      showSuccess();
    },
    onError: () => {
      showError();
      console.log("Mutation Error");
    },
  });

  const haveDetails = useMutation(oavIV.isHaveDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleTakeValue = useCallback(
    (data) => {
      userReg.mutate(data, {
        onSuccess: (response) => {
          const userRole = response?.role;
          localStorage.setItem("login", JSON.stringify(data));

          // Tokenni 1.5 sekunddan soʻng tekshirish
          if (Array.isArray(userRole)) {
            userRole.forEach((item) => {
              localStorage.setItem("role", item.authority);
              if (item.authority === "ROLE_ADMIN") {
                navigate("/superadminpanel/dashboard");
              } else if (item.authority === "ROLE_EMPLOYEE") {
                setTimeout(() => {
                  const token = JSON.parse(localStorage.getItem("token"));
                  if (token) {
                    haveDetails.mutate();
                  }
                }, 1000);
              } else {
                navigate("/unauth");
              }
            });
          } else {
            console.error("Xatolik: Kutilganidan farqli javob formati.");
          }
        },
        onError: (error) => {
          console.error("Xatolik yuz berdi:", error.message);
        },
      });
    },
    [userReg, navigate, haveDetails]
  );

  const carouselItems = useMemo(
    () => [
      {
        title:
          "PRESSA.EDU.UZ - Oliy ta’lim muassasalari matbuot kotiblari reytingini aks ettiruvchi platforma",
        imgSrc: img2,
      },
      {
        title:
          "Ushbu platformada oliy ta’lim muassasalari axborot xizmatlari (Matbuot kotiblari) faoliyatining monitoringi yuritiladi",
        imgSrc: img1,
      },
      {
        title:
          "Maqsad: Oliy ta’lim muassasalari matbuot kotiblari faoliyatini raqamlashtirish, ularning reytingini yuritish orqali o‘zaro raqobatni ta’minlash va samaradorlikka erishish. Sohaga doir yangiliklarni OAVda yoritilish holatini onlayn tahlil qilish.",
        imgSrc: img,
      },
    ],
    []
  );

  return (
    <div className="bg-slate-100 flex justify-between h-[100vh] items-center">
      <div className="flex-1 w-1/2 relative">
        <div
          className="w-full h-full overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          }}
        >
          <Carousel autoplay autoplaySpeed={8500} speed={1000}>
            {carouselItems.map((item, index) => (
              <div key={index} className="w-[800px] relative h-[100vh]">
                <div className="h-full">
                  <img
                    src={item.imgSrc}
                    className="object-cover min-h-full w-full"
                    alt={item.title}
                  />
                </div>
                <div className="bg-[#000000a3] w-full h-full flex absolute top-0 left-0"></div>
                <div className="absolute top-0 left-0 z-[99] w-full h-full bg-[#00000045]">
                  <div className="flex w-full h-[100vh] justify-center items-center">
                    <div>
                      <h1
                        className="text-white text-[26px] max-w-[600px]"
                        style={{ fontFamily: "Roboto" }}
                      >
                        {item.title}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      {/* Sign up */}
      <div className="flex w-1/2 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm min-h-16 ">
          <img
            alt="pressa edu uz"
            src={logo}
            className="mx-auto h-full w-full "
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Shaxsiy kabinetga kirish
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
                Login
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Elektron pochtani kiriting!"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  Parol
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgetpassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Parolni unitdingizmi?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password")}
                />
              </div>
            </div>

            <div>
              <Toast ref={toast} />

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Kirish
              </button>
            </div>
          </form>
        </div>
      </div>
      )
    </div>
  );
}
