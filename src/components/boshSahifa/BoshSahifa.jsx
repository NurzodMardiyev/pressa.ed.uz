import React from "react";
import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";

export default function BoshSahifa() {
  const { data, error, isLoading } = useEmployeeInfo();
  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xato: {error.message}</div>;

  const birth = data.user.birthday;
  const formattedNumbers = birth.map((num) =>
    num < 10 ? `0${num}` : `${num}`
  );

  const enterDate = data.details.entryDate;
  const enterDateFormat = enterDate.map((num) =>
    num < 10 ? `0${num}` : `${num}`
  );
  return (
    <div>
      <div className="mb-16">
        <h2 className="text-[30px] mb-4 dark:text-white">
          {" "}
          <span className="font-[500] mr-2">{data.user.fullName}</span>
          bosh sahifangizga xush kelibsiz!
        </h2>
        <div className="information">
          <div className="grid grid-cols-6 gap-5">
            <div className="flex flex-col col-span-3">
              <span className="font-semibold text-[14px] mb-1">F. I. O :</span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.user.fullName}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">OTM Nomi:</span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.user.organization.name}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Tug'ilgan yili:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {formattedNumbers.join("-")}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Mutaxasisligi:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.speciality.name}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Ishga qabul qilingan yili (buyruq nomeri):
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {enterDateFormat.join("-")}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                AOKAdan attestatsiyadan o'tkanligi:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.license}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                AOKA yoki OTFIVning malaka oshirish kurslari yoki seminarlarida
                ishtirok etganligi:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.qualificationInfo}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Shtatdagi O'rni:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.workType}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Telefon Raqam:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.user.phone}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Oxirgi bir yillik oylik maoshining o'rtacha miqdori:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.averageSalary}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Rektorning axborot siyosati masalalari bo'yicha maslahatchisi
                etib belgilangan (Asos hujjat raqam):
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.advisor}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Alohida matbuot/axborot xizmati bo'limi tashkil etilganligi:
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.departmentOrganisation}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Matbuot bo'limi uchun alohida xona ajratilganligi
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.room}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Moddiy-texnik bazasining holati (kameralar soni va uning nomi)
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.resource}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Matbuot kotibi xorijga xizmat safariga yuborilganligi
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.businessTrip}
              </p>
            </div>
            <div className="flex flex-col col-span-3 ">
              <span className="font-semibold text-[14px] mb-1">
                Matbuot kotibining kasbiy va qo'shimcha kompetentsiyasi
              </span>
              <p className="bg-slate-200 rounded px-2 py-2 text-[16px] font-semibold">
                {data.details.skills}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
