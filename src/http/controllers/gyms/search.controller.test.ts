import request from 'supertest'
import { app } from '@/app'

describe('Search Gyms (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    await request(app.server).post('/users').send({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const gymsResponse = await request(app.server)
      .get('/gyms/search?q=J')
      .set('Authorization', `Bearer ${token}`)
      .send()
  })
})
