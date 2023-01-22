const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

router.post("/", mealController.createMeal);

router.post("/customMeal", mealController.createCustomMeal);

router.get("/", mealController.getMeals);

router.get("/:id", mealController.GetMeal);
router.delete("/:id", mealController.deleteMeal);
router.put("/:id", mealController.updateMeal);

module.exports = router;
