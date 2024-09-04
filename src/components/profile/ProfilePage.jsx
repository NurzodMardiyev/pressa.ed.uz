import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { TiPrinter } from "react-icons/ti";
import { MdOutlineSms } from "react-icons/md";
import { MdInstallDesktop } from "react-icons/md";
const Talaba = () => {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto p-6 md:max-w-7xl bg-white">
        <div className="flex items-center gap-3 mb-10">
          <PiStudentBold className="text-4xl" />
          <h1 className="text-xl font-bold">
            Oliy va profesional talim muassasalariga qabul (2024-2025-o'quv yili
            uchun)
          </h1>
        </div>

        <div className="mb-5 flex justify-between">
          <button className="border-2 border-black py-2 px-4 bg-white text-black font-semibold rounded">
            1-Bosqich
          </button>
          <div className="space-x-4">
            <button className="px-6 py-2 bg-green-600 text-white rounded-xl">
              Qayt varaqasi
            </button>
            <button className="border-2 border-gray-300 py-2 px-6 bg-white text-black font-semibold rounded-md">
              OTM tanlash
            </button>
          </div>
        </div>

        <div className="mb-14 ">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Abiturentlar qayt varaqasi</h1>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-green-700 text-white rounded-lg">
                Natijalarni ko'rish
              </button>
              <button className="px-3 py-1 bg-green-700 text-white  rounded-lg">
                Abiturent ruhsatnomasi
              </button>
              <button className="px-3 py-1 bg-green-700 text-white  rounded-lg">
                Kasbiy (ijodiy) ruhsatnomasi
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Shaxsiy Ma'lumotlar</h2>
            <form>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h1> Ismingizni</h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1>Familyangiz </h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1>Otasining ismini </h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1> Pasport ID raqamingiz</h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h1> Jinsi</h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1> Manzilingizni kiriting</h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1> Pasport JSHR </h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1> Tug'ilgan sanangiz</h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h1>Telefon raqamingiz </h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-15 text-gray-700"
                  ></button>
                </div>
                <div>
                  <h1>Tugatgan muassasangiz</h1>
                  <button
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded px-20 py-[35px] text-gray-700"
                  ></button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mr-[980px] ">
          <h1 className="text-2xl text-green-600 font-bold">
            Test topshirish fanlari
          </h1>
          <h2 className="ml-[10px] flex text-xl">-Bialogiya (3.3)</h2>
          <h2 className="ml-[10px] flex text-xl">-Kimyo (2.1)</h2>
          <h2 className="ml-[10px] flex text-xl">-Ona tili (1.1)</h2>
          <h2 className="ml-[10px] flex text-xl">-Matematika (1.1)</h2>
          <h2 className="ml-[10px] flex text-xl">-O'zbekiston tarixi (1.1)</h2>
        </div>

        {/* Additional Form */}
        <div className="max-w-lg mx-auto mt-6 p-6  rounded-lg  mb-5">
          <form className="flex ">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-[-215px] ml-[-90px]  ">
              <div>
                <h1 className="text-green-500 text-xl ">Ta'lim tili </h1>
                <button
                  type="button"
                  className="w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
                ></button>
              </div>
              <div>
                <h1 className="text-green-500 text-xl ">
                  Test topshiradigan alifbo
                </h1>
                <button
                  type="button"
                  className="w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
                ></button>
              </div>
              <div>
                <h1 className="text-green-500 text-xl "> Hudud</h1>
                <button
                  type="button"
                  className="w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
                ></button>
              </div>
              <div>
                <h1 className="text-green-500 text-xl ">Tanlov ustuvorligi</h1>
                <button
                  type="button"
                  className="w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
                ></button>
              </div>
            </div>
            <div></div>
          </form>
          <div className=" ">
            <h1 className="text-xl font-medium text-blue-500 mb-2">
              To'lov holati
            </h1>
            <h2 className=" px-[100px] max-w-full bg-green-700 text-white rounded-lg  py-2 text-xl font-medium">
              Tulov amalga oshirilgan
            </h2>
          </div>
        </div>

        <div>
          {/* TANLAGAN YUNALISH BUYICHA UQUV TURI YANI SHAKLI */}
          <div>
            <h1 className="text-xl font-bold text-green-700 mr-[1000px] mb-2">
              Tanlangan yunalishlar
            </h1>
            <div className=" max-w-[400px] mb-5 ">
              <button className="border-2 border-gray-300 py-1 px-2 bg-white text-black font-semibold rounded-md mb-2 ">
                <p className="mr-[600px]">1</p>
              </button>
              <button className="border-2 border-gray-300 py-1 px-2 bg-white text-black font-semibold rounded-md mb-2 ">
                <p className="mr-[600px]">2</p>
              </button>
              <button className="border-2 border-gray-300 py-1 px-2 bg-white text-black font-semibold rounded-md mb-2 ">
                <p className="mr-[600px]">3</p>
              </button>
              <button className="border-2 border-gray-300 py-1 px-2 bg-white text-black font-semibold rounded-md mb-2 ">
                <p className="mr-[600px]">4</p>
              </button>
              <button className="border-2 border-gray-300 py-1 px-2 bg-white text-black font-semibold rounded-md mb-2 ">
                <p className="mr-[600px]">5</p>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-10 m-2">
          <div className="bg-gray-200 max-w-[600px] rounded-xl">
            <div className="">
              <h1 className="text-xl font-bold mr-[1050px] p-5">Imtiyozlar</h1>
              <MdOutlineSms className="w-[50px] h-auto  ml-[350px] " />
              <TiPrinter className="w-[200px] h-auto ml-[200px]" />

              <h2 className="ml-[40px] text-xl font-bold p-2">
                Sizda imtiyozlar mavjud emas
              </h2>
            </div>
          </div>

          <div className="bg-gray-200 max-w-[600px] rounded-xl">
            <div className="">
              <p className="text-xl font-bold mr-[1050px] p-5">
                {" "}
                Tilsertifikati
              </p>
              <MdOutlineSms className="w-[50px] h-auto ml-[350px] " />
              <TiPrinter className="w-[200px] h-auto ml-[200px]" />

              <h2 className="ml-[40px] text-xl font-bold p-2">
                Sizda imtiyozlar mavjud emas
              </h2>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="bg-gray-200 max-w-[600px] rounded-xl">
            <div className="">
              <p className="text-xl font-bold mr-[1050px] p-5">
                {" "}
                Talimsertifikati
              </p>
              <MdOutlineSms className="w-[50px] h-auto ml-[350px] " />
              <TiPrinter className="w-[200px] h-auto ml-[200px]" />

              <h2 className="ml-[40px] text-xl font-bold p-2">
                Sizda imtiyozlar mavjud emas
              </h2>
            </div>
          </div>
        </div>

        <div className="mb-10 shadow-xl">
          <h1 className="text-2xl font-bold text-green-500 mr-[900px]">
            ABITURYENTGA ESLATMA
          </h1>
          <h1 className=" font-medium">
            1 respuplika oliy va profesanal talim muassasalariga kirish test
            sinovlario yakunlanganidan sung abiturentlar tominida 15 kiun ichida
            oliy talim tashkiloti talim yunalishi talim{" "}
            <span className="mr-[850px] font-medium">
              shakli tanlov ustuvorligini tanlashi lozim
            </span>{" "}
          </h1>
          <h1 className=" font-medium mr-[-18px]">
            2 Belgilangan muddatda oliy tlkim tashkiloti talim yunalishi talim
            shakli va atnlov ustuvorligini tanlamasa Abiturent ruyhatdan utmagan
            hisoblanadiv va tanlovda ishtirok eta{" "}
            <span className="mr-[1100px]">olmaydi</span>
          </h1>
          <h1 className=" font-medium mr-[15px]">
            3 Oliy talim muassasalariga qabulning yakuniy natijalari (mandat )
            elon qilingandan sung 10 kun muddatda kollej yoki texnikum kasb va
            muassasalarini hamda talim shaklini{" "}
            <span className="mr-[1000px]">tanlash ochiladi</span>
          </h1>
          <h1 className="mr-[60px]  className= font-medium">
            {" "}
            4 Kollej yoki texnikumlarda uqishi istagi bulgan abiturentlar maskur
            muddat davomida kollej yoki texnikumda kasb mutahasislari hamda
            talim shaklini tanlash <span className="mr-[1080px]">lozim</span>
          </h1>
        </div>

        <div className="gap-10">
          <button className="px-5 py-2 bg-yellow-500  rounded-xl text-black font-medium m-5 ml-[650px]">
            Qayta ariza topshirish
          </button>
          <button className="px-5 py-2 bg-green-500  rounded-xl text-white font-medium m-5 flex ml-[1050px] mt-[-60px]">
            <MdInstallDesktop className="w-[25px] h-auto" />
            Yuklab olish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Talaba;
