import { PrismaGymsRepositoru } from '@/repositories/prisma-gyms-repository'
import { CheckinUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins.repository'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepositoru()
  const useCase = new CheckinUseCase(prismaCheckInsRepository, gymsRepository)

  return useCase
}
