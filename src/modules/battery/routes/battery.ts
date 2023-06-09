import * as BatteryController from '../controller/battery.controller';

export async function BatteryRoute(server){
  server.post('/battery/new', BatteryController.newBattery);
  server.post('/battery/:batteryId/wave/new', BatteryController.newBatteryWave);
  server.get('/battery/:batteryId/winner', BatteryController.getBatteryWinner);
}