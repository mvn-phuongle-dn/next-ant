import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import "antd/dist/antd.css";
import ListItem from "../../components/product/itemList";
import { Row, Divider, Col } from "antd";
import React, { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useUsers from "../../hooks/useUsers";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";

export interface dataItem {
  id: number;
  name: string;
  image: string;
  color: string;
  year: number;
}

type Props = {
  dataList: Array<dataItem>;
};

function Users() {
  const { users, isLoading, pagination } = useUsers();
  const renderData =
    users &&
    users.map((data) => {
      return (
        <Col lg={6} xs={12} key={data.id}>
          <div className="item">
            <div className="wrapper">
              <Link href={`/users/${data?.id}`} passHref>
                <a>{data?.email}</a>
              </Link>
              <div className="description">{data?.first_name}</div>
              <div className="price">{data?.last_name}</div>
            </div>
          </div>
        </Col>
      );
    });
  const inputRef = useRef<any>(null);
  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className="container">
          <Divider orientation="left">List products</Divider>
          <input ref={inputRef} type="text" />
          <button onClick={handleClick}>
            <SearchOutlined />
          </button>
          <Row gutter={15}>{renderData}</Row>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Users;
