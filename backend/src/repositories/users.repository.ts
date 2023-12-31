import { UsersRepository } from "@/interfaces/users.interface";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({ data });

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({ 
            where: { 
                email 
            },
        });

        return user || null;
    }
}

