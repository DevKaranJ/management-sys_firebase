import {z} from "zod";

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
