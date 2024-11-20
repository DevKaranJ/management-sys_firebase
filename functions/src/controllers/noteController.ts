import {Request, Response} from "express";
import {db} from "../config/firebase";
import {Note} from "../models/note.model";
import {successResponse, errorResponse} from "../utils/responseHandler";

export const noteController = {
  async createNote(req: Request, res: Response) {
    try {
      const {uid} = req.user || {};
      if (!uid) {
        return res.status(400).json(errorResponse("User ID is missing"));
      }
      const {title, content} = req.body;

      const note: Note = {
        userId: uid,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const noteRef = await db.collection("notes").add(note);
      const createdNote = {id: noteRef.id, ...note};

      return res.status(201).json(successResponse(createdNote));
    } catch (error) {
      return res.status(500).json(errorResponse("Error creating note"));
    }
  },

  async getNotes(req: Request, res: Response) {
    try {
      const {uid} = req.user || {};
      if (!uid) {
        return res.status(400).json(errorResponse("User ID is missing"));
      }

      const notesSnapshot = await db
        .collection("notes")
        .where("userId", "==", uid)
        .orderBy("createdAt", "desc")
        .get();

      const notes = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.json(successResponse(notes));
    } catch (error) {
      return res.status(500).json(errorResponse("Error retrieving notes"));
    }
  },
};
