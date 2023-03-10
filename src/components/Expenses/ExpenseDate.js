import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const splitDate = {
    month: props.date.toLocaleString("it-IT", { month: "long" }),
    day: props.date.toLocaleString("it-IT", { day: "2-digit" }),
    year: props.date.getFullYear(),
  };

  return (
    <div className="expense-date">
      <div className="expense-date__day">{splitDate.day}</div>
      <div className="expense-date__month">{splitDate.month}</div>
      <div className="expense-date__year">{splitDate.year}</div>
    </div>
  );
};

export default ExpenseDate;
