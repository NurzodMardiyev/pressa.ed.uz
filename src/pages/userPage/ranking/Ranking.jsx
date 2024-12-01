import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Rate, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import BarChartForRanking from "./BarChartForRanking";
import { useMutation, useQueryClient } from "react-query";
import "../../../App.css";
import { oavIV } from "../../../feature/queryApi";

export default function Ranking() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [univerLists, setUniverLists] = useState([]);
  const queryClient = useQueryClient();

  const reUniverLists = univerLists?.map((item, index) => {
    let value;
    if (index <= 10) {
      value = 5;
    } else if (index <= 30) {
      value = 4;
    } else if (index <= 60) {
      value = 3;
    } else if (index <= 100) {
      value = 2;
    } else {
      value = 1;
    }
    return {
      ...item,
      id: index + 1,
      key: index,
      grade: (
        <Rate
          className={`flex md:text-[14px] text-[12px] `}
          disabled
          defaultValue={value}
        />
      ),
    };
  });

  const raytingPosts = useMutation(oavIV.ranking, {
    onSuccess: (res) => {
      // console.log(res);
      setUniverLists(res);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    raytingPosts.mutate();
  }, []);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Izlash`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space className="w-[220px] md:w-auto">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 30,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "T/r",
      dataIndex: "id",
      key: (record, index) => index, // yoki faqat 'key: "id"' qilishingiz mumkin
      // width: "10px",
    },
    {
      title: "OTM nomi",
      dataIndex: "name",
      key: "name",
      // width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ball",
      dataIndex: "totalGrade",
      key: "totalGrade",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Daraja",
      dataIndex: "grade",
      key: "totalGrade",
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <div>
      <div className="my-3 flex justify-start text-start dark:text-white">
        <h2
          className="md:text-[22px] font-semibold text-[20px] max-w-[520px]"
          style={{ fontFamily: "Roboto" }}
        >
          Oliy ta’lim muassasalarining OAVda chiqishi bo‘yicha reytingi
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="md:col-span-5 col-span-12 max-w-[768px] md:max-w-full rankingtable">
          {" "}
          <Table
            columns={columns}
            dataSource={reUniverLists}
            pagination={{ pageSize: 8 }}
            className="w-full"
          />
        </div>
        <div className="md:col-span-7 col-span-12 md:block hidden">
          <BarChartForRanking />
        </div>
      </div>
    </div>
  );
}
