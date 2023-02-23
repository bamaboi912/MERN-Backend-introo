Backend 

1.) Create Cluster and then Database and then collection.
    -navigate to MongoDBAtlas
        -create Cluster 
        -create Database    (ExoticDealership)
        -create collection (VehicleInformation)

        2.) Create folder stucture for application:
    - Client Folder (frontend of stack)
    -Server Folder (Backend of stack)

    3.) Create JSON for application: 

JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects 
consisting of attribute–value pairs and arrays. It is a common data format with diverse uses in electronic data interchange, including 
that of web applications with servers.

npm = npm is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager
 for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and
 paid-for private packages, called the npm registry

-Open terminal window and use the following command to create JSON FILE:

    -CD server
    - npm init -y

    This command will create a package.json file for us, from where we will
be able to manage our installed packages and also control the version of
our application. If you want to create the package manually then you need
to give the command npm init and if you want to create the file as a whole
then you need to type npm init -y

4.) Install backend Dependencies:
nodemon = Nodemon is a popular tool that is used for the development of applications based on node. js. It simply restarts the node application
 whenever it observes the changes in the file present in the working directory of your project

mongoose = Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript 
runtime environment

express = Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and
 open-source software under the MIT License. It is designed for building web applications and APIs. I

cors = Cross-origin resource sharing is a mechanism that allows restricted resources on a web page to be requested from another domain 
outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, 
and videos.
command: npm install mongoose cors express nodemon


5.) Amend package.json to assign nodemon to server file:

*amended package.json content: 

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js" <<<<----------- modify to this value
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^6.7.4",
    "nodemon": "^2.0.20"
  }
}

6.) Creation of server file tilted "index.js" inside of server.

content for index.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

//set up middle ware
app.use(express.json());
const cors = require("cors");

app.use(cors());

//establish communication to MongoDB atlas (database)

mongoose.connect("mongodb+srv://bamaboi912:Student1234!@cluster0.lpofvla.mongodb.net/ExoticDealership?retryWrites=true&w=majority").then(() => 
console.log("Connected to Database")).then(() =>{
    app.listen(3001)
}).catch((err) => console.log(err));

<---------------------------------------------------------------------------------------------------------------------------------endofcode----->
8.) Create Folder to Hold Mongoose Model(structuring of information)

-Create folder titled "Model" in server folder, and then create file 
titled as the same name as your collection. (in this case, VehicleInformation.js)

content for VehicleInformation.js

const mongoose = require('mongoose');
//create schema to hold structuring of content
const Schema = mongoose.Schema;

const carShema = new Schema({
    make_model:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        require: true,
    },
    year:{
        type: Number,
        require: true,
    },
    engine:{
        type: String,
        require: true,
    }
});

//Export schema to be used in other files
modue.exports = mongoose.model("VehicleInformation", carShema);
<-----------------------------------------------------------------------------endofcode---------------------------------->

9.) Set Up Controllers for functionality for urls

    -create a folder titled Controllers 
    -create a file inside to hold Controllers

    *new terms

Asynchronous programming is a technique that enables your program to start a potentially long-running task 
and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. 
Once that task has finished, your program is presented with the result.

next() The next() method returns an object with two properties done and value .
 You can also provide a parameter to the next method to send a value to the generator.

 - file name* car-controllers.js
Informational responses ( 100 – 199 )
Successful responses ( 200 – 299 )
Redirection messages ( 300 – 399 )
Client error responses ( 400 – 499 )
Server error responses ( 500 – 599 

reference link 
https://www.geeksforgeeks.org/different-kinds-of-http-requests/


content for car-controllers

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
<-----------------------------------------------------------------------------------------endofcode------------------->

 

