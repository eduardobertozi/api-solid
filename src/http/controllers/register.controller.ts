import { registerUseCase } from '@/use-cases/register'
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
    await registerUseCase({ name, email, password })
  } catch (err) {
    return reply.code(409).send()
  }

  return reply.code(201).send()
}
