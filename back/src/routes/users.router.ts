import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { login, registerUser, getUserOrders } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";


const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.get("/orders", checkLogin, getUserOrders);

export default usersRouter;
