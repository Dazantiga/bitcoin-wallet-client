import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form as FormFormik } from "formik";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await ApiService.post("/auth", values);

      if (response.data) {
        dispatch({
          type: "SET_TOKEN",
          payload: { token: response.data.access_token },
        });

        resetForm();
        setSubmitting(false);

        toast.success("Login realizado com sucesso");

        history.push("/dashboard/overview");
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      toast.error("Não foi possível realizar o login");
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
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
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
                        <Form.Group id="email" className="mb-4">
                          <Form.Label>Your Email</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
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
                        <Form.Group>
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
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <Form.Check type="checkbox">
                              <FormCheck.Input
                                id="defaultCheck5"
                                className="me-2"
                              />
                              <FormCheck.Label
                                htmlFor="defaultCheck5"
                                className="mb-0"
                              >
                                Remember me
                              </FormCheck.Label>
                            </Form.Check>
                            <Card.Link className="small text-end">
                              Lost password?
                            </Card.Link>
                          </div>
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                        >
                          Sign in
                        </Button>
                      </FormFormik>
                    );
                  }}
                </Formik>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className="fw-bold"
                    >
                      {` Create account `}
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
