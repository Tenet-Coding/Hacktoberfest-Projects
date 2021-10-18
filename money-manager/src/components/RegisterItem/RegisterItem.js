import "./RegisterItem.css";

const RegisterItem = (props) => {
  const { transactionDetails, deleteItem } = props;
  const { id, title, amount, type } = transactionDetails;

  const deleteThis = () => {
    deleteItem(id);
  }

  return (
    <div className='register-item' id={id}>
      <p>{title}</p>
      <p>Rs. {amount}</p>
      <p>{type}</p>
      <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            onClick={deleteThis}
      />
    </div>
  );
};

export default RegisterItem;
