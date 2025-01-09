import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return Promise.resolve(null)
    }

    return Promise.resolve(gym)
  }
}
