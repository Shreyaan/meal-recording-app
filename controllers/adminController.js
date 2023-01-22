const User = require("../models/User");
const Meal = require("../models/meal");

exports.getUsers = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    User.countDocuments({}, (err, total) => {
      if (err) return res.status(500).json({ message: err.message });

      User.find({})
        .skip(skip)
        .limit(limit)
        .exec((err, users) => {
          if (err) return res.status(500).json({ message: err.message });
          const pagesRemaining = Math.ceil((total - skip) / limit);
          return res.json({ users, total, pagesRemaining });
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.makeAdmin = (req, res) => {
  const userId = req.params.id;
  const { isAdmin } = req.body;
  //validation
  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = isAdmin ? "admin" : "user"; // if isAdmin is true, set role to admin, else set role to user

    user.save((err) => {
      if (err) return res.status(500).json({ message: err.message });
      return res.json({ message: "User updated successfully", user });
    });
  });
};

exports.getMeals = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  Meal.countDocuments({}, (err, total) => {
    if (err) return res.status(500).json({ message: err.message });

    Meal.find({})
      .skip(skip)
      .limit(limit)
      .exec((err, meals) => {
        if (err) return res.status(500).json({ message: err.message });
        const pagesRemaining = Math.ceil((total - skip) / limit);
        return res.json({ meals, total, pagesRemaining });
      });
  });
};

exports.GetMeal = (req, res) => {
  const mealId = req.params.id;
  //validation
  if (!mealId) {
    return res.status(400).json({ message: "Meal ID required" });
  }

  Meal.findOne({ _id: mealId }, (err, meal) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!meal) return res.status(404).json({ message: "meal not found" });
    return res.json(meal);
  });
};

exports.updateMeal = (req, res) => {
  const mealId = req.params.id;
  //validation
  if (!mealId) {
    return res.status(400).json({ message: "Meal ID required" });
  }

  const { name, servingSize, calories, protein, carbs, fat } = req.body;

  if (!name || !servingSize || !calories || !protein || !carbs || !fat) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Meal.findOne({ _id: mealId }, (err, meal) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!meal) return res.status(404).json({ message: "meal not found" });

    meal.name = name;
    meal.servingSize = servingSize;
    meal.calories = calories;
    meal.protein = protein;
    meal.carbs = carbs;
    meal.fat = fat;

    meal.save((err) => {
      if (err) return res.status(500).json({ message: err.message });
      return res.json({ message: "meal updated successfully", meal });
    });
  });
};

exports.deleteMeal = (req, res) => {
  const mealId = req.params.id;
  //validation
  if (!mealId) {
    return res.status(400).json({ message: "Meal ID required" });
  }

  Meal.findOne({ _id: mealId }, (err, meal) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!meal) return res.status(404).json({ message: "meal not found" });

    meal.remove((err) => {
      if (err) return res.status(500).json({ message: err.message });
      return res.json({ message: "meal deleted successfully" });
    });
  });
};
