import { prisma } from "@/lib/prisma";
import { ElectronicDevice, Prisma } from "@prisma/client";
import { ElectronicDevicesRepository } from "@/interfaces/electronic-devices.interface";

export class PrismaElectronicDevicesRepository implements ElectronicDevicesRepository {
    async create(data: Prisma.ElectronicDeviceUncheckedCreateInput): Promise<ElectronicDevice> {
        const user = await prisma.electronicDevice.create({ data });
        return user;
    }
    async findAllElectronicDevices(userId: string): Promise<ElectronicDevice[]> {
        const electronicDevices = await prisma.electronicDevice.findMany({ where: { userId } });
        return electronicDevices;
    }
}

