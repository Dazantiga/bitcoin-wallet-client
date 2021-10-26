
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';


export default () => {
  const [tradeDate, setTradeDate] = useState("");

  return (
    <>
    <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Transactions</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Cadastro de Transação</h5>
        <Form>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="totalValue">
                <Form.Label>Valor Transação</Form.Label>
                <Form.Control required type="text" placeholder="100,00" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Data Transação</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setTradeDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={tradeDate ? moment(tradeDate).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="priceBitcoin">
                <Form.Label>Preço Bitcoin</Form.Label>
                <Form.Control required type="text" placeholder="Digite ou busque cotação" />
              </Form.Group>
            </Col>
            <Col md={1} className="mb-3">
              <Button variant="secondary" className="m-1 button_right_input" type="submit">Buscar</Button>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="qtyBitcoin">
                <Form.Label>Bitcoin</Form.Label>
                <Form.Control disabled required type="text" placeholder="" />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">Salvar</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </>
  );
};
