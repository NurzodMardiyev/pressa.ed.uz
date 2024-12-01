import React from "react";
import { Carousel } from "antd";
import img1 from "../../../images/3.jpg";
import img2 from "../../../images/4.jpg";
import img3 from "../../../images/2.jpg";
import img4 from "../../../images/1.jpg";

const contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function HeroSection() {
  return (
    <div className="bg-[#d2ffeb] dark:bg-gray-600 dark:text-white pt-14">
      <div className="container md:max-w-10xl flex  mx-auto md:py-10   md:px-5 px-5 lg:mx-auto">
        <div className=" md:mt-[50px]  md:mb-[30px] flex w-full items-center md:flex-row flex-col ">
          <div className="md:w-1/2 w-full z-10 text-white md:text-black flex justify-start items-center md:h-full min-h-[300px] dark:text-white">
            <div>
              <h1
                className="max-w-[490px] md:max-w-[550px] md:text-3xl text-xl md:font-bold font-[500]  "
                style={{ fontFamily: "Roboto" }}
              >
                Oliy ta’lim muassasalari matbuot kotiblari reytingini aks
                ettiruvchi platforma
              </h1>
              <p className="max-w-[550px] mt-2  text-[14px] md:text-[16px]">
                {/* o‘zbekiston Respublikasi Oliy ta’limi va innovatsialri
                vazirligida, Oliy ta’limdagi Ilmiy rahbarlar va Matbuot
                kotiblarining Ommaviy Axborot Vositalariga chiqishining raqamli
                tizimi */}
                Oliy ta’lim muassasalari matbuot kotiblari faoliyatini
                raqamlashtirish, ularning reytingini yuritish orqali o‘zaro
                raqobatni ta’minlash va samaradorlikka erishish. Sohaga doir
                yangiliklarni OAVda yoritilish holatini onlayn tahlil qilish.
              </p>
            </div>
          </div>
          <div className="md:w-1/2  w-full md:relative absolute z-0">
            <Carousel autoplay speed={1000} className="z-0">
              <div>
                <img
                  src={img1}
                  alt="pressa edu uz"
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
              <div>
                <img
                  src={img2}
                  alt="pressa edu uz"
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
              <div>
                <img
                  src={img3}
                  alt="pressa edu uz"
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
              <div>
                <img
                  src={img4}
                  alt="pressa edu uz"
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
            </Carousel>
            <div className="bg-[#00000083] absolute top-0 left-0 z-10 flex w-full h-full md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
