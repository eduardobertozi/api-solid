import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const nearbyLatitude = -26.7201952
    const nearbyLongitude = -48.6899712

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: nearbyLatitude,
        longitude: nearbyLongitude,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -26.4768217,
        longitude: -49.0007097,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: nearbyLatitude,
        longitude: nearbyLongitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript gym',
      }),
    ])
  })
})
