import prisma from '../../../prisma/prisma';
import { CreateBatterySurferDTO } from '../dtos/create-battery-dto';

export default class BatteryRepository {
  public async createBattery(){
    return await prisma.battery.create({ data: {} });
  }
  public async createBatterySurfer({ battery_id, surfer_number }: CreateBatterySurferDTO){
    return await prisma.batterySurfer.create({ data: { batteryId: battery_id, surferNumber: surfer_number }});
  }
  public async getSurfers(batteryId: string){
    return await prisma.batterySurfer.findMany({ where: { batteryId }});
  }
}