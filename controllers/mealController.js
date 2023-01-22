const jwt = require("jsonwebtoken");
const Meal = require("../models/meal");

const nutritionix = require("nutritionix-api");

nutritionix.init(
  process.env.NUTRITIONIX_APP_ID,
  process.env.NUTRITIONIX_API_KEY
);

exports.createMeal = (req, res) => {
  let { name, servingSize } = req.body;
  if (!name || !servingSize)
    return res.status(400).json({ message: "Name and serving size required" });

  //serving size validation
  if (servingSize < 0) {
    return res
      .status(400)
      .json({ message: "Serving size must be greater than 0" });
  }

  // serving size validation
  if (servingSize > 1000) {
    return res
      .status(400)
      .json({ message: "Serving size must be less than 1000" });
  }

  servingSize = Number(servingSize);

  let calories = 250;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  try {
    nutritionix.natural
      .search(name)
      .then((result) => {
        if (result.foods?.length > 0) {
          console.log(result);
          calories = result.foods[0].nf_calories * servingSize;
          protein = result.foods[0].nf_protein * servingSize;
          carbs = result.foods[0].nf_total_carbohydrate * servingSize;
          fat = result.foods[0].nf_total_fat * servingSize;

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
            return res
              .status(201)
              .json({ message: "meal created successfully", meal: newMeal });
          });
        }

        // if no results found
        else {
          return res.status(500).json({
            message:
              "error maybe use create custom meal endpoint \n " +
              result?.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message:
            "error maybe use create custom meal endpoint \n " + err.message,
        });
      });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: err.message });
    if (!res.headersSent)
      return res
        .status(500)
        .json({ error: error.code, message: error.message });
  }
};

exports.createCustomMeal = (req, res) => {
  let { name, servingSize, calories, protein, carbs, fat } = req.body;
  if (!name || !servingSize || !calories || !protein || !carbs || !fat)
    return res.status(400).json({
      message: "Name, serving size, calories, protein, carbs, and fat required",
    });

  //serving size validation
  if (servingSize < 0) {
    return res
      .status(400)
      .json({ message: "Serving size must be greater than 0" });
  }

  // serving size validation
  if (servingSize > 1000) {
    return res
      .status(400)
      .json({ message: "Serving size must be less than 1000" });
  }

  servingSize = Number(servingSize);
  calories = Number(calories);
  protein = Number(protein);
  carbs = Number(carbs);
  fat = Number(fat);

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
    return res

      .status(201)
      .json({ message: "meal created successfully", meal: newMeal });
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
      if (!meal) return res.status(404).json({ message: "meal not found" });
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
