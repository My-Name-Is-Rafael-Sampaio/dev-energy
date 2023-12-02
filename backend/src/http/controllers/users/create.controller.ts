import { UsersUseCase } from '@/use-cases/users.usecase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
      const usersUseCase = new UsersUseCase();

      await usersUseCase.create({ name, email, password_hash: password });
  } catch(err) {
      return reply.status(400).send({ message: err });
  }

  return reply.status(201).send();
}