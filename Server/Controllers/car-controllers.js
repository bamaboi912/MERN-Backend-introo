//create functions for URLS to process CRUD operations
const Car = require("../Model/VehicleInformation")
//fetch all data from database

const getAllCars = async (req,res,next) =>{
    let cars;
    try{
        cars = await Car.find();

    }catch(err){
        console.log(err);
    }
    if(!cars){
        //display negative http status if DB is empty
        return res.status(404).json({message:"No vehicles found"})
    }
    return res.status(200).json({cars});
}

//create function to select an individual value from DB
const getByID = async (req,res,next) =>{
    const id = req.params.id;
    let car;
    try{
        car = await Car.findByID(id);
    }catch(err){
        console.log(err);
    }
    if(!car){
        return res.status(404).json({message:"No Vehicle Found!"});

    }
    return res.status(200).json({car});
};

//add a vehicle to DB
const addCar = async (req,res,next) =>{
    const{make_model, price, year, engine} = req.body;
    let vehicle;
    try{
        vehicle = new Car({
            make_model,
            price,
            year,
            engine,
        });
        await vehicle.save();
    }
    catch(err){
        console.log(err);
    }
    if(!vehicle){
        return res.status(500).json({message: "Unable to Add Vehicle"});
    }
    return res.status(201).json({vehicle});
};

//create function to Update a value
const updateCar = async (req,res,next) =>{
    const id = req.params.id;
    const {make_model, price,year, engine} = req.body;
    let car;
    try{
        car = await Car.findByIDAndUpdate(id,{
            make_model,
            price,
            year,
            engine
        });
        car = await car.save();
    }
    catch(err){
        console.log(err);
    }
    if(!car){
        return res.status(404).json({message: "Unable to update by this ID"});
    }
    return res.status(200).json({car});
};

//delete a vehicle from DB by way  of its ID value

const deleteCar = async (req,res,next) =>{
    const id = req.params.id;
    let car;
    try{
        car = await Car.findByIDAndRemove(id);
    }catch(err){
        console.log(err);

    }
    if(!car){
        return res.status(404).json({message:"Unable to delete by this ID"});
    }
    return res.status(200).json({vehicle: "Vehicle Successfully Deleted"});
};

//export functions so that they can be assigned to router for URLS

exports.getAllCars = getAllCars;
exports. getByID = getByID;
exports.addCar = addCar;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;