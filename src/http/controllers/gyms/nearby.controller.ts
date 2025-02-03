import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90 // Math.abs sempre transforma em positivo
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const searchUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await searchUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.code(200).send({
    gyms,
  })
}
