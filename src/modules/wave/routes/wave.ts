import * as WaveController from '../controller/wave.controller';

export async function WaveRoute(server){
  server.post('/waves/:waveId/score/new', WaveController.newWaveScore);
}