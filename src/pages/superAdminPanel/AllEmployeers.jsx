import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Button, Form, Input, Modal, Table } from "antd";

const sharedOnCell = () => {};

const columns = [
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
    title: "Ko'rsatuvda qatnashgan OTM vakili F.I.O",
    dataIndex: "fio",
    onCell: sharedOnCell,
  },
  {
    title: "Postlar soni",
    dataIndex: "postNumber",
    onCell: sharedOnCell,
  },
  {
    title: "Email manzili",
    dataIndex: "email",
    onCell: sharedOnCell,
  },
  {
    title: "Email passwordi",
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
];

export default function AllEmployeers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id) => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (value) => {
    console.log(value);
  };

  const dataTable = [
    {
      key: 1,
      fio: "Nurzod",
      img: (
        <div className="w-[100px] h-[50px]">
          <img
            className="w-full h-full object-cover"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
      ),
      postNumber: 45,
      email: (
        <div className="flex justify-between items-center">
          <p>nurzodbekmardiyev1306@gmail</p>
        </div>
      ),
      password: (
        <div className="flex justify-between items-center">
          <p>Nurzod7777</p>
        </div>
      ),
      phoneNumber: "+998883921383",
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
          o'chirish
        </button>
      ),
    },
  ];

  // const dataTable = data?.map((item, index) => {
  //   return {
  //     key: index + 1,
  //     fio: `${item.showedUser}`,
  //     tvName: item.media,
  //     appName: item.show,
  //     date: `${String(item.dateTime[2]).padStart(2, "0")}-${String(
  //       item.dateTime[1]
  //     ).padStart(2, "0")}-${String(item.dateTime[0]).slice(2)}`,
  //     miqyosi: item.scale,
  //     link: item.link,
  //     action: (
  //       <button
  //         className=" transition-all duration-150 bg-[#FFF2E8] px-2 py-1 rounded-md text-[#E06E4D] hover:text-red-400 border border-[#E06E4D]"
  //         onClick={() => handleDeletePost(item.id)}
  //       >
  //         o'chirish
  //       </button>
  //     ),
  //   };
  // });
  return (
    <div>
      <div className="md:ms-[370px] ms-[50px] md:me-[20px] me-[10px] md:pt-24 pt-14 flex-1 overflow-x-scroll">
        <div className="pb-16 container lg:max-w-[2560px] md:max-w-[1600px]  mx-auto  mt-4">
          {/* Televediniya */}

          <div className="mb-3">
            <h2 className="text-[30px]  dark:text-white">
              <span className="font-[500] mr-2">Barcha Xodimlar</span>
            </h2>
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
            <div className="televediniya">
              <Table
                columns={columns}
                dataSource={dataTable}
                bordered
                rowClassName=" dark:bg-inherit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
