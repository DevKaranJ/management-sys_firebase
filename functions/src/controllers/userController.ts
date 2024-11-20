import {Request, Response} from "express";
import {db, auth} from "../config/firebase";
import {User} from "../models/user.model";
import {successResponse, errorResponse} from "../utils/responseHandler";

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const {email, password, name} = req.body;

      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
      });

      // Create user profile in Firestore
      const user: User = {
        uid: userRecord.uid,
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection("users").doc(userRecord.uid).set(user);

      return res.status(201).json(successResponse(user));
    } catch (error) {
      return res.status(500).json(errorResponse("Error creating user"));
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json(errorResponse("User not authenticated"));
      }

      const {uid} = req.user;
      const {name} = req.body;

      const userRef = db.collection("users").doc(uid);
      await userRef.update({
        name,
        updatedAt: new Date(),
      });

      const updatedUser = (await userRef.get()).data() as User;
      return res.json(successResponse(updatedUser));
    } catch (error) {
      return res.status(500).json(errorResponse("Error updating user"));
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json(errorResponse("User not authenticated"));
      }

      const {uid} = req.user;

      // Delete user from Auth
      await auth.deleteUser(uid);

      // Delete user from Firestore
      await db.collection("users").doc(uid).delete();

      return res.json(successResponse({message: "User deleted successfully"}));
    } catch (error) {
      return res.status(500).json(errorResponse("Error deleting user"));
    }
  },
};
