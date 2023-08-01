const IncomeSchema = require("../models/incomeModel");

const getIncome = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const addIncome = async (req, res) => {
  const { title, amount, description, category, date } = req.body;

  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "income added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
  console.log(income);
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "income deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error" });
    });
};

module.exports = {
  getIncome,
  addIncome,
  deleteIncome,
};
