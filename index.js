const express = require("express");
const responseMiddleware = require("./middlewares/responseMiddleware");
const connectDB = require("./config/db.config");




// initilization
const app = express();
const port = 8000;

// connect db
connectDB();

// Middle ware innitilization
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(responseMiddleware);


const authMiddleware = require("./middlewares/auth.middleware");


// routes initilization
const userRoutes = require("./module/users/user.route");
const authRoutes = require("./module/auth/auth.route");



// user routes
app.use("/api/users", authMiddleware, userRoutes)
app.use("/api/auth", authRoutes);




// app.use(errorMiddleware)




// listen server
app.listen(port,
    () => {
        console.log(`Server running on port: ${port}`);

    });

