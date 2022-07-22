import commonStyles from "../../styles/Home.module.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { Row, Col, Divider, Input, Button } from "antd";
import Form, { Item, useForm } from "../../components/Form";
import styles from "./users.module.css";
import useUser from "../../hooks/useUser";
import { User } from "../../types/users.type";
import { useEffect, useState } from "react";
import usersCore from "../../api/users.api";
import Image from "next/image";

function UserDetail() {
  const router = useRouter();
  const [form] = useForm<FormData>();
  const { id } = router.query;
  const { user, isLoading } = useUser(id);
  const [formData, setFormData] = useState<User>();
  
  useEffect(()=>{
    if(user) {
      setFormData(user);
    }
  },[user]);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const onSubmit= async (values: any) => {
    usersCore.updateUserApi(`https://reqres.in/api/users/${id}`,values);
  };
  
  return (
    <div className={commonStyles.container}>
      <Divider orientation="left">User detail</Divider>
      <Row gutter={15}>
        <Col lg={16} xs={12}>
          <div className="information">
            <div className="title">
              <h3>{formData?.email}</h3>
              <Image alt="Input image" src={formData?.avatar || '/vercel.svg'} width={200} height={200}/>
            </div>
            <div className="description">
              <Form form={form} onFinish={onSubmit} values={formData}>
                <Item
                  name="email"
                  label="Email"
                  rules={[{ type: "email" }, { required: true }]}
                  form={form}
                  className={styles.wrapperForm}
                >
                  <Input />
                </Item>
                <Item shouldUpdate noStyle form={form}>
                  {({ isFieldsTouched, getFieldsError }) => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      disabled={
                        !isFieldsTouched() ||
                        !!getFieldsError().filter(({ errors }) => errors.length)
                          .length
                      }
                    >
                      Submit
                    </Button>
                  )}
                </Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UserDetail;

// export async function getStaticProps(context: { params: { id: any } }) {
//   const resp = await fetch(`https://reqres.in/api/users/${context.params.id}`);
//   const data = await resp.json();

//   return {
//     props: {
//       user: data.data,
//     },
//     revalidate: 10,
//   };
// }

// export async function getStaticPaths() {
//   const response = await fetch("https://reqres.in/api/users?page=1");
//   const data = await response.json();
//   const paths = data.data.map((item: any) => {
//     return {
//       params: {
//         id: item.id.toString(),
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }
