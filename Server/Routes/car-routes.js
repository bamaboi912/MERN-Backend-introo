const express = require("express");
//utilize router to navigate urls
const router = express.Router();
//bring in schema to structure json information
const Car = require("../Model/VehicleInformation");
// require functionality from controllers to give router their behavior
const carControllers = require("../Controllers/car-controllers");

// assign functionality to urls and assign unique identifier in url

//localhost:3001/cars/get
router.get("/get", carControllers.getAllCars);

//localhost:3001/cars/update
router.post("/update", carControllers.addCar);

//localhost:3001/cars/get/:id
router.get("/get/:id", carControllers.getByID);

//localhost:3001/cars/update/:id
router.put("/update/:id", carControllers.updateCar);

//localhost:3001/cars/:id
router.delete("/delete/:id", carControllers.deleteCar);

module.exports = router;