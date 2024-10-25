import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Table,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { oavIV } from "../../feature/queryApi";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
const sharedOnCell = () => {};

// columnslar infoniki
const columns = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Ko'rsatuvda qatnashgan OTM vakili F.I.O",
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
    title: "Xabar",
    dataIndex: "notification",
    onCell: sharedOnCell,
  },
  {
    title: "Harakat",
    dataIndex: "action",
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
    title: "No",
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
    title: "Shtatdagi o'rni",
    dataIndex: "shtat",
    onCell: sharedOnCell,
  },
  {
    title:
      "Rektorning axborot siyosati masalalari bo'yicha maslahatchisi etib belgilangan (Asos hujjat raqami)",
    dataIndex: "hujjat_raqami",
    onCell: sharedOnCell,
  },
  {
    title:
      "Matbuot kotibining kasbiy va qo'shimcha kompetentsiyasi (siz nima qilasiz)",
    dataIndex: "qushimcha_kom",
    onCell: sharedOnCell,
  },
  {
    title:
      "Matbuot bo'limi uchun alohida xona ajratilganligi (ha/yo'q bo'lsa qaysi bo'lim bilan birga o'tiradi)",
    dataIndex: "alohidaHona",
    onCell: sharedOnCell,
  },
  {
    title:
      "Oxirgi bir yillik oylik maoshining o'rtacha miqdori (UzASBO tizimi yoki my.gov.uz orqali olingan ma'lumot fayl shaklida taqdim etiladi)",
    dataIndex: "urtacha_oylik",
    onCell: sharedOnCell,
  },
  {
    title:
      "Alohida Matbuot/axborot xizmati bo'limi tashkil etilganligi (bo'lsa unda nechta shtat bor yoki nechta boshqa bo'limdan jalb qilingan)",
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
      "Moddiy-texnik bazasining holati  (kamera soni va uning nomi, modeli;// telefon: bor/yo'q; televizor: bor/yo'q; kompyuter jamlamasi soni va nechtasi hujjat bilan ishlash uchun, nechtasi montaj uchun; Qo'shimcha izoh)",
    dataIndex: "moddiyTexnik",
    onCell: sharedOnCell,
  },
];

