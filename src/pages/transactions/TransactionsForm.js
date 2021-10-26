import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
} from "@themesberg/react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form as FormFormik } from "formik";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";
import { calculateBitcoin } from "../../helpers/helpers";

export default () => {
  const history = useHistory();
  const id = useParams().id || null;
  const [totalBitcoin, setTotalBitcoin] = useState(0);
  const initialValues = {
    valueInvested: "",
    date: "",
    btcbToBrl: "",
  };

  const validationSchema = Yup.object().shape({
    valueInvested: Yup.string()
      .min(3, "Informe pelo menos 3 dígitos")
      .required("Informe o valor da transação"),
    date: Yup.date().required("Informe a data da transação"),
    btcbToBrl: Yup.string()
      .min(3, "Informe pelo menos 3 dígitos")
      .required("Informe o valor pago pelo bitcoin"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const method = id ? "patch" : "post";
      const url = id ? `/transactions/${id}` : "/transactions";
      const formData = Object.assign(values, { totalBitcoin });
      await ApiService[method](url, {
        ...formData,
        valueInvested: Number(formData.valueInvested),
        btcbToBrl: Number(formData.btcbToBrl),
        bitcoinQuantity: Number(formData.totalBitcoin),
        date: new Date(formData.date).toLocaleDateString(),
      });

      resetForm();
      setSubmitting(false);

      toast.success("Transação salva com sucesso");

      history.push("/transactions/transactions");
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Não foi possível salvar a transação");
    }
  };

  const handlePrice = async (setValues, values) => {
    try {
      if (values.valueInvested !== "" && values.date !== "") {
        const response = await ApiService.get("/tickers", {
          params: {
            value: values.valueInvested,
            date: new Date(values.date).toLocaleDateString(),
          },
        });

        if (response.data) {
          setValues("btcbToBrl", response.data.BTCPrice, false);
        }
      } else {
        toast.info("Por favor, informar o valor e data da transação");
        return;
      }
    } catch (err) {
      toast.error("Não foi possível recuperar o valor da cotação");
    }
  };

  return (
    <>
      <div className="d-block mb-4 mb-md-0">
        <Breadcrumb
          className="d-none d-md-inline-block"
          listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
        >
          <Breadcrumb.Item>
            <FontAwesomeIcon icon={faHome} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Volt</Breadcrumb.Item>
          <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Transactions</h4>
        <p className="mb-0">Your web analytics dashboard template.</p>
      </div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Cadastro de Transação</h5>
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
              setFieldValue,
            }) => {
              useEffect(() => {
                if (values.valueInvested && values.btcbToBrl) {
                  setTotalBitcoin(
                    calculateBitcoin(values.valueInvested, values.btcbToBrl)
                  );
                }
              }, [values.valueInvested, values.btcbToBrl]);

              useEffect(() => {
                if (id) {
                  (async () => {
                    const response = await ApiService.get(
                      `/transactions/${id}`
                    );
                    setFieldValue(
                      "valueInvested",
                      response.data.valueInvested,
                      false
                    );
                    setFieldValue(
                      "date",
                      moment(response.data.date).format("YYYY-MM-DD"),
                      false
                    );
                    setFieldValue("btcbToBrl", response.data.btcbToBrl, false);
                  })();
                }
              }, [id]);

              return (
                <FormFormik>
                  <Row>
                    <Col md={3} className="mb-3">
                      <Form.Group id="totalValue">
                        <Form.Label>Valor Transação</Form.Label>
                        <Form.Control
                          type="text"
                          name="valueInvested"
                          placeholder="100,00"
                          onBlur={handleBlur}
                          value={values.valueInvested}
                          disabled={isSubmitting}
                          isInvalid={
                            touched.valueInvested && errors.valueInvested
                          }
                          onChange={handleChange}
                        />
                        {touched.valueInvested && errors.valueInvested && (
                          <Form.Control.Feedback type="invalid">
                            {errors.valueInvested}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col md={3} className="mb-3">
                      <Form.Group id="birthday">
                        <Form.Label>Data Transação</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={values.date}
                          placeholder="dd/mm/yyyy"
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          isInvalid={touched.date && errors.date}
                          onChange={handleChange}
                        />
                        {touched.date && errors.date && (
                          <Form.Control.Feedback type="invalid">
                            {errors.date}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} className="mb-3">
                      <Form.Group id="btcbToBrl">
                        <Form.Label>Preço Bitcoin</Form.Label>
                        <Form.Control
                          type="text"
                          name="btcbToBrl"
                          placeholder="Digite ou busque cotação"
                          onBlur={handleBlur}
                          value={values.btcbToBrl}
                          disabled={isSubmitting}
                          isInvalid={touched.btcbToBrl && errors.btcbToBrl}
                          onChange={handleChange}
                        />
                        {touched.btcbToBrl && errors.btcbToBrl && (
                          <Form.Control.Feedback type="invalid">
                            {errors.btcbToBrl}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={1} className="mb-3">
                      <Button
                        variant="secondary"
                        className="m-1 button_right_input"
                        type="button"
                        onClick={() => handlePrice(setFieldValue, values)}
                      >
                        Buscar
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} className="mb-3">
                      <Form.Group id="qtyBitcoin">
                        <Form.Label>Bitcoin</Form.Label>
                        <Form.Control
                          disabled
                          required
                          type="text"
                          value={totalBitcoin}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <ButtonGroup>
                      <Button variant="primary" type="submit">
                        Salvar
                      </Button>
                    </ButtonGroup>
                  </div>
                </FormFormik>
              );
            }}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
};
