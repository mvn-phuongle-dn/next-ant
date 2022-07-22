import styles from "../../styles/Home.module.css";
import "antd/dist/antd.css";
import ListItem from "../../components/product/itemList";
import { Row, Divider } from "antd";
import React, { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
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

function Products({ dataList }: Props) {
  const renderData =
    dataList &&
    dataList.map((item: dataItem) => {
      return <ListItem data={item} key={item.id} />;
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

export default Products;

export async function getStaticProps() {
  const resp = await fetch("https://reqres.in/api/products?page=1");
  const data = await resp.json();
  return {
    props: {
      dataList: data.data,
    },
    revalidate: 10,
  };
}
