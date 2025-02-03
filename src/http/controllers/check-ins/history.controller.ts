import { makeFetchUsersCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)
  const userId = request.user.sub

  const fetchUsersCheckInHistoryUseCase = makeFetchUsersCheckInsHistoryUseCase()

  const { checkIns } = await fetchUsersCheckInHistoryUseCase.execute({
    userId,
    page,
  })

  return reply.code(200).send({
    checkIns,
  })
}
