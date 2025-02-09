import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  Table,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import gif from "../../images/ezgif-2-4f3658adc3-ezgif.com-gif-maker.gif";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { ip } from "../../ips";
import { IoMdSearch } from "react-icons/io";
const sharedOnCell = () => {};

// columnslar infoniki
const columns = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Matbuot kotibining F.I.O",
    dataIndex: "fio",
    onCell: sharedOnCell,
  },
  {
    title: "Email manzili",
    dataIndex: "email",
    onCell: sharedOnCell,
  },
  {
    title: "OTM nomi",
    dataIndex: "password",
    onCell: sharedOnCell,
  },
  {
    title: "Telefon raqami",
    dataIndex: "phoneNumber",
    onCell: sharedOnCell,
  },

  {
    title: "oʻrtacha ish haqqi",
    dataIndex: "salary",
    onCell: sharedOnCell,
  },
  {
    title: "Info",
    dataIndex: "info",
    onCell: sharedOnCell,
  },
  {
    title: "Posts",
    dataIndex: "post",
    onCell: sharedOnCell,
  },
];

const columnsOneEmployee = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "OTM vakili rasmi",
    dataIndex: "img",
    onCell: sharedOnCell,
  },
  {
    title: "Telefon raqami",
    dataIndex: "phone",
    onCell: sharedOnCell,
  },
  {
    title: "Jinsi",
    dataIndex: "gender",
    onCell: sharedOnCell,
  },
  {
    title: "Manzil",
    dataIndex: "province",
    onCell: sharedOnCell,
  },
  {
    title: "Ilmiy darajangiz",
    dataIndex: "degree",
    onCell: sharedOnCell,
  },
  {
    title: "OTM nomi",
    dataIndex: "organization",
    onCell: sharedOnCell,
  },
  {
    title: "Buyruq raqami",
    dataIndex: "commentNumber",
    onCell: sharedOnCell,
  },
  {
    title: "Ishga qabul qilingan yil",
    dataIndex: "entryDate",
    onCell: sharedOnCell,
  },
  {
    title:
      "AOKA yoki OTFIVning malaka oshirish kurslari yoki seminarlarida ishtirok etganligi (qachon, qayerda)",
    dataIndex: "seminar",
    onCell: sharedOnCell,
  },
  {
    title: "Shtatdagi oʻrni",
    dataIndex: "shtat",
    onCell: sharedOnCell,
  },
  {
    title:
      "Rektorning axborot siyosati masalalari boʻyicha maslahatchisi etib belgilangan (Asos hujjat raqami)",
    dataIndex: "hujjat_raqami",
    onCell: sharedOnCell,
  },
  {
    title:
      "Matbuot kotibining kasbiy va qoʻshimcha kompetentsiyasi (siz nima qilasiz)",
    dataIndex: "qushimcha_kom",
    onCell: sharedOnCell,
  },
  {
    title:
      "Matbuot boʻlimi uchun alohida xona ajratilganligi (ha/yoʻq boʻlsa qaysi boʻlim bilan birga oʻtiradi)",
    dataIndex: "alohidaHona",
    onCell: sharedOnCell,
  },
  {
    title:
      "Oxirgi bir yillik oylik maoshining oʻrtacha miqdori (UzASBO tizimi yoki my.gov.uz orqali olingan ma’lumot fayl shaklida taqdim etiladi)",
    dataIndex: "urtacha_oylik",
    onCell: sharedOnCell,
  },
  {
    title:
      "Alohida Matbuot/axborot xizmati boʻlimi tashkil etilganligi (boʻlsa unda nechta shtat bor yoki nechta boshqa boʻlimdan jalb qilingan)",
    dataIndex: "axborot_xizmati",
    onCell: sharedOnCell,
  },
  {
    title:
      "Matbuot kotibini xorijga xizmat safarlariga yuborilganligi (qachon, qayerga)",
    dataIndex: "hizmat_safari",
    onCell: sharedOnCell,
  },
  {
    title:
      "Moddiy-texnik bazasining holati  (kamera soni va uning nomi, modeli;// telefon: bor/yoʻq; televizor: bor/yoʻq; kompyuter jamlamasi soni va nechtasi hujjat bilan ishlash uchun, nechtasi montaj uchun; Qoʻshimcha izoh)",
    dataIndex: "moddiyTexnik",
    onCell: sharedOnCell,
  },
];

