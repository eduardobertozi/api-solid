import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins.repository'
import { ValidateCheckinUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const prismaRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckinUseCase(prismaRepository)

  return useCase
}
