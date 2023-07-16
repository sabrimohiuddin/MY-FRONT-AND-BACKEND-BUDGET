import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Transaction({ transaction, index }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => navigate("/transactions"))
      .catch(console.error);
  };

  return (
    <tr className="Transaction">
      <td>{transaction.item_name}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.date}</td>
      <td>{transaction.from}</td>
      <td>{transaction.category}</td>
      <td><Link to={`/transactions/${index}`}>Details</Link></td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;
