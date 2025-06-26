const Auth = require("./auth.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AuthTokenModel = require("./authToken.schema");


async function register(insertData) {
    try {
        let { email, password, confirmPassword } = insertData;

        if (password !== confirmPassword) {
            throw new Error("Password not match");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAuth = new Auth({ email, password: hashedPassword });

        const saveAuth = await newAuth.save();

        return {
            error: false,
            data: saveAuth,
            message: "User registered successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Failed to register user",
            details: error.message
        };
    }
}

async function login(insertData) {
    try {
        const user = await Auth.findOne({ email: insertData.email });

        if (!user) {
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(insertData.password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid password");
        }




        const timeStamp = new Date();
        const authUser = {
            id: user._id || '',
            timeStamp: timeStamp
        };

        const refreashToken = generateRefreshToken(authUser);

        const tempAutToken = new AuthTokenModel({
            userId: user._id,
            token: refreashToken,
            timeStemp: timeStamp

        });

        // save as refresh token
        await tempAutToken.save();



        const loginInfo = {
            token: user._id,
            timeStamp: timeStamp
        };

        const accessToken = generateAccessToken(loginInfo);

        return {
            error: false,
            data: {
                accessToken: accessToken,
                refreashToken: refreashToken
            },
            message: "Login successful"
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Failed to login",
            details: error.message
        };
    }
}

const refresh = async (inserData) => {
    const { refresh_token } = inserData;

    try {
        const checkToken = await AuthTokenModel.findOne({
            token: refresh_token,
        });
        if (checkToken === undefined || checkToken === null) {
            return { error: false, data: null, message: 'Unauthorized' };
        }

        const decode = await new Promise((resolve, reject) => {
            jwt.verify(refresh_token, process.env.REFREASH_TOKEN_SECRATE, (err, decode) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decode);
                }
            });
        });

        if (!decode) {
            return { error: true, data: null, message: 'Unauthorized' };
        }

        const timeStamp = new Date();

        const accessTokenInfo = {
            token: checkToken.userId,
            timeStamp: timeStamp
        }

        const accessToken = generateAccessToken(accessTokenInfo);

        return { error: false, data: { accessToken: accessToken }, message: 'Access token create successfully' };

    } catch (error) {
        return { error: true, data: null, message: 'Unauthorized' };
    }
};



function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRATE, { expiresIn: "30m" });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFREASH_TOKEN_SECRATE, { expiresIn: "30m" });
}


module.exports = {
    register,
    login,
    refresh,
};
