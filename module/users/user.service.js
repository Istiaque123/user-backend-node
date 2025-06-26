const User = require("./user.schema");

async function createUsers(insertData) {
    try {
        const newUser = new User(insertData);
        const savedUser = await newUser.save();
        return {
            error: false,
            data: savedUser,
            message: "User inserted successfully"
        };
    } catch (err) {
        console.log(err);
        
        return {
            error: true,
            message: "Failed to insert user",
            details: err.message
        };
    }
}

async function getAll() {
    try {
        const allUsers = await User.find();
        return {
            error: false,
            data: allUsers,
            message: "Users retrieved successfully"
        };
    } catch (err) {
        return {
            error: true,
            message: "Failed to retrieve users",
            details: err.message
        };
    }
}

async function getById(id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return {
                error: true,
                message: "User not found"
            };
        }
        return {
            error: false,
            data: user,
            message: "User retrieved successfully"
        };
    } catch (err) {
        return {
            error: true,
            message: "Failed to retrieve user",
            details: err.message
        };
    }
}

module.exports = {
    createUsers,
    getAll,
    getById
};
