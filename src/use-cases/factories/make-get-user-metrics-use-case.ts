import { GetUserMetricsUseCasee } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins.repository'

export function makeGetUserMetricsUseCase() {
  const prismaRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCasee(prismaRepository)

  return useCase
}