// columnslar postlarniki
const columnsPosts = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Koʻrsatuvda qatnashgan OTM vakili F.I.O",
    dataIndex: "fio",
    onCell: sharedOnCell,
  },
  {
    title: "Faoliyatga doir axborot turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "OAV nomi",
    dataIndex: "tvName",
    onCell: sharedOnCell,
  },
  {
    title: "Dastur nomi",
    dataIndex: "appName",
    onCell: sharedOnCell,
  },
  {
    title: "Tadbir oʻtkazilgan sanasi va vaqti",
    dataIndex: "date",
    onCell: sharedOnCell,
  },
  {
    title: "Miqyosi (respublika, hududiy yoki xorijiy)",
    dataIndex: "miqyosi",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi ",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsMedia = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Hodisa Nomi",
    dataIndex: "eventName",
    onCell: sharedOnCell,
  },
  {
    title: " turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "OTM rahbar xodimlarining ishtiroki",
    dataIndex: "stuffs",
    onCell: sharedOnCell,
  },
  {
    title: "messengers",
    dataIndex: "messengers",
    onCell: sharedOnCell,
  },
  {
    title: "newspapers",
    dataIndex: "newspapers",
    onCell: sharedOnCell,
  },
  {
    title: "radio_channels",
    dataIndex: "radio_channels",
    onCell: sharedOnCell,
  },
  {
    title: "tv_channels",
    dataIndex: "tv_channels",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsmaterial = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Material mavzusi",
    dataIndex: "topic",
    onCell: sharedOnCell,
  },
  {
    title: " turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: " E’lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "massMedia",
    onCell: sharedOnCell,
  },
  {
    title: "E’lon qilingan sanasi",
    dataIndex: "publishDate",
    onCell: sharedOnCell,
  },
  {
    title: "Material mavzusi",
    dataIndex: "socialMediaName",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsOfficial = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Telegram linki va obunachilar soni",
    dataIndex: "telegram",
    onCell: sharedOnCell,
  },
  {
    title: " Instagram linki va obunachilar soni",
    dataIndex: "instagram",
    onCell: sharedOnCell,
  },
  {
    title: "You Tube linki va obunachilar soni",
    dataIndex: "youtube",
    onCell: sharedOnCell,
  },
  {
    title: "X linki va obunachilar soni",
    dataIndex: "x",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsOnline = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Onlayn efir/ovozli chat mavzusi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "oʻtkazilgan sanasi",
    dataIndex: "date",
    onCell: sharedOnCell,
  },
  {
    title: "OTM rahbar hodimlarining ishtiroki",
    dataIndex: "participation",
    onCell: sharedOnCell,
  },
  {
    title: "Ijtimoiy tarmoq nomi",
    dataIndex: "mesengerTitle",
    onCell: sharedOnCell,
  },
  {
    title: "Ishtirokchilar soni",
    dataIndex: "amountAttand",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsMediaProjetcs = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Medialoyiha nomi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "Loyiha tavsifi",
    dataIndex: "description",
    onCell: sharedOnCell,
  },
  {
    title: "E’lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "tarmoqTuri",
    onCell: sharedOnCell,
  },
  {
    title: "Davriyligi",
    dataIndex: "period",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsCoverage = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Tadbir nomi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "Tadbir turi",
    dataIndex: "tadbirTuri",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritish shakli",
    dataIndex: "yoritShakli",
    onCell: sharedOnCell,
  },
  {
    title: "E’lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritilgan OAV nomi va havolasii!",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritilgan sanasi",
    dataIndex: "publishDate",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsForeign = [
  {
    title: "T/r",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Tadbir nomi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritish shakli",
    dataIndex: "yoritShakli",
    onCell: sharedOnCell,
  },
  {
    title: "E’lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritilgan OAV nomi va havolasi",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Yoritilgan sanasi",
    dataIndex: "publishDate",
    onCell: sharedOnCell,
  },
  {
    title: "Oʻchirish",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

export default function AllEmployeers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loading1, setLoading1] = React.useState(true);
  const [dataOneEmployee, setDataOneEmployee] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [coveragesData, setCoveragesData] = useState([]);
  const [foreignData, setForeignData] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);
  const [media_eventData, setMedia_eventData] = useState([]);
  const [online_broadcastData, setOnline_broadcastData] = useState([]);
  const [official_pageData, setOfficial_pageData] = useState([]);
  const [media_ProjectsData, setMedia_ProjectsData] = useState([]);
  const [modelDelete, setModelDelete] = useState(false);
  const [formDelete] = Form.useForm();
  const [modalIDKEY, setModalIDKEY] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (content, reason) => {
    messageApi.open({
      type: "success",
      content: `${content}, Sabab: ${reason?.map((item) => {
        return item;
      })}`,
      duration: 5,
    });
  };

  const showModal = (id) => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalDelete = (id, key) => {
    setModelDelete(true);
    setModalIDKEY({ id: id, key: key });
  };
  const handleOkDelete = () => {
    formDelete.submit();
  };
  const handleCancelDelete = () => {
    setModelDelete(false);
  };

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));

  const onFinish = (value) => {
    console.log(value);
  };

  // All empoyerlarni olib kelish uchun
  const { data } = useQuery(["allEmployees"], () => oavIV.getAllEmployees(), {
    refetchOnWindowFocus: false,
  });

  const oneEmployeeInfo = useMutation(
    (values) =>
      oavIV.getOneEmployeeInfo(values, {
        headers: { Authorization: `${token}` },
      }),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries();
        setDataOneEmployee(response);
        console.log(response);
        setLoading(false);
      },
      onError: (error) => {
        // showError(error);
        setLoading(false);
        console.log(error);
      },
    }
  );

  const oneEmployeePosts = useMutation(
    (values) =>
      oavIV.getOneEmployeePosts(values, {
        headers: { Authorization: `${token}` },
      }),
    {
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries();
        Object.entries(response).map(([key, data]) => {
          if (key === "POSTS") {
            setPostsData(data);
          } else if (key === "COVERAGES") {
            setCoveragesData(data);
          } else if (key === "MATERIALS") {
            setMaterialsData(data);
          } else if (key === "MEDIA_EVENT") {
            setMedia_eventData(data);
          } else if (key === "MEDIA_PROJECTS") {
            setMedia_ProjectsData(data);
          } else if (key === "ONLINE_BROADCAST") {
            setOnline_broadcastData(data);
          } else if (key === "OFFICIAL_PAGE") {
            setOfficial_pageData(data);
          } else if (key === "FOREIGN_MATERIAL") {
            setForeignData(data);
          }
        });
        setLoading1(false);
      },
      onError: (error) => {
        // showError(error);
        console.log(error);
        setLoading1(false);
      },
    }
  );

  const superAdminDeleteEmployeePost = useMutation(
    (values) =>
      oavIV.deletePostSuperAdmin(values, {
        headers: { Authorization: `${token}` },
      }),
    {
      onSuccess: (response) => {
        successMessage(response.message.content, response.message.reason);
        setModelDelete(false);
        setPostsData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setMedia_eventData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setMaterialsData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setCoveragesData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setOfficial_pageData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setMedia_ProjectsData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setOnline_broadcastData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        setForeignData((prevPostData) =>
          prevPostData.filter((item) => item.id !== modalIDKEY.id)
        );
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        // showError(error);
        console.log(error);
      },
    }
  );

  const handletakeInfo = (id) => {
    oneEmployeeInfo.mutate(id);
    setLoading(true);
    setOpen(true);
  };

  const handletakePosts = (id) => {
    oneEmployeePosts.mutate(id);
    setLoading(true);
    setOpen1(true);
  };

  const handleOpenModelDelete = (id, key) => {
    showModalDelete(id, key);
    // const socked = new SockJS("https:/10.10.3.233:8080/ws");
    // const client = Stomp.over(socked);

    // client.connect({}, () => {
    //   client.subscribe("/topic/notification", (message) => {
    //     const recievedMessage = JSON.parse(message.body);
    //     setMessages((prev) => [...prev, recievedMessage]);
    //   });
    // });
  };

  const [search, setSearch] = useState(null);

  // Search Employee
  const searchEmployee = (e) => {
    const query = e.target.value.toLowerCase();

    const searchResult = data?.filter((item) =>
      item.fullName.toLowerCase().includes(query)
    );

    setSearch(searchResult);
  };

  const handletakeSalary = async (id) => {
    try {
      const response = await fetch(
        `${ip}/employee/download-salary?userId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();

      // Fayl turi va nomini aniqlash
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "downloaded_file";

      if (contentDisposition && contentDisposition.includes("filename=")) {
        filename = contentDisposition.split("filename=")[1].replace(/"/g, ""); // Fayl nomini olish
      } else if (response.headers.get("Content-Type")) {
        // Fayl nomi kengaytmasini `Content-Type` asosida aniqlash
        const fileType = response.headers.get("Content-Type").split("/")[1];
        filename = `downloaded_file.${fileType}`;
      }

      // Faylni yuklash
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // dinamik nom bilan yuklash
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const dataTable =
    search === null
      ? data?.map((item, index) => {
          return {
            key: 1 + index,
            fio: item.fullName,

            email: (
              <div className="flex justify-between items-center">
                <p>{item.email}</p>
              </div>
            ),
            password: (
              <div className="flex justify-between items-center">
                <p>{item.organizationName}</p>
              </div>
            ),
            phoneNumber: item.phone,
            salary: (
              <button
                className=" transition-all duration-150 bg-[#ceffc586] px-2 py-1 rounded-md text-[#000000] hover:text-gray-900 border border-[#000000]"
                onClick={() => handletakeSalary(item.id)}
              >
                Yuklash
              </button>
            ),
            info: (
              <button
                className=" transition-all duration-150 bg-[#f0e8ff] px-2 py-1 rounded-md text-[#553fff] hover:text-blue-400 border border-[#553fff]"
                onClick={() => handletakeInfo(item.id)}
              >
                Info
              </button>
            ),
            post: (
              <button
                className=" transition-all duration-150 bg-[#ffad3274] px-2 py-1 rounded-md text-[#000000] hover:text-blue-400 border border-[#553fff]"
                onClick={() => handletakePosts(item.employeeId)}
              >
                Postlar
              </button>
            ),
          };
        })
      : search?.map((item, index) => {
          return {
            key: 1 + index,
            fio: item.fullName,

            email: (
              <div className="flex justify-between items-center">
                <p>{item.email}</p>
              </div>
            ),
            password: (
              <div className="flex justify-between items-center">
                <p>{item.organizationName}</p>
              </div>
            ),
            phoneNumber: item.phone,
            notification: (
              <button
                onClick={() => showModal(1)}
                className="border p-3 py-2 rounded border-green-400 text-green-400"
              >
                <MdModeEdit />
              </button>
            ),
            action: (
              <button className=" transition-all duration-150 bg-[#FFF2E8] px-2 py-1 rounded-md text-[#E06E4D] hover:text-red-400 border border-[#E06E4D]">
                Oʻchirish
              </button>
            ),
            info: (
              <button
                className=" transition-all duration-150 bg-[#f0e8ff] px-2 py-1 rounded-md text-[#553fff] hover:text-blue-400 border border-[#553fff]"
                onClick={() => handletakeInfo(item.id)}
              >
                Info
              </button>
            ),
            post: (
              <button
                className=" transition-all duration-150 bg-[#ffad3274] px-2 py-1 rounded-md text-[#000000] hover:text-blue-400 border border-[#553fff]"
                onClick={() => handletakePosts(item.employeeId)}
              >
                Postlar
              </button>
            ),
          };
        });

  const base64Image = `data:image/png;base64,${dataOneEmployee?.user?.base64}`;

  const dataTableOneEmployee = dataOneEmployee
    ? [
        {
          key: 1,
          img: (
            <div>
              <img src={base64Image} alt={dataOneEmployee?.user?.fullName} />
            </div>
          ),
          phone: dataOneEmployee?.user?.phone,
          gender: dataOneEmployee?.gender,
          province: dataOneEmployee?.user?.organization?.province,
          degree: dataOneEmployee?.speciality?.specialities
            ? Object.entries(dataOneEmployee?.speciality?.specialities).map(
                ([name, url]) => (
                  <div key={name}>
                    <span>{name}</span>: <div>{url}</div>
                  </div>
                )
              )
            : "",
          organization: `${dataOneEmployee?.organization?.name}: ${dataOneEmployee?.organization?.orgType}`,
          commentNumber: dataOneEmployee?.details?.commendNumber,
          entryDate: `${String(dataOneEmployee?.details?.entryDate[2]).padStart(
            2,
            "0"
          )}-${String(dataOneEmployee?.details?.entryDate[1]).padStart(
            2,
            "0"
          )}-${String(dataOneEmployee?.details?.entryDate[0]).slice(2)}`,
          seminar: dataOneEmployee?.details?.qualificationInfo,
          shtat: dataOneEmployee?.details?.workType,
          hujjat_raqami: dataOneEmployee?.details?.advisor,
          qushimcha_kom: dataOneEmployee?.details?.skills,
          alohidaHona: dataOneEmployee?.details?.room,
          urtacha_oylik: dataOneEmployee?.details?.averageSalary,
          axborot_xizmati: dataOneEmployee?.details?.departmentOrganisation,
          hizmat_safari: dataOneEmployee?.details?.businessTrip,
          moddiyTexnik: dataOneEmployee?.details?.resource,
        },
      ]
    : [];

  // Postlarni table uchun datalar

  const dataTablePosts = postsData?.map((item, index) => {
    return {
      key: index + 1,
      fio: `${item.showedUser}`,
      type: (
        <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
          {item.postType}
        </div>
      ),
      tvName: item.media,
      appName: item.show,
      date: `${String(item.dateTime[2]).padStart(2, "0")}-${String(
        item.dateTime[1]
      ).padStart(2, "0")}-${String(item.dateTime[0]).slice(2)}`,
      miqyosi: item.scale,
      link: <Link to={item.link}>{item.link}</Link>,
      action: (
        <Popconfirm
          title={`${item.postType}ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "POSTS")}
        >
          <Button danger>
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataTableMedia = media_eventData?.map((item, index) => {
    let type = ""; // Mahalliy oʻzgaruvchi sifatida ishlatamiz
    if (item.mediaEventType === "PRESS_CONFERENCE") {
      type = "Matbuot anjumani";
    } else if (item.mediaEventType === "BRIEFING") {
      type = "Brifing";
    } else if (item.mediaEventType === "PRESS_TOUR") {
      type = "Press tur";
    }
    return {
      key: index + 1,
      eventName: `${item.eventName}`,
      type: (
        <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
          {type}
        </div>
      ),
      stuffs: item.stuff.map((i) => {
        return i + ", ";
      }),
      messengers: item.messengers
        ? Object.entries(item.messengers).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      newspapers: item.newspapers
        ? Object.entries(item.newspapers).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      radio_channels: item.radio_channels
        ? Object.entries(item.radio_channels).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      tv_channels: item.tv_channels
        ? Object.entries(item.tv_channels).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "MEDIA_EVENT")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataMaterial = materialsData?.map((item, index) => {
    let type = ""; // Mahalliy oʻzgaruvchi sifatida ishlatamiz
    if (item.materialType === "VIDEO") {
      type = "Video";
    } else if (item.materialType === "INFOGRAPHIC") {
      type = "Infografika";
    } else {
      type = "Audio";
    }

    const publishDate = item.publishDate
      .map((num) => (num > 10 ? num : `0${num}`))
      .join("-");
    return {
      key: index + 1,
      topic: `${item.topic}`,
      type: (
        <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
          {type}
        </div>
      ),
      massMedia: item.massMedia,
      publishDate: publishDate,
      socialMediaName: item.socialMediaName,
      link: <Link to={`${item.link}`}>{item.link}</Link>,
      action: (
        <Popconfirm
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "MATERIALS")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataOnline = online_broadcastData?.map((item, index) => {
    const publishDate = item.eventDate
      .map((num) => (num > 10 ? num : `0${num}`))
      .join("-");
    return {
      key: index + 1,
      title: `${item.title}`,
      date: publishDate,
      participation: item.stuff.map((i, index) => (
        <span key={index}>{i}, </span>
      )),
      mesengerTitle: item.messenger,
      amountAttand: item.numberOfPeople,
      link: <Link to={`${item.link}`}> {item.link}</Link>,
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "ONLINE_BROADCAST")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataOfficial = official_pageData?.map((item, index) => {
    return {
      key: index + 1,
      telegram: (
        <div className="flex gap-3">
          <Link to={item.messengersAndLinks.TELEGRAM} className="font-semibold">
            {item.messengersAndLinks.TELEGRAM}
          </Link>{" "}
          <span>{item.followers.TELEGRAM}</span>
        </div>
      ),
      instagram: (
        <div className="flex gap-3">
          <Link
            to={item.messengersAndLinks.INSTAGRAM}
            className="font-semibold"
          >
            {item.messengersAndLinks.INSTAGRAM}
          </Link>{" "}
          <span>{item.followers.INSTAGRAM}</span>
        </div>
      ),
      youtube: (
        <div className="flex gap-3">
          <Link to={item.messengersAndLinks.YOUTUBE} className="font-semibold">
            {item.messengersAndLinks.YOUTUBE}
          </Link>{" "}
          <span>{item.followers.YOUTUBE}</span>
        </div>
      ),
      x: (
        <div className="flex gap-3">
          <Link to={item.messengersAndLinks.X} className="font-semibold">
            {item.messengersAndLinks.X}
          </Link>{" "}
          <span>{item.followers.X}</span>
        </div>
      ),
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "OFFICIAL_PAGE")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataMediaProjects = media_ProjectsData?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.name}`,
      description: item.description,
      tarmoqTuri: item.massMedia,
      period: item.period,
      link: <Link to={`${item.link}`}> {item.link}</Link>,
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "MEDIA_PROJECTS")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataCoverage = coveragesData?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.eventName}`,
      tadbirTuri: item.eventType,
      yoritShakli: item.publishType,
      type: item.massMedia,
      link: item.mediaLinks
        ? Object.entries(item.mediaLinks).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      publishDate: item.publishDate,
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "COVERAGES")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  const dataForeign = foreignData?.map((item, index) => {
    return {
      key: index + 1,
      title: `${item.title}`,
      yoritShakli: item.illumination,
      type: item.typeMediaSocial,
      link: item.mediaNameAndLink
        ? Object.entries(item.mediaNameAndLink).map(([name, url]) => (
            <div key={name}>
              <span>{name}</span>: <Link to={url}>`{url}`</Link>
            </div>
          ))
        : "",
      publishDate: item.publishedDate,
      action: (
        <Popconfirm
          title={`ga tegishli post`}
          description="Haqiqatdan ham oʻchirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOpenModelDelete(item.id, "FOREIGN_MATERIAL")}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  // Excel All Employees
  const handleGetEmployeeExcel = async () => {
    try {
      const response = await fetch(`${ip}/excel/export-employees`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  // Excel Postlar
  const handlePostDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-posts?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Employee_posts.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleMediaEventDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-media-events?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "MediaEvents.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleMaterialDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-materials?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Materials.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleOnlineDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-broadcasts?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Broadcasts.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleMediaProjectDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-media-projects?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "MediaProjects.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleCoverageDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-coverages?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Coverage.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleForeignDownloadExcel = async (id) => {
    try {
      const response = await fetch(
        `${ip}/excel/export-employee-foreign-material?employeeId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Faylni yuklab olishda xatolik yuz berdi");
      }

      // Faylni blob formatida olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Foreign.xlsx"); // yuklanayotgan fayl nomi
      document.body.appendChild(link);
      link.click(); // yuklashni boshlash
      window.URL.revokeObjectURL(url); // URLni tozalash
      link.remove(); // elementni tozalash
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const onFinishDelete = (values) => {
    // Yig‘ilgan checkbox qiymatlarini koʻrish
    const fieldsValue = {
      reasons: values.renasans,
      postId: modalIDKEY.id,
      postType: modalIDKEY.key,
    };

    superAdminDeleteEmployeePost.mutate(fieldsValue);
    console.log("Yuboriladigan obyekt:", fieldsValue);
  };

  return (
    <div>
      <div className=" md:me-[20px] me-[10px]  flex-1 overflow-x-scroll">
        <div className="pb-16 container lg:max-w-[2560px] md:max-w-[1600px]  mx-auto  mt-4">
          {/* Televediniye */}
          {contextHolder}
          <div className="mb-3 flex justify-between w-full items-center">
            <h2 className="text-[30px]  dark:text-white">
              <span className="font-[500] mr-2">Barcha Xodimlar</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={searchEmployee}
                  className="dark:bg-gray-600 dark:text-white"
                  style={{
                    borderRadius: "0px",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    height: "36px",
                  }}
                />
                <button className="h-[36px] px-4 bg-blue-400 rounded-r-[5px] text-white">
                  <IoMdSearch />
                </button>
              </div>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleGetEmployeeExcel}
              >
                Excel
              </button>
            </div>
          </div>
          <div>
            <Modal
              title="Edit Email"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <div>
                <Form
                  onFinish={onFinish}
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  className="flex flex-col items-end"
                >
                  <Form.Item name="editEmail" className="w-full ">
                    <Input className="w-full" />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    key="submit"
                    className="justify-end"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Modal>

            <Modal
              title={<p>Xodim ma’lumotlari</p>}
              open={open}
              onCancel={() => setOpen(false)}
              footer={null}
              width="90%"
              style={{ maxHeight: "100%", overflowY: "scroll" }}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : Object.keys(dataTableOneEmployee).length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  {" "}
                  {/* Jadvalning kengligi katta boʻlsa, gorizontal skroll qoʻshish */}
                  <Table
                    columns={columnsOneEmployee}
                    dataSource={dataTableOneEmployee}
                    bordered
                    rowClassName="dark:bg-inherit"
                    pagination={{ pageSize: 10 }}
                  />
                </div>
              ) : (
                <p>No data available</p>
              )}
            </Modal>

            {/* Postlar va tadborlar uchun modal */}
            <Modal
              title={<p>Xodimning qoʻygan postlari</p>}
              open={open1}
              onCancel={() => setOpen1(false)}
              footer={null}
              width="90%"
              style={{ maxHeight: "100%", overflowY: "scroll" }}
            >
              {loading1 ? (
                <div className="flex justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : postsData?.length > 0 ||
                media_eventData?.length > 0 ||
                materialsData?.length > 0 ||
                online_broadcastData?.length > 0 ||
                official_pageData?.length > 0 ||
                media_ProjectsData?.length > 0 ||
                coveragesData?.length > 0 ||
                foreignData?.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  {" "}
                  {/* Jadvalning kengligi katta boʻlsa, gorizontal skroll qoʻshish */}
                  <Modal
                    title="Basic Modal"
                    open={modelDelete}
                    onOk={handleOkDelete}
                    onCancel={handleCancelDelete}
                  >
                    <Form
                      form={formDelete}
                      name="deleteModal"
                      initialValues={{ remember: true }}
                      onFinish={onFinishDelete}
                    >
                      <Form.Item name="renasans">
                        <Checkbox.Group>
                          <Checkbox value="Kiritilgan link xato">
                            Kiritilgan link xato
                          </Checkbox>
                          <Checkbox value="Ma’lumot eskiligi tufayli">
                            Ma’lumot eskiligi tufayli
                          </Checkbox>
                          <Checkbox value="Imloviy xatolar mavjud">
                            Imloviy xatolar mavjud
                          </Checkbox>
                        </Checkbox.Group>
                      </Form.Item>
                    </Form>
                  </Modal>
                  {postsData?.length > 0 ? (
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          Faoliyatga doir axborotni OAV, Internet saytlar va
                          ijtimoiy tarmoqlar orqali yoritilishi
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handlePostDownloadExcel(postsData[0].employee?.id)
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsPosts}
                        dataSource={dataTablePosts}
                        bordered
                        rowClassName="dark:bg-inherit"
                        pagination={{ pageSize: 10 }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {media_eventData?.length > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          Matbuot kotibi tomonidan o‘tkazilgan mediatadbirlar.
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handleMediaEventDownloadExcel(
                              media_eventData[0].employee?.id
                            )
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsMedia}
                        dataSource={dataTableMedia}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {materialsData?.length > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          Faoliyatga doir axborotni yetkazib berishda akustik va
                          vizual materiallardan foydalanganligi
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handleMaterialDownloadExcel(
                              materialsData[0].employee?.id
                            )
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsmaterial}
                        dataSource={dataMaterial}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {online_broadcastData?.length > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          Ijtimoiy tarmoqlarda berilgan onlayn efir (ovozli
                          chat) lar soni
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handleOnlineDownloadExcel(
                              online_broadcastData[0].employee?.id
                            )
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsOnline}
                        dataSource={dataOnline}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {official_pageData?.length > 0 ? (
                    <div>
                      <h3 className="text-[15px] font-semibold mb-2">
                        Ijtimoiy tarmoq va messenjerlardagi OTM rasmiy
                        sahifalarida obunachilar soni
                      </h3>

                      <Table
                        columns={columnsOfficial}
                        dataSource={dataOfficial}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {media_ProjectsData?.length > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          Axborot xizmati tomonidan yoʻlga qoʻyilgan
                          medialoyihalar
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handleMediaProjectDownloadExcel(
                              media_ProjectsData[0].employee?.id
                            )
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsMediaProjetcs}
                        dataSource={dataMediaProjects}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {coveragesData?.length > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          OTM faoliyatidagi turli tadbirlarni ommaviy axborot
                          vositalari orqali yoritilganlik darajasi
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handleCoverageDownloadExcel(
                              coveragesData[0].employee?.id
                            )
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsCoverage}
                        dataSource={dataCoverage}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {foreignData?.length > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[15px] font-semibold mb-2">
                          Xorijiy OAVlarida OTM faoliyatiga doir E’lon qilingan
                          materiallar
                        </h3>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded"
                          onClick={() =>
                            handleForeignDownloadExcel(
                              foreignData[0].employee?.id
                            )
                          }
                        >
                          Excel
                        </button>
                      </div>
                      <Table
                        columns={columnsForeign}
                        dataSource={dataForeign}
                        bordered
                        rowClassName=" dark:bg-inherit"
                        className="z-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className=" w-full h-[100vh] top-0 left-0 flex items-center justify-center z-[]">
                  <div className="text-3xl text-[#0000007e] select-none">
                    <img src={gif} alt="" />
                  </div>
                </div>
              )}
            </Modal>
            <div>
              <Table
                columns={columns}
                dataSource={dataTable}
                bordered
                rowClassName="dark:bg-inherit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
