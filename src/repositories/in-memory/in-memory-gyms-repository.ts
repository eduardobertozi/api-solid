import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return Promise.resolve(null)
    }

    return Promise.resolve(gym)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return Promise.resolve(gym)
  }
}
