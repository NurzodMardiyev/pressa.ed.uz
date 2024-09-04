import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { BarGraphData, LineGraphData, PieGraphData } from "./FakeData";
import { Doughnut } from "react-chartjs-2";
import UzMap from "../uzmap/UzMap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function LandingPage() {
  return (
    <div className="md:pt-20 pt-16 bg-slate-100 dark:bg-gray-800 z-10">
      <div className="header-wrapper container md:max-w-10xl  mx-auto  py-4 md:px-5 px-5 lg:mx-auto ">
        <div className="flex justify-between flex-col md:flex-row gap-3 ">
          <div className="px-5 py-3  rounded-xl dark:bg-gray-700 bg-white col-span-3 md:w-[300px] ">
            <p className="dark:text-white">
              OTMlar soni: <span className="font-semibold">210</span>
            </p>
          </div>
          <div className="px-5  py-3 rounded-xl bg-white col-span-3 md:w-[400px] dark:bg-gray-700">
            <p className="dark:text-white">
              Professor-o'qituvchilar soni:
              <span className="font-semibold">40457</span>
            </p>
          </div>
          <div className="px-5 dark:bg-gray-700 py-3 rounded-xl bg-white col-span-3 md:w-[400px]">
            <p className="dark:text-white">
              Talabalar soni: <span className="font-semibold">114342</span>
            </p>
          </div>
        </div>
        {/* Charts */}
        <div className="charts mt-7 dark:bg-gray-700 bg-white px-3 rounded-xl">
          <div className=" flex justify-between md:flex-row flex-col gap-3">
            <div className="md:w-full w-full dark:white  mb-6 py-10 px-6 ">
              <Line
                options={LineGraphData.options}
                data={LineGraphData.data}
                className="dark:text-white line-white w-full  flex-1  mx-auto px-6 "
              />
            </div>
          </div>
          <div className="mt-6 flex">
            <div className="md:w-[47%] w-full">
              <Bar options={BarGraphData.options} data={BarGraphData.data} />
            </div>
            <div className="md:w-[47%] w-full ">
              <Doughnut
                options={PieGraphData.options}
                data={PieGraphData.data}
              />
            </div>
          </div>
          <div>
            <UzMap />
          </div>
        </div>
      </div>
    </div>
  );
}
