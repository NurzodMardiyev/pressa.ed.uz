import axios from "axios";

const api = "http://192.168.3.33:8080/api";

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
        window.location.href = "/authemployee";
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

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
      return data;
    } catch (error) {
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
};
