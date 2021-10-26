import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faCheck, faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Breadcrumb,
  Dropdown,
} from "@themesberg/react-bootstrap";

import { TransactionsTable } from "../../components/Tables";
import { ApiService } from "../../services/ApiService";

export default () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await ApiService.get("/transactions");

      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível recuperar a lista de transações");
    }
  };

  const handleDelete = async (item) => {
    try {
      if (window.confirm(`Deseja realmente deletar a transação`)) {
        await ApiService.delete(`/transactions/destroy/${item._id}`);
        toast.success("Transação deletada com sucesso");
        getAll();
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível deletar a transação");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
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
          <h4>Transações</h4>
        </div>
      </div>
      <div className="table-settings mb-1">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}></Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <TransactionsTable transactions={transactions} onDelete={handleDelete} />
    </>
  );
};
