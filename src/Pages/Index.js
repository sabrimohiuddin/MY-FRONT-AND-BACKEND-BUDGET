import { useState, useEffect } from "react";
import Transactions from "../Components/Transactions";

import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function Index() {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((response) => {
        setTransactions(response.data);
        calculateTotalAmount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calculateTotalAmount = (transactions) => {
    const amountArray = transactions.map((transaction) => transaction.amount);
    const total = amountArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalAmount(total);
  };

  return (
    <div className="Index">
      <h2>Bank Account Total: {totalAmount}</h2>
      <Transactions transactions={transactions} />
    </div>
  );
}

export default Index;
