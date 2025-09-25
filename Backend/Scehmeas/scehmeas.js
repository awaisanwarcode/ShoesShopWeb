import { z } from "zod";

export const nameScehmea = z.string();
export const emailSchema = z.email();
export const passSchema = z.string().min(6).max(10);
