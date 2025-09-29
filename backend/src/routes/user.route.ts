import express from "express";
import userController from "../controllers/user.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";

export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter
  .route("/")
  .get(authMiddleware, roleAuthMiddleware(["admin"]), userController.findAll)
  .post(authMiddleware, roleAuthMiddleware(["admin"]), userController.save);
userRouter
  .route("/:id")
  .get(authMiddleware, roleAuthMiddleware(["admin"]), userController.findById)
  .put(authMiddleware, roleAuthMiddleware(["admin"]), userController.updateById)
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    userController.deleteById
  );
