import React from "react";
import { Carousel } from "antd";
import img1 from "../../images/08.jpg";
import img2 from "../../images/07 (2).jpg";
import img3 from "../../images/5T3A0121.jpg";
import img4 from "../../images/03.jpg";

const contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function HeroSection() {
  return (
    <div className="bg-green-100">
      <div className="container md:max-w-10xl flex  mx-auto md:py-10   md:px-5 px-5 lg:mx-auto py-4">
        <div className=" md:mt-[50px]  md:mb-[30px] flex w-full items-center">
          <div className="md:w-1/2">
            <h1
              className="max-w-[550px] md:text-3xl text-xl md:font-bold font-[500]"
              style={{ fontFamily: "Roboto" }}
            >
              Matbuot Kotiblarining Ommaviy Axborot Vositalariga chiqish tizimi{" "}
            </h1>
            <p className="max-w-[550px] mt-2 ">
              O'zbekiston Respublikasi Oliy ta'limi va innovatsialri
              vazirligida, Oliy ta'limdagi Ilmiy rahbarlar va Matbuot
              kotiblarining Ommaviy Axborot Vositalariga chiqishining raqamli
              rizimi
            </p>
          </div>
          <div className="md:w-1/2 px-[40px]">
            <Carousel autoplay>
              <div>
                <img
                  src={img1}
                  alt=""
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
              <div>
                <img
                  src={img2}
                  alt=""
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
              <div>
                <img
                  src={img3}
                  alt=""
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
              <div>
                <img
                  src={img4}
                  alt=""
                  className="w-full object-cover h-[300px] rounded-xl"
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
