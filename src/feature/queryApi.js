import axios from "axios";
import { ip } from "../ips";

const IP = ip;
const api = `http://${IP}:8080/api`;

// Tokenni har safar olish uchun
const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const oavIV = {
  login: async (userLogin) => {
    try {
      const { data } = await axios.post(`${api}/auth/login`, userLogin);
      localStorage.setItem("token", JSON.stringify(data?.token));
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  isHaveDetails: async () => {
    try {
      const token = getToken(); // Tokenni olish
      const { data } = await axios.get(`${api}/employee/available-details`, {
        headers: {
          Authorization: token ? ` ${token}` : "",
          mode: "no-cors",
        },
      });

      if (data === false) {
        window.location.href = "/detailsinfo";
      } else {
        window.location.href = "/dashboard";
      }

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  detailInfo: async (infoDetails) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token topilmadi, foydalanuvchi tizimga kirmagan.");
      }

      const { data } = await axios.post(
        `${api}/employee/settings/fill-details`,
        infoDetails,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      window.location.href = "/dashboard";

      return data;
    } catch (error) {
      console.error("Xato:", error.message);
      throw new Error(error.message);
    }
  },
  tv: async (type) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/post/get-content`, null, {
        params: { type },
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addChanal: async (chanal) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/post`, chanal, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // post yaratayabdi yani typega qarab
  addPost: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/post/create`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // bu barcha malumotlarni olayabdi
  employeeInfo: async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/auth/me`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      window.location.href = "/error";
      throw new Error(error.message);
    }
  },

  // use Effectda ishlidimalumot obkelib beradi
  eventMediaGetChannel: async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/media-event/get-stuffs`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // useEffect bolganda hamma narsani ob kelishi kerak yabu brifing ... lar uchun
  eventMediaAll: async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/media-event/get-media`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // osganda ketadi bu submitni
  eventMedia: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/media-event/add`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // post yaratayabdi yani typega qarab
  addPostInfografika: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/material/create`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Online Efirlar uchun soʻrov
  online_event: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${api}/broadcast/create-broadcast`,
        post,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Medialoyihalar uchun soʻrov
  media_event: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/media-project/add`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Medialoyihalar uchun soʻrov
  lavelIllumination: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/coverage/add`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  foreign: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/foreign-oav/create`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Telegram uchun api
  telegram: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/official-page/create`, post, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // organization
  organization: async (post) => {
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${api}/employee/create-organization`,
        post,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Telegram uchun api
  officialPage_check: async (post, type) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/official-page/check`, type, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (data) {
        try {
          const { data } = await axios.put(
            `${api}/official-page/update`,
            post,
            {
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Update", data);
        } catch {
          console.log("Error Update");
        }
      } else {
        try {
          const { data } = await axios.post(
            `${api}/official-page/create`,
            post,
            {
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Create", data);
        } catch {
          console.log("Error Update");
        }
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTypePost: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/post/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Televidenieyadagi hamma postlarni chiqarish
  getTypeMediaEvent: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/media-event/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTypeForeign: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/foreign-oav/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // material hamma postlarni chiqarish
  getTypeMaterial: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/material/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Official page get zapros
  getOfficialPage: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/official-page/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Online Efir page get zapros
  getOnlineEvent: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/broadcast/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Mediya Loyiha  get zapros
  getMediaProjects: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/media-project/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Coverage Loyiha  get zapros
  getCoverage: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/coverage/get-all`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getEmpoyeeId: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/employee/id`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deletePost: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(`${api}/post/delete?id=${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteMediaEvent: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/media-event/delete-event?mediaEventId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteMaterial: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/material/delete?materialId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteOfficial: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/official-page/delete?officialPageId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteOnline: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/broadcast/delete-broadcast?broadcastId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteMediaProjects: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/media-project/delete?id=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteCoverage: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(`${api}/coverage/delete?id=${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteForeign: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/foreign-oav/delete-foreign-oav?foreignId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ishl");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Trashbox korzinka uchun
  getTrash: async () => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/post/all-reload`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Admin organization list
  allOrganization: async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/admin/get-organization`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Superadmin admin qoʻshishi
  addAdmin: async (value) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/admin/add-employee`, value, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Forget Password code uchun soʻrov
  forgetPassword: async (value) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/auth/forgot-password?email=${value.email}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Forget Password code uchun soʻrov
  rePassword: async (value) => {
    try {
      const token = getToken();
      const { data } = await axios.post(`${api}/auth/reset-password`, value, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Hamma ishchilarni superadminga chaqirish
  getAllEmployees: async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/admin/get-all-employees`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Har bitt Employeeni infosini  chaqirish
  getOneEmployeeInfo: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/admin/get-employee-details?userId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Har bitt Employeeni infosini  chaqirish
  getOneEmployeePosts: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/post/get-all-posts?employeeId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getEmployeeExcel: async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/excel/export-employees`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/octet-stream",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // oʻchirilgan post ni qayta tiklash uchun
  getPostReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${api}/post/recovered?postId=${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // oʻchirilgan Media Event ni qayta tiklash uchun
  getMediaEventReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/media-event/recovered?mediaEventId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // oʻchirilgan Material ni qayta tiklash uchun
  getMaterialReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/material/recovered?materialId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCoveragesReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/coverage/recovered?coverageId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getForeignReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/foreign-oav/recovered?foreignId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // oʻchirilgan Material ni qayta tiklash uchun
  getOnlineReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/broadcast/recovered?broadcastId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getOfficialReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/official-page/recovered?officialPageId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getMediaProjectsReload: async (id) => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${api}/media-project/recovered?mediaProjectId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deletePosttoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/post/absolute-delete?postId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteMediaEventtoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/media-event/absolute-delete?mediaEventId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteMaterialtoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/material/absolute-delete?materialId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteOnlinetoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/broadcast/absolute-delete?broadcastId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteOfficialtoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/official-page/absolute-delete?officialPageId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteMediaProjectstoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/media-project/absolute-delete?mediaProjectId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteCoveragestoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/coverage/absolute-delete?coverageId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteForeigntoTrash: async (id) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.delete(
        `${api}/foreign-oav/absolute-delete?foreignId=${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Postlarni superadmin oʻchiraolishi uchun
  deletePostSuperAdmin: async (obj) => {
    //botta type beriladi
    try {
      const token = getToken();
      const { data } = await axios.post(
        `${api}/admin/delete-employee-post`,
        obj,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Postlarni top 5taligi ubiver hisobida
  topPostsForStat: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-top-five`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  mapPublicData: async () => {
    try {
      const { data } = await axios.get(
        `${api}/public/universities-by-province`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  universByProvince: async (id) => {
    try {
      const { data } = await axios.get(
        `${api}/public/top-universities-by-province?province=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getGenderData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/genders-by-region`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  allGenderData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/genders-by-republic`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  uniqueUniverPostsData: async (id) => {
    try {
      const { data } = await axios.get(
        `${api}/public/university-posts-count?organizationId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  dataForQuoter: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-top-quoter`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  ranking: async () => {
    try {
      const { data } = await axios.get(
        `${api}/public/universities-rating-by-posts`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  rankingTopUniver: async () => {
    try {
      const { data } = await axios.get(`${api}/public/top-last-month-posts`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  allOAVData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-posts-by-type`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  allMediaData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-mediaEvent-count`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  allMaterialaData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-material-count`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  allOnlineStatData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-broadcast-count`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  allForeignStatData: async () => {
    try {
      const { data } = await axios.get(`${api}/public/get-foreign-count`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