// columnslar postlarniki
const columnsPosts = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Ko'rsatuvda qatnashgan OTM vakili F.I.O",
    dataIndex: "fio",
    onCell: sharedOnCell,
  },
  {
    title: "Faoliyatga doir axborot turi",
    dataIndex: "type",
    onCell: sharedOnCell,
  },
  {
    title: "TV nomi",
    dataIndex: "tvName",
    onCell: sharedOnCell,
  },
  {
    title: "Dastur nomi",
    dataIndex: "appName",
    onCell: sharedOnCell,
  },
  {
    title: "Chiqqan sanasi va vaqti",
    dataIndex: "date",
    onCell: sharedOnCell,
  },
  {
    title: "Miqyosi (respublika, hududiy yoki xorijiy)",
    dataIndex: "miqyosi",
    onCell: sharedOnCell,
  },
  {
    title: "Havolasi (http bilan boshlanishi shart!)",
    dataIndex: "link",
    onCell: sharedOnCell,
  },
  {
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsMedia = [
  {
    title: "No",
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
    title: "Ishchilar Ro'yhati",
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
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsmaterial = [
  {
    title: "No",
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
    title: " E'lon qilingan OAV/Ijtimoiy tarmoq turi",
    dataIndex: "massMedia",
    onCell: sharedOnCell,
  },
  {
    title: "E'lon qilingan sanasi",
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
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsOfficial = [
  {
    title: "No",
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
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsOnline = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Onlayn efir/ovozli chat mavzusi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "O'tkazilgan sanasi",
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
    title: "Harakat",
    dataIndex: "action",
    onCell: sharedOnCell,
  },
];

const columnsMediaProjetcs = [
  {
    title: "No",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Medialoyiha nomi",
    dataIndex: "title",
    onCell: sharedOnCell,
  },
  {
    title: "Loyiha tavfsifi",
    dataIndex: "description",
    onCell: sharedOnCell,
  },
  {
    title: "E'lon qilingan OAV/Ijtimoiy tarmoq turi",
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
    title: "Harakat",
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
  const [postsData, setPostsData] = useState();
  const [coveragesData, setCoveragesData] = useState();
  const [materialsData, setMaterialsData] = useState();
  const [media_eventData, setMedia_eventData] = useState();
  const [online_broadcastData, setOnline_broadcastData] = useState();
  const [official_pageData, setOfficial_pageData] = useState();
  const [media_ProjectsData, setMedia_ProjectsData] = useState();
  const [modelDelete, setModelDelete] = useState(false);
  const [formDelete] = Form.useForm();
  const [modalIDKEY, setModalIDKEY] = useState();

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
  // console.log(data);

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
            console.log(data);
            setPostsData(data);
          } else if (key === "COVERAGES") {
            setCoveragesData(data);
          } else if (key === "MATERIALS") {
            setMaterialsData(data);
          } else if (key === "MEDIA_EVENT") {
            console.log(data);
            setMedia_eventData(data);
          } else if (key === "MEDIA_PROJECTS") {
            setMedia_ProjectsData(data);
          } else if (key === "ONLINE_BROADCAST") {
            setOnline_broadcastData(data);
          } else if (key === "OFFICIAL_PAGE") {
            setOfficial_pageData(data);
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
  };

  const dataTable = data?.map((item, index) => {
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
          O'chirish
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
    let type = ""; // Mahalliy o'zgaruvchi sifatida ishlatamiz
    if (item.postType === "TV_CHANNEL") {
      type = "Televediniya";
    } else if (item.postType === "RADIO_CHANNEL") {
      type = "Radio";
    } else if (item.postType === "MESSENGER") {
      type = "Ijtimoiy tarmoq va messengerlar";
    } else if (item.postType === "WEB_SITE") {
      type = "Internet saytlari";
    } else {
      type = "Ommaviy axborot vositalari";
    }
    return {
      key: index + 1,
      fio: `${item.showedUser}`,
      type: (
        <div className="px-3 py-1 bg-[#E6EEDD] border border-[#5CA53C] text-[#5CA53C] rounded">
          {type}
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
          title={`${type}ga tegishli post`}
          description="Haqiqatdan ham o'chirmoqchimisiz?"
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

  console.log(media_eventData);

  const dataTableMedia = media_eventData?.map((item, index) => {
    let type = ""; // Mahalliy o'zgaruvchi sifatida ishlatamiz
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
          description="Haqiqatdan ham o'chirmoqchimisiz?"
          okText="Yes"
          cancelText="No"
          // onConfirm={() => handleDeleteMediaEvent(item.id)}
        >
          <Button danger>
            {" "}
            <FaTrashAlt />
          </Button>
        </Popconfirm>
      ),
    };
  });

  // Excel
  const getEmployeeExcel = useMutation(
    () =>
      oavIV.getEmployeeExcel(
        {}, // agar kerak bo'lsa values yuboring
        {
          headers: { Authorization: `${token}` },
          responseType: "blob", // bu yerda faylni blob shaklida olishni ta'minlaymiz
        }
      ),
    {
      onSuccess: (response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "employee_data.xlsx"); // fayl nomi
        document.body.appendChild(link);
        link.click(); // yuklashni boshlash
        link.remove(); // elementni tozalash
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleGetEmployeeExcel = () => {
    getEmployeeExcel.mutate();
  };

  const onFinishDelete = (values) => {
    // Yig'ilgan checkbox qiymatlarini ko'rish
    const fieldsValue = {
      reasons: values.renasans,
      postId: modalIDKEY.id,
      postType: modalIDKEY.key,
    };

    console.log("Yuboriladigan obyekt:", fieldsValue);
  };

  return (
    <div>
      <div className=" md:me-[20px] me-[10px] md:pt-24 pt-14 flex-1 overflow-x-scroll">
        <div className="pb-16 container lg:max-w-[2560px] md:max-w-[1600px]  mx-auto  mt-4">
          {/* Televediniya */}

          <div className="mb-3 flex justify-between w-full items-center">
            <h2 className="text-[30px]  dark:text-white">
              <span className="font-[500] mr-2">Barcha Xodimlar</span>
            </h2>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded"
              onClick={handleGetEmployeeExcel}
            >
              Excel
            </button>
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
              title={<p>Xodim ma'lumotlari</p>}
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
                  {/* Jadvalning kengligi katta bo'lsa, gorizontal skroll qo'shish */}
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
              title={<p>Xodimning qo'ygan postlari</p>}
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
              ) : dataTablePosts.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  {" "}
                  {/* Jadvalning kengligi katta bo'lsa, gorizontal skroll qo'shish */}
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
                          <Checkbox value="link1">Link 1</Checkbox>
                          <Checkbox value="link2">Link 2</Checkbox>
                          <Checkbox value="link3">Link 3</Checkbox>
                        </Checkbox.Group>
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Table
                    columns={columnsPosts}
                    dataSource={dataTablePosts}
                    bordered
                    rowClassName="dark:bg-inherit"
                    pagination={{ pageSize: 10 }}
                  />
                  <Table
                    columns={columnsMedia}
                    dataSource={dataTableMedia}
                    bordered
                    rowClassName=" dark:bg-inherit"
                    className="z-0"
                  />
                </div>
              ) : (
                <p>No data available</p>
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
