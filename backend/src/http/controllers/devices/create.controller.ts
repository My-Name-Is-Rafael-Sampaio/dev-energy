import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ElectronicDevicesUseCase } from '@/use-cases/electronic-devices.usecase';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createElectronicDeviceParamsSchema = z.object({
    userId: z.string().uuid(),
  })
  
  const createBodySchema = z.object({
    icon: z.string(),
    name: z.string(),
    powerConsumption: z.number(),
    consumptionTime: z.number(),
  });

  const { userId } = createElectronicDeviceParamsSchema.parse(request.params)
  const { icon, name, powerConsumption, consumptionTime } = createBodySchema.parse(request.body);

  try {
      const electronicDevicesUseCase = new ElectronicDevicesUseCase();

      await electronicDevicesUseCase.create({ icon, name, powerConsumption, consumptionTime, userId  });
  } catch(err) {
      return reply.status(400).send({ message: err });
  }

  return reply.status(201).send();
}