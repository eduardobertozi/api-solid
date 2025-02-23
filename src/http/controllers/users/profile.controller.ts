import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send({
    user: {
      ...user,
      password_hash: null,
    },
  })
}
