import WaveRepository from '../repository/wave.repository';

const waveRepository = new WaveRepository();

export async function newWaveScore(request, reply){
  const { waveId } = request.params;
  const { partial_score_one, partial_score_two, partial_score_three } = request.body;

  try {
    await waveRepository.newScore({wave_id: waveId, partial_score_one, partial_score_two, partial_score_three});

    reply.status(200).send({ message: 'Add new score at wave.' });
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}