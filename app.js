require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")


// My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripepayment")

// DB connection
mongoose.connect(process.env.DATABASE,{
    userNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("DB Connected")
})
// Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json());



// My Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",stripeRoutes)


// Port
const port = process.env.PORT || 8000;


// Starting a server
app.listen(port,() => {
    console.log(`app is running at ${port}`);
})