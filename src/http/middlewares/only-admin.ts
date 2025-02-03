import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
