const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

//get all users
router.get("/users", adminController.getUsers);

//make user admin or remove admin
router.put("/users/:id", adminController.makeAdmin);

router.get("/meals", adminController.getMeals);
router.get("/meals/:id", adminController.GetMeal);
router.put("/meals/:id", adminController.updateMeal);
router.delete("/meals/:id", adminController.deleteMeal);


module.exports = router;