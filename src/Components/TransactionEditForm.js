import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
  const navigate = useNavigate();
  let { index } = useParams();

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => console.error(e));
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="item_name">Item Name:</label>
        <input
          id="item_name"
          value={transaction.item_name}
          type="text"
          onChange={handleTextChange}
          placeholder="Item Name"
          required
        />

        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          required
          value={transaction.amount}
          placeholder="Amount"
          onChange={handleTextChange}
        />

        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          value={transaction.date}
          onChange={handleTextChange}
        />

        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          value={transaction.from}
          placeholder="From"
          onChange={handleTextChange}
        />

        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          value={transaction.category}
          placeholder="Category"
          onChange={handleTextChange}
        />

        <br />
        <input type="submit" />
      </form>

      <Link to="/transactions">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
