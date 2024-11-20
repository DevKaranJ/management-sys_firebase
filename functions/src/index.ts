import * as express from "express";
import * as cors from "cors";
import {functions} from "./config/firebase";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

export const api = functions.https.onRequest(app);
