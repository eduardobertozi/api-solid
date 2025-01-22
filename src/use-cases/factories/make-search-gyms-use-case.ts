import { PrismaGymsRepositoru } from '@/repositories/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const prismaRepository = new PrismaGymsRepositoru()
  const useCase = new SearchGymsUseCase(prismaRepository)

  return useCase
}
