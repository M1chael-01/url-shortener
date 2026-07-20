import type { FastifyInstance } from 'fastify';

export async function shortenRoutes(fastify: FastifyInstance) {
  fastify.get('/shorten', async (request, reply) => {
    return reply.send('This is the route for shortening URLs.');
  });
}
