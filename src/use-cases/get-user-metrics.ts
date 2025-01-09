import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseeRequest {
  userId: string
}

interface GetUserMetricsUseCaseeResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCasee {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseeRequest): Promise<GetUserMetricsUseCaseeResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
