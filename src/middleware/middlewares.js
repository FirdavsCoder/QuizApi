const { verifyToken } = require( "../lib/jwt.js");
const { UserService } = require( "../modules/user/service.js");
const { ResData } = require( "../lib/resData");
const {UserRepository} = require("../modules/user/repository");


const userService = new UserService();


// Middleware
class AuthorizationMiddleware {
    async authorization(req, res, next) {
        const userId = req.userId;
        const userRepo = new UserRepository()
        const foundUser = await userRepo.findOneById(userId);
        console.log(foundUser)
        if (foundUser && foundUser.role) {
            req.user = foundUser;
            return next();
        } else {
            const resData = new ResData(
                `Bu ${userId} aydili user topilmadi.Iltimos userlar listini tekshiring`
            );
            return res.status(403).json(resData);
        }
    }

    adminRole(req, res, next) {
        if (req.user.role === "admin") {
            next();
        } else {
            const resData = new ResData(
                "Bu userning roli admin emas.Iltimos qayta tekshiring!!!"
            );
            return res.status(403).json(resData);
        }
    }

    userRole(req, res, next) {
        if (req.user.role === "user") {
            next();
        } else {
            const resData = new ResData("Not access");
            return res.status(403).json(resData);
        }
    }

    checkUser(req, res, next) {
        try {
            const token = req.headers.token;
            const userId = verifyToken(token)

            req.userId = Number(userId);
            next();
        } catch (error) {
            const resData = new ResData("invalid token");
            res.status(401).json(resData);
        }
    }
}

module.exports = {AuthorizationMiddleware}