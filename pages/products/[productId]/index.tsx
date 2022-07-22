import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import { Row, Col, Image, Divider, Layout } from 'antd';

export interface dataItem {
  id: number,
  name: string,
  image: string,
  color: string,
  year: number
}

type props = {
  product: dataItem
}

function ProductDetail({ product }: props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  const handleClick = () => {
    router.push('/product')
  }

  return (
    <div className={styles.container}>
      <Divider orientation="left">Products detail</Divider>
      <Row gutter={15}>
        <Col lg={16} xs={12}>
          <div className="information">
            <div className="title">
              <h3>{product.name}</h3>
            </div>
            <div className="description"  style={{color: product.color}}>
              {product.color}
            </div>
            <div className="price">
              {product.year}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail

export async function getStaticProps(context: any) {
  const { params } = context
  console.log('params.productId', params.productId);
  const reponse = await fetch(`https://reqres.in/api/products/${params.productId}`);
  const data = await reponse.json();
  return {
    props: {
      product: data.data
    }
  }
}

export async function getStaticPaths() {
  const reponse = await fetch('https://reqres.in/api/products?page=1');
  const data = await reponse.json();
  const paths = data.data && data.data.map((item: any) => {
    return {
      params: {
        productId: `${item.id}`
      }
    }
  })
  return {
    paths, //paths: paths,
    fallback: 'blocking',
  }
}
