import { Prisma } from '@prisma/client'

type User = Prisma.UserCreateInput

export class InMemoryUsersRepository {
  private users: User[] = []

  async create(data: User) {
    this.users.push(data)
  }
}
