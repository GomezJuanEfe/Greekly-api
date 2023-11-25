import { User } from "@prisma/client";
import { signToken } from "../auth.service";

export const createAuthResponse = (input: User) => {
  const payload = {
    id: input.id,
    email: input.email,
  }

  const token = signToken(payload)

  const profile = {
    name: input.name,
    email: input.email,
    role: input.role,
  }

  return { token, profile }
}