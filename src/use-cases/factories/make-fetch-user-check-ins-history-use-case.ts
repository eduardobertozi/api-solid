import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins.repository'
import { FetchUsersCheckInsHistoryUseCase } from '../fetch-users-check-ins-history'

export function makeFetchUsersCheckInsHistoryUseCase() {
  const prismaRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUsersCheckInsHistoryUseCase(prismaRepository)

  return useCase
}
