import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userAlreadyInUse = await User.findOne({ email });

    if (userAlreadyInUse) {
      throw new BadRequestError(
        "Já existe um usuario associado a este e-mail."
      );
    }

    const user = User.build({ email, password });
    await user.save();

    //Jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //Session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
