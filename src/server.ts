import fastify from 'fastify';
import dotenv from 'dotenv';
import { SurfersRoute } from './routes/surfers';

dotenv.config();

const server = fastify();

server.register(SurfersRoute);

const port = parseInt(process.env.PORT || '3000', 10);

server.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Started server at ${address}`);
});