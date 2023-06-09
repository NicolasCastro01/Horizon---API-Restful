import ScoreRepository from '../../score/repository/score.repository';
import WaveRepository from '../../wave/repository/wave.repository';
import BatteryRepository from '../repository/battery.repository';

const batteryRepository = new BatteryRepository();
const waveRepository = new WaveRepository();
const scoreRepository = new ScoreRepository();

interface SurferScore {
  id: string,
  waveId: string,
  partialScoreOne: number,
  partialScoreTwo: number,
  partialScoreThree: number
}

function hasTwoScores(surferScore: SurferScore[]): boolean{
  return surferScore.length === 2;
}

function sumScores(scores = []): number{
  return scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function arithmeticAverage(scores = []): number{
  return (sumScores(scores)) / scores.length;
}

export async function getBatteryWinner(request, reply) {
  const { batteryId } = request.params;

  try {
    const surfers = await batteryRepository.getSurfers(batteryId);
    const hasTwoSurfers = surfers.length === 2;

    if(!hasTwoSurfers){
      return reply.status(200).send({ message: 'There arent enough surfers in the heat to have a winner.' });
    }

    const [surferOneScore, surferTwoScore] = await Promise.all([
      await scoreRepository.getSurfersScore(surfers[0].surferNumber), 
      await scoreRepository.getSurfersScore(surfers[1].surferNumber)
    ]);
    const [surferOneScoreLength, surferTwoScoreLength] = [surferOneScore, surferTwoScore].map(surferScores => hasTwoScores(surferScores));
    const surfersScoresIsValid = surferOneScoreLength && surferTwoScoreLength;

    if(!surfersScoresIsValid){
      return reply.status(200).send({ message: 'There are not enough notes to have the conclusion of who is the winner.' });
    }

    const surferOneScores = surferOneScore.map(({partialScoreOne, partialScoreTwo, partialScoreThree}) => arithmeticAverage([partialScoreOne, partialScoreTwo, partialScoreThree]));
    const surferTwoScores = surferTwoScore.map(({partialScoreOne, partialScoreTwo, partialScoreThree}) => arithmeticAverage([partialScoreOne, partialScoreTwo, partialScoreThree]));
    const surferOneSum = sumScores(surferOneScores).toFixed(1);
    const surferTwoSum = sumScores(surferTwoScores).toFixed(1);
    const scoresDraw = Number(surferOneSum) === Number(surferTwoSum);

    if (scoresDraw){
      return reply.status(200).send({ message: 'There was a tie.' });
    }

    const surferOneIsWinner = Number(surferOneSum) > Number(surferTwoSum);

    if (!surferOneIsWinner){
      return reply.status(200).send({ result: `Surfer #${surfers[1].surferNumber} was the winner.`, score: surferTwoSum });
    }

    reply.status(200).send({ result: `Surfer #${surfers[0].surferNumber} was the winner.`, score: surferOneSum});
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }

}

export async function newBattery(request, reply) {
  const { surfer_number_one, surfer_number_two} = request.body;

  try {
    const newBattery = await batteryRepository.createBattery();
    
    await batteryRepository.createBatterySurfer({ battery_id: newBattery.id, surfer_number: surfer_number_one});
    await batteryRepository.createBatterySurfer({ battery_id: newBattery.id, surfer_number: surfer_number_two});

    reply.status(200).send({ bateriaId: newBattery.id, message: `Heat created for the number ${surfer_number_one} and number ${surfer_number_two} surfer.` });
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function newBatteryWave(request, reply) {
  const { batteryId } = request.params;
  const { surfer_number, partial_score_one, partial_score_two, partial_score_three } = request.body;

  try {
    const newWave = await waveRepository.newWave({ battery_surfer_id: batteryId, battery_surfer_number: Number(surfer_number) });

    await waveRepository.newScore({wave_id: newWave.id, partial_score_one, partial_score_two, partial_score_three});

    reply.status(200).send({waveId: newWave.id, batteryId, message: 'New wave has been created at heat.'} );
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}
