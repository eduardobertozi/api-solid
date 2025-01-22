import { PrismaGymsRepositoru } from '@/repositories/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const prismaRepository = new PrismaGymsRepositoru()
  const useCase = new CreateGymUseCase(prismaRepository)

  return useCase
}
