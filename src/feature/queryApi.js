import axios from "axios";

const IP = "10.10.1.166";
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

      // Tokenni localStorage ga saqlaymiz
      localStorage.setItem("token", JSON.stringify(data.token)); // data.token o'rnida tokenni qaytaring
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
    console.log(infoDetails);
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

      console.log("Response data:", data); // Ma'lumotni tekshirish uchun

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);

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

      console.log(data);
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

  // Online Efirlar uchun so'rov
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
};
