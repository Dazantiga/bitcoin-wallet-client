
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";


export default () => {
  const [tradeDate, setTradeDate] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edição de Transação</h5>
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
                        disabled
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
                <Form.Control required type="text" placeholder="Digite cotação" />
              </Form.Group>
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
              <Button variant="primary" type="submit">
                <Link to="../transactions/transactions" className="text-white">Salvar</Link>
              </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
