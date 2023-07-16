import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [transaction, setTransaction] = useState(null);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [index, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => {
        navigate(`/transactions`);
      })
      .catch((e) => console.error(e));
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <h3>{transaction.item_name} - From {transaction.from}</h3>
      <h4>Category: {transaction.category}</h4>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {transaction.date}</p>
      <div className="showNavigation">
        <div>
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <Link to="#">
            <button onClick={handleDelete}>Delete</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
