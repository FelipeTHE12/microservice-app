import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email não válido"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password tem que estar entre 4 a 20 caracterres"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error("Invalid email or password");
    }

    const { email, password } = req.body;
    console.log("Creating a user...");

    res.send({});
  }
);

export { router as signupRouter };
