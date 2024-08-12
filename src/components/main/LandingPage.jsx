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
import { Bar, Line, Pie } from "react-chartjs-2";
import { BarGraphData, LineGraphData, PieGraphData } from "./FakeData";

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
    <div className="md:pt-20 pt-16 bg-slate-100 z-10">
      <div className="header-wrapper container md:max-w-6xl  mx-auto  py-4 md:px-5 px-5 lg:max-w-7xl lg:mx-auto ">
        <div className="flex justify-between flex-col md:flex-row gap-3 ">
          <div className="px-5 py-3  rounded-xl bg-white col-span-3 md:w-[300px] ">
            <p>
              OTMlar soni: <span className="font-semibold">210</span>
            </p>
          </div>
          <div className="px-5  py-3 rounded-xl bg-white col-span-3 md:w-[400px] ">
            <p>
              Professor-o'qituvchilar soni:
              <span className="font-semibold">40457</span>
            </p>
          </div>
          <div className="px-5  py-3 rounded-xl bg-white col-span-3 md:w-[400px]">
            <p>
              Talabalar soni: <span className="font-semibold">114342</span>
            </p>
          </div>
        </div>
        {/* Charts */}
        <div className="charts mt-7 bg-white px-3 rounded-xl">
          <div className=" flex justify-between md:flex-row flex-col gap-3">
            <div className="md:w-[47%] w-full">
              <Line options={LineGraphData.options} data={LineGraphData.data} />
            </div>
            <div className="md:w-[47%] w-full">
              <Bar options={BarGraphData.options} data={BarGraphData.data} />
            </div>
          </div>
          <div className="mt-6 flex">
            <div className="md:w-[47%] w-full">
              <Pie options={PieGraphData.options} data={PieGraphData.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
