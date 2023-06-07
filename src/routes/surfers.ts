import * as SurfersController from '../controllers/surfers-controller';

export async function SurfersRoute(server){
    server.get('/surfers', SurfersController.getSurfers);
}