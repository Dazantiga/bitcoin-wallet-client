import React, { useEffect, useState } from "react";
import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Col, Row, Button, ButtonGroup } from "@themesberg/react-bootstrap";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import { ApiService } from "../../services/ApiService";

import {
  CounterWidget,
  CircleChartWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
} from "../../components/Widgets";
import { trafficShares } from "../../data/charts";
import { calculateBitcoin } from "../../helpers/helpers";

const optionsChart = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};

export default () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCompare, setTransactionsCompare] = useState([]);
  const [bitcoinBuy, setBitcoinBuy] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => getDashboard(), 400);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (bitcoinBuy) {
      setTransactionsCompare(
        transactions.map((item) => {
          return {
            ...item,
            bitcoinQuantity: calculateBitcoin(item.valueInvested, bitcoinBuy),
          };
        })
      );
    }
  }, [transactions, bitcoinBuy]);

  const getDashboard = async () => {
    try {
      const response = await ApiService.get("/transactions");

      if (response.data) {
        setTransactions(response.data);
        handlePrice();
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível recuperar a lista de transações");
    }
  };

  const handlePrice = async () => {
    try {
      const response = await ApiService.get("/tickers", {
        params: {
          value: 1,
          date: "25/06/2021",
        },
      });

      if (response.data) {
        setBitcoinBuy(response.data.BTCPrice);
      }
    } catch (err) {
      toast.error("Não foi possível recuperar o valor da cotação");
    }
  };

  const dataChart = {
    labels: transactions.map(
      (item) =>
        `${new Date(item.created_at).getFullYear()}-${
          new Date(item.created_at).getMonth() + 1
        }-${new Date(item.created_at).getDate()}`
    ),
    datasets: [
      {
        label: "# Lucro",
        data: transactions.map((item) => item.bitcoinQuantity),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y-axis-1",
      },
      {
        label: "# Perda",
        data: transactionsCompare.map((item) => item.bitcoinQuantity),
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <ButtonGroup>
          <Button variant="secondary" className="m-1">
            <Link to="../transactions/transactionForm">Nova Transação</Link>
          </Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <Line data={dataChart} options={optionsChart} />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="Traffic Share" data={trafficShares} />
        </Col>
      </Row>
    </>
  );
};
