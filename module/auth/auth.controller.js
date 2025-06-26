const authService = require("./auth.service");

async function register(req, res) {
    try {
            const body = req.body;
            const authResponse = await authService.register(body);
            return res.status(201).send(authResponse); // Send as JSON
        } catch (error) {
            return res.status(500).json({ error: "internal server error" });
        }
}
async function login(req, res) {
    try {
            const body = req.body;
            const authResponse = await authService.login(body);
            // return res.status(201).send(authResponse); 

            if (!authResponse.error) {
                return res.success(authResponse.data, 200, authResponse.message)
            }

            return res.error(authResponse.data, 404, authResponse.message)


        } catch (error) {
            // return res.status(500).json({ error: "Failed to login user" });
            return res.error("Failed to login user")
        }
}
async function refreashToken(req, res) {
    try {
            const body = req.body;
            const authResponse = await authService.refresh(body);
            // return res.status(201).send(authResponse); 

            if (!authResponse.error) {
                return res.success(authResponse.data, 200, authResponse.message)
            }

            return res.error(authResponse.data, 404, authResponse.message)


        } catch (error) {
            // return res.status(500).json({ error: "Failed to login user" });
            return res.error("Failed to refresh token")
        }
}

module.exports = {
    register,
    login,
    refreashToken,
};