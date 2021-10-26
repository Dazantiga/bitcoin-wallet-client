import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form as FormFormik } from "formik";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

export default () => {
  const history = useHistory();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Informe pelo menos 3 caracteres")
      .max(80, "Tamanho máximo permitido: 80 caracteres")
      .required("Informe o nome"),
    lastName: Yup.string()
      .min(3, "Informe pelo menos 3 caracteres")
      .max(80, "Tamanho máximo permitido: 80 caracteres")
      .required("Informe o sobrenome"),
    email: Yup.string()
      .max(80, "Tamanho máximo permitido: 80 caracteres")
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(80)
      .required("A senha é obrigatória"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await ApiService.post("/users", values);

      if (response.data) {
        resetForm();
        setSubmitting(false);

        toast.success(
          "Cadastro realizado com sucesso, você já pode fazer login"
        );

        history.push("/auth/sign-in");
      }
    } catch (err) {
      setSubmitting(false);
      toast.error("Não foi possível criar sua conta");
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.DashboardOverview.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                  }) => {
                    return (
                      <FormFormik className="mt-4">
                        <Form.Group id="firstName" className="mb-4">
                          <Form.Label>First Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="firstName"
                              autoFocus
                              placeholder="First Name"
                              onBlur={handleBlur}
                              value={values.firstName}
                              disabled={isSubmitting}
                              isInvalid={touched.firstName && errors.firstName}
                              onChange={handleChange}
                            />
                            {touched.firstName && errors.firstName && (
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                              </Form.Control.Feedback>
                            )}
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="lastName" className="mb-4">
                          <Form.Label>Last Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="lastName"
                              autoFocus
                              placeholder="Last Name"
                              onBlur={handleBlur}
                              value={values.lastName}
                              disabled={isSubmitting}
                              isInvalid={touched.lastName && errors.lastName}
                              onChange={handleChange}
                            />
                            {touched.lastName && errors.lastName && (
                              <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                              </Form.Control.Feedback>
                            )}
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="email" className="mb-4">
                          <Form.Label>Your Email</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="example@company.com"
                              onBlur={handleBlur}
                              value={values.email}
                              disabled={isSubmitting}
                              isInvalid={touched.email && errors.email}
                              onChange={handleChange}
                            />
                            {touched.email && errors.email && (
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            )}
                          </InputGroup>
                        </Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label>Your Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              onBlur={handleBlur}
                              value={values.password}
                              disabled={isSubmitting}
                              isInvalid={touched.password && errors.password}
                              onChange={handleChange}
                            />
                            {touched.password && errors.password && (
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            )}
                          </InputGroup>
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                        >
                          Sign up
                        </Button>
                      </FormFormik>
                    );
                  }}
                </Formik>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link
                      as={Link}
                      to={Routes.Signin.path}
                      className="fw-bold"
                    >
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
