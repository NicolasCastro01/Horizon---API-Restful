import prisma from '../../../prisma/prisma';

export default class ScoreRepository {
  public async getSurfersScore(surferNumber: number){
    return await prisma.score.findMany({ where: { wave: { batterySurfer: { surferNumber } } } });
  }
}