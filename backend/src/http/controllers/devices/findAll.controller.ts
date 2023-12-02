import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ElectronicDevicesUseCase } from '@/use-cases/electronic-devices.usecase';

export async function findAllElectronicDevices(request: FastifyRequest, reply: FastifyReply) {
    const createElectronicDeviceParamsSchema = z.object({
        userId: z.string().uuid(),
    })
    
    const { userId } = createElectronicDeviceParamsSchema.parse(request.params)

    try {
        const electronicDevicesUseCase = new ElectronicDevicesUseCase();
        const electronicDevices = await electronicDevicesUseCase.findAllElectronicDevices(userId);
        return reply.status(200).send(electronicDevices);
    } catch(err) {
        return reply.status(400).send({ message: err });
    }

}