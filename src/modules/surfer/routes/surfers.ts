import * as SurfersController from '../controller/surfers.controller';

export async function SurfersRoute(server){
  server.get('/surfers', SurfersController.getAllSurfers);
  server.post('/surfers/new', SurfersController.newSurfer);
  server.get('/surfers/search', SurfersController.getAllSurfersByCountry);
  server.patch('/surfers/:surferNumber/edit', SurfersController.editSurfer);
  server.delete('/surfers/:surferNumber', SurfersController.removeSurfer);
}