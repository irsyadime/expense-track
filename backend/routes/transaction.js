const router = require("express").Router();
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const {
  getIncome,
  addIncome,
  deleteIncome,
} = require("../controllers/incomeController");

router
  .get("/get-incomes", getIncome)
  .post("/add-income", addIncome)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense", deleteExpense);

module.exports = router;
