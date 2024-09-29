import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";
import { Flex, Spin } from "antd";

export default function Profile() {
  const { data, isLoading, isError } = useEmployeeInfo();
  const [timeAgo, setTimeAgo] = useState("");
  const [birthday, setBirthday] = useState();
  const [enter_date, setEnterDate] = useState();

  console.log(data);

  useEffect(() => {
    if (data?.createdAt && data?.createdAt.length >= 6) {
      const createdAt = data.createdAt;

      // Millisekund qiymatini tekshirish
      const milliseconds = createdAt[6] > 1000 ? 0 : createdAt[6];

      // createdAt ni Date formatiga o'zgartirish
      const createdDate = new Date(
        createdAt[0], // Yil
        createdAt[1] - 1, // Oy (0-indeksli)
        createdAt[2], // Kun
        createdAt[3], // Soat
        createdAt[4], // Minut
        createdAt[5], // Sekund
        milliseconds // Millisekund (katta bo'lsa, e'tiborsiz qoldiriladi)
      );

      const now = new Date();
      const diffInMs = now - createdDate;

      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);

      // Konsolga chiqarish yoki state ga yozish
      if (diffInHours >= 1) {
        setTimeAgo(`${diffInHours} soat oldin`);
      } else {
        setTimeAgo(`${diffInMinutes} minut oldin`);
      }
    }
    const formattedDate = data?.user.birthday.map((num) =>
      num < 10 ? `0${num}` : num
    );
    setBirthday(formattedDate?.join("-"));
    const enterDate = data?.details.entryDate.map((num) =>
      num < 10 ? `0${num}` : num
    );
    setEnterDate(enterDate?.join("-"));
  }, [data?.createdAt]);

  const base64Image = `data:image/png;base64,${data?.user.base64}`;

  if (isLoading)
    return (
      <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center">
        <Flex>
          <Spin size="large" />
        </Flex>
      </div>
    );
  if (isError) return <div>An error occurred: {isError.message}</div>;
  return (
    <div>
      <div className="container w-[95%] mx-auto  flex mt-6 gap-6 dark:text-white">
        <div className="profile_left md:w-[440px]  flex flex-col">
          <div className="w-[150px] h-[150px] rounded-full relative">
            <img
              src={base64Image}
              alt={data?.user.fullName}
              className="object-cover w-full rounded-full  h-full"
            />
            <button className="absolute bg-blue-500 bottom-2 right-2 p-2 rounded-full text-white">
              <FaCamera />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold mt-2">
              {data?.user.fullName}
            </h2>
            <p className="font-[500] mt-1 text-[15px]">
              Oxirgi marta kirgan: {timeAgo}
            </p>{" "}
            {/* TimeAgo ni shu yerda chiqaramiz */}
            <div className="px-3 py-1 rounded-full bg-[#F2F2F3] dark:bg-gray-700 border mt-3">
              <span className="font-[600]">Email: </span> {data?.user.email}
            </div>
            <div className="flex-1 mt-4">
              <span className="mb-2 text-[14px] inline-block">Telefon</span>
              <p className="px-4 py-2 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold">
                {data?.user.phone}
              </p>
            </div>
            <div className="flex-1 mt-4">
              <span className="mb-2 text-[14px] inline-block">
                Tug'ilgan sana
              </span>
              <p className="px-4 py-2 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold">
                {birthday}
              </p>
            </div>
            <div className="flex-1 mt-4">
              <span className="mb-2 text-[14px] inline-block">
                Tashash shahri
              </span>
              <p className="px-4 py-2 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold">
                {data?.user.organization.province}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 mb-6">
          <div className="profile_right flex-1 border rounded-xl">
            <div className="flex flex-col py-6 px-6">
              <h2 className="text-xl font-semibold">Umumiy ma'lumotlar</h2>

              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Ilmiy darajangizni qo'shing!
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {/* data?.speciality.specialities */}
                  <span>
                    {Object.entries(data?.speciality.specialities).map(
                      ([name, direction], index) => {
                        return (
                          <span key={index} className="uppercase">
                            {name}: {direction}
                          </span>
                        );
                      }
                    )}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-3 ">
                <div className="flex-1">
                  <span className="mb-2 text-[14px] inline-block">
                    OTM nomi
                  </span>
                  <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold flex justify-between items-center">
                    <span>{data?.user.organization.name}</span>
                  </p>
                </div>
                <div className="flex-1">
                  <span className="mb-2 text-[14px] inline-block">
                    OTM turi
                  </span>
                  <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold flex justify-between items-center">
                    <span>{data?.user.organization.orgType}</span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Buyruq raqami yoziladi
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.commendNumber}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Ishga qabul qilingan yil
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {enter_date}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  AOKAdan attestatsiyadan o'tganligi (agar ha bo'lsa qachon,
                  guvohnoma raqami)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.license}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  AOKA yoki OTFIVning malaka oshirish kurslari yoki
                  seminarlarida ishtirok etganligi (qachon, qayerda)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.qualificationInfo}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Shtatdagi o'rni
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.workType}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Rektorning axborot siyosati masalalari bo'yicha maslahatchisi
                  etib belgilangan (Asos hujjat raqami)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.advisor}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Matbuot kotibining kasbiy va qo'shimcha kompetentsiyasi (siz
                  nima qilasiz)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.skills}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Matbuot bo'limi uchun alohida xona ajratilganligi (ha/yo'q
                  bo'lsa qaysi bo'lim bilan birga o'tiradi)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.room}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Oxirgi bir yillik oylik maoshining o'rtacha miqdori (UzASBO
                  tizimi yoki my.gov.uz orqali olingan ma'lumot fayl shaklida
                  taqdim etiladi)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.averageSalary}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Alohida Matbuot/axborot xizmati bo'limi tashkil etilganligi
                  (bo'lsa unda nechta shtat bor yoki nechta boshqa bo'limdan
                  jalb qilingan)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.departmentOrganisation}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Matbuot kotibini xorijga xizmat safarlariga yuborilganligi
                  (qachon, qayerga)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.businessTrip}
                </p>
              </div>
              <div className="mt-4">
                <span className="mb-2 text-[14px] inline-block">
                  Moddiy-texnik bazasining holati (telefon: bor/yo'q; televizor:
                  bor/yo'q;)
                </span>
                <p className="px-4 py-3 bg-[#F9F9F9] dark:bg-gray-700 rounded-md font-semibold ">
                  {data?.details.resource}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
