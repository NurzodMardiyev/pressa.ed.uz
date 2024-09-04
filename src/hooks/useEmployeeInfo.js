import { useQuery } from "react-query";
import { oavIV } from "../feature/queryApi.js"; // `oavIV` obyektini import qilish

export const useEmployeeInfo = () => {
  return useQuery("employeeInfo", oavIV.employeeInfo);
};
