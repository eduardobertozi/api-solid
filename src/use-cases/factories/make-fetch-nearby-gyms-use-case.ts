import { PrismaGymsRepositoru } from '@/repositories/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const prismaRepository = new PrismaGymsRepositoru()
  const useCase = new FetchNearbyGymsUseCase(prismaRepository)

  return useCase
}
