const jwt = require("jsonwebtoken");
const Meal = require("../models/meal");

exports.createMeal = (req, res) => {
  const { name, servingSize } = req.body;
  if (!name || !servingSize)
    return res.status(400).json({ message: "Name and serving size required" });

  let calories = 250;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  let newMeal = new Meal({
    user_id: req.user._id,
    name: name,
    servingSize: servingSize,
    calories: calories,
    protein: protein,
    carbs: carbs,
    fat: fat,
  });

  newMeal.save((err) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(201).json({ message: "meal created successfully" });
  });
};

exports.getMeals = (req, res) => {
  Meal.find({ user_id: req.user._id }, (err, meal) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.json(meal);
  });
};

exports.GetMeal = (req, res) => {
  //validation
  if (!req.params.id) {
    return res.status(400).json({ message: "Meal ID required" });
  }

  Meal.findOne({ _id: req.params.id, user_id: req.user._id }, (err, meal) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!meal) return res.status(404).json({ message: "meal not found" });
    return res.json(meal);
  });
};

exports.updateMeal = (req, res) => {
  const { name, servingSize } = req.body;
  if (!name && !servingSize)
    return res.status(400).json({ message: "Name or description required" });

  // Update the meal with the specified ID
  Meal.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    { name, servingSize },
    { new: true },
    (err, meal) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!meal)
        return res.status(404).json({ message: "meal not found" });
      return res.json({ message: "meal updated successfully" });
    }
  );
};

exports.deleteMeal = (req, res) => {
  // Delete the meal with the specified ID
  Meal.findOneAndDelete(
    { _id: req.params.id, user_id: req.user._id },
    (err, meal) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!meal) return res.status(404).json({ message: "meal not found" });
      return res.json({ message: "meal deleted successfully" });
    }
  );
};
