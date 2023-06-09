import prisma from '../../../prisma/prisma';
import { CreateSurferDTO } from '../dtos/create-surfer-dto';
import { EditSurferDTO } from '../dtos/edit-surfer-dto';

export default class SurferRepository {
  public async getAllSurfers(){
    return await prisma.surfer.findMany();
  }
  public async getAllSurfersByCountry(country){
    return await prisma.surfer.findMany({where: { country }});
  }
  public async createSurfer({number, name, country}: CreateSurferDTO){
    return await prisma.surfer.create({ data: { number, name, country } });
  }
  public async editSurfer(number: number, surferData: EditSurferDTO){
    return await prisma.surfer.update({ where: { number }, data: surferData });
  }
  public async removeSurfer(surferNumber){
    return await prisma.surfer.delete({ where: { number: surferNumber } });
  }
}