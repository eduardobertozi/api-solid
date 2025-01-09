import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckInsHistoryUseCaseRequest): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
