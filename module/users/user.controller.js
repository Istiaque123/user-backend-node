const userService = require("./user.service");

async function createUsers(req, res) {
    try {
        const body = req.body;
        const userResponse = await userService.createUsers(body);
        return res.status(201).send(userResponse); // Send as JSON
    } catch (error) {
        return res.status(500).json({ error: "Failed to create user" });
    }
}

async function getAll(req, res) {
    try {
        const userResponse = await userService.getAll();
        return res.status(200).send(userResponse);
    } catch (error) {
        return res.status(500).json({ error: "Failed to get users" });
    }
}

async function getById(req, res) {
    try {
        const id = req.params.id; // fixed typo
        const userResponse = await userService.getById(id);

        if (!userResponse) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).send(userResponse);
    } catch (error) {
        return res.status(500).json({ error: "Failed to get user by ID" });
    }
}

module.exports = {
    createUsers,
    getAll,
    getById
};
