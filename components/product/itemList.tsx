import React from 'react';
import { Col, Image} from 'antd';
import Link from 'next/link';
import {dataItem} from '../../pages/products'

type Props = {
  data: dataItem
}

function ListItem({data}: Props) {
  
  return (
    <Col lg={6} xs={12} key={data.id}>
      <div className="item">
        <div className="wrapper">
          <Link href={`/products/${data?.id}`} passHref>
            <a>{data?.name}</a>
          </Link>
          <div className="description">
            {data?.color}
          </div>
          <div className="price">
            {data?.year}
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ListItem;
