import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

const Expenses = (props) => {
  let expArray = props.expenses;
  const toReturn = [];

  expArray.forEach((element) => {
    toReturn.push(
      <ExpenseItem
        title={element.title}
        amount={element.amount}
        date={element.date}
        key={element.id}
      />
    );
  });

  return <Card className="expenses">{toReturn}</Card>;
};

export default Expenses;
