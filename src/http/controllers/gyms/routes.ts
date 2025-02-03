import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search.controller'
import { nearby } from './nearby.controller'
import { create } from './create.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // Todas as rotas irão utilizar o middleware / hook

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
