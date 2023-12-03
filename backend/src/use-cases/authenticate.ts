import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { UsersRepository } from "@/interfaces/users.interface";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { PrismaUsersRepository } from "@/repositories/users.repository";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
};

export class AuthenticateUseCase {
    private usersRepository: UsersRepository;
    constructor() {
        this.usersRepository = new PrismaUsersRepository();
    }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password_hash);
        
        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return { 
            user 
        };
    }
}