import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  userId: string
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUsersCheckInsHistoryUseCaseRequest): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return {
      checkIns,
    }
  }
}
