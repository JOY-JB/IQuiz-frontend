"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useCreatePerformerMutation } from "@/redux/api/userApi";
import { registrationSchema } from "@/schemas/registration";
import { storeUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import registrationImage from "../../assets/registration.png";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const PerformerRegistrationPageComponent = () => {
  const [createPerformer] = useCreatePerformerMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (
    data: RegistrationFormValues
  ) => {
    const { confirmPassword, ...newData } = data;

    if (newData.password !== confirmPassword) {
      message.error("Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await createPerformer(newData).unwrap();

      if (res?.accessToken) {
        router.push("/");
        message.success("Registered successfully and logged in!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col
        sm={12}
        md={10}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={registrationImage}
          width={500}
          alt="Registration image"
          style={{ maxWidth: "100%" }}
        />
      </Col>
      <Col sm={12} md={8}>
        <h1
          style={{
            marginBottom: "1rem",
          }}
        >
          Registration
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(registrationSchema)}
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <FormInput name="name" label="Name" type="text" size="large" />
              </Col>

              <Col span={24}>
                <FormInput
                  name="email"
                  label="User Email"
                  type="text"
                  size="large"
                />
              </Col>

              <Col span={24}>
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  size="large"
                />
              </Col>

              <Col span={24}>
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  size="large"
                />
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "16px" }}
            >
              Register
            </Button>
          </Form>

          <p style={{ marginTop: "35px", textAlign: "center" }}>
            Already registered ? <Link href="/login">Login here</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default PerformerRegistrationPageComponent;
