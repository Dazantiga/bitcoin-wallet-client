
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEdit, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import transactions from "../data/transactions";

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { tradeDate, amount, qtyBitcoin, priceBitcoin, status } = props;
    const statusVariant = status === true ? faArrowUp
      : faArrowDown 

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Transactions.path} className="fw-normal">
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {tradeDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {amount}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {qtyBitcoin}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            ${parseFloat(priceBitcoin).toFixed(2)}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="../transactions/transactionEditForm">
                    <FontAwesomeIcon icon={faEdit} className="me-2" />Editar
                  </Link>
                </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remover
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Data</th>
              <th className="border-bottom">Valor</th>
              <th className="border-bottom">Quantidade Bitcoin</th>
              <th className="border-bottom">Valor Bitcoin</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-0 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-1 mb-lg-0">
              <Pagination.Prev>
                Anterior
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Próximo
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Exibindo <b>{totalTransactions}</b> de <b>25</b> registros
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};