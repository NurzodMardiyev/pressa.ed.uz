import { useQuery } from "react-query";
import { oavIV } from "../feature/queryApi.js"; // `oavIV` obyektini import qilish

export const useGetTypePosts = () => {
  return useQuery("getTypePost", oavIV.getTypePost);
};

export const useGetTypeMediaEvent = () => {
  return useQuery("getTypeMediaEvent", oavIV.getTypeMediaEvent);
};

export const useGetTrashes = () => {
  return useQuery("getTrash", oavIV.getTrash);
};

export const useGetTypeMaterial = () => {
  return useQuery("getTypeMaterial", oavIV.getTypeMaterial);
};

export const useGetTypeOfficial = () => {
  return useQuery("getOfficialPage", oavIV.getOfficialPage);
};
