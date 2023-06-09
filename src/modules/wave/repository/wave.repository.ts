import prisma from '../../../prisma/prisma';
import { CreateScoreWaveDTO } from '../dtos/create-score-wave-dto';
import { CreateWaveDTO } from '../dtos/create-wave-dto';

export default class WaveRepository {
  public async newWave({ battery_surfer_id, battery_surfer_number }: CreateWaveDTO){
    return await prisma.wave.create({ data: { batterySurferId: battery_surfer_id, batterySurferNumber: battery_surfer_number }});
  }
  public async newScore({ wave_id, partial_score_one, partial_score_two, partial_score_three }: CreateScoreWaveDTO){
    return await prisma.score.create({ data: { waveId: wave_id, partialScoreOne: partial_score_one, partialScoreTwo: partial_score_two, partialScoreThree: partial_score_three } });
  }
}