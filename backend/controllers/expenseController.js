const ExpenseSchema = require("../models/expenseModel");

const getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const addExpense = async (req, res) => {
  const { title, amount, description, category, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    description,
    category,
    date,
  });
  try {
    if (!title || !category || !description || !date) {
      res.status(400).json({ message: "All field are required" });
    }
    if (amount <= 0 || !amount === "number") {
      res.status(400).json({ message: "Amount must positive number" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
  console.log(expense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error" });
    });
};

module.exports = {
  addExpense,
  getExpense,
  deleteExpense,
};
