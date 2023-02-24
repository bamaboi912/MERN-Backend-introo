const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

//set up middle ware
app.use(express.json());
const cors = require("cors");

app.use(cors());

//include routers
const router = require("./Routes/car-routes");

//localhost:3001/cars
app.use("/cars", router)

//establish communication to MongoDB atlas (database)

mongoose.connect("mongodb+srv://bamaboi912:Student1234!@cluster0.lpofvla.mongodb.net/ExoticDealership?retryWrites=true&w=majority").then(() => 
console.log("Connected to Database")).then(() =>{
    app.listen(3001)
}).catch((err) => console.log(err));