import * as z from "zod";
import { UserRole } from "@prisma/client";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const SettingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z
    .any()
    .nullable()
    .refine(
      (files) =>
        files?.[0]?.size == undefined ||
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      {
        message: "Only JPEG, PNG files are allowed",
      }
    ),
});

export const MembersSchema = z.object({
  name: z.string().min(2).max(50),
  members: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .refine((members) => members.length >= 2, {
      message: "You must select at least two members.",
    }),
});
