import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    errorResponseBuilder: (request, context) => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: `Překročen limit požadavků. Zkuste to za ${context.after}.`,
    }),
  });
});
