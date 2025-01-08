import { PrismaUsersRepository } from '@/repositories/prisma-users.repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.code(409).send({ message: err.message })
    }

    return reply.code(500).send() // TODO: Fix me
  }

  return reply.code(201).send()
}
