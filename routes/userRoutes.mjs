import express from "express";
import { logIn, postUser } from "../controllers/userControllers.mjs";
const router = express.Router();

router.post("/register", postUser);

router.post("/login", logIn);


export default router;