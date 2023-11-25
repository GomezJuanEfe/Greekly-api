import { PrismaClient } from "@prisma/client";

import { User } from "@prisma/client";
import { hashPassword } from "../../auth/utils/bycrypt";

const prisma = new PrismaClient();

export const createUser = async (input: User) => {
  try {
    const hashedPassword = await hashPassword(input.password);

    const data = {
      ...input,
      password: hashedPassword
    }

    const user = await prisma.user.create({
      data
    })

    return user
  } catch (error) {
    throw error
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    return user;
  } catch (error: any) {
    throw error;
  }
}