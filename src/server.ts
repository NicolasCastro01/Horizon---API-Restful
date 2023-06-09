import fastify from 'fastify';
import dotenv from 'dotenv';
import prisma from './prisma/prisma';
import { SurfersRoute } from './modules/surfer/routes/surfers';
import { BatteryRoute } from './modules/battery/routes/battery';
import { WaveRoute } from './modules/wave/routes/wave';

dotenv.config();

const server = fastify();

server.register(SurfersRoute);
server.register(BatteryRoute);
server.register(WaveRoute);

const port = parseInt(process.env.PORT || '3000', 10);

async function main(){
  try {
    await prisma.$connect();
    console.log('[DB] > Connected!');
        
    server.listen({ port }, (err, address) => {
      console.log(`[SV] > Started server at ${address}`);
    });
  } catch (error) {
    console.log(error);
    console.error('[SV] > An error occurred while initializing the server.');
    process.exit(1);
  }
}

main();

process.on('SIGINT', async () => {
  try {
    await prisma.$disconnect();
    console.log('[DB] > Disconnected!');
    process.exit(0);
  } catch (error) {
    console.error('[DB] > An error occurred while trying to terminate the connection to the database.');
    process.exit(1);
  }
});