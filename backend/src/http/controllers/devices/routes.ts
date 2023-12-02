import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { findAllElectronicDevices } from './findAll.controller'

export async function electronicDevicesRoutes(app: FastifyInstance) {
  // app.addHook("preHandler", authMiddleware)
  app.post('/:userId', create)
  app.get('/:userId', findAllElectronicDevices)
}