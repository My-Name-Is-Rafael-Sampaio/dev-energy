import { Prisma } from "@prisma/client";
import { PrismaElectronicDevicesRepository } from "@/repositories/electronic-devices.repository";
import { ElectronicDevicesRepository } from "@/interfaces/electronic-devices.interface";

export class ElectronicDevicesUseCase {
  private electronicDeviceRepository: ElectronicDevicesRepository;
  constructor() {
    this.electronicDeviceRepository = new PrismaElectronicDevicesRepository();
  }

  async create({ icon, name, powerConsumption, consumptionTime, userId }: Prisma.ElectronicDeviceUncheckedCreateInput) {
    const electronicDevice = await this.electronicDeviceRepository.create({ icon, name, powerConsumption, consumptionTime, userId });
    return electronicDevice;
  }

  async findAllElectronicDevices(userId: string) {
    const electronicDevices = await this.electronicDeviceRepository.findAllElectronicDevices(userId);
    return electronicDevices;
  }
}