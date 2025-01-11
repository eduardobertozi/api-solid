import { Gym, Prisma } from '@prisma/client'
import { FindManyNearByParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return Promise.resolve(null)
    }

    return Promise.resolve(gym)
  }

  async findManyNearby(params: FindManyNearByParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      console.log(distance)

      return distance < 10
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return Promise.resolve(
      this.items
        .filter((item) => item.title.includes(query))
        .slice((page - 1) * 20, page * 20),
    )
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
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
