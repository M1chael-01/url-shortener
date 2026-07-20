import Fastify from "fastify";
import { shortenRoutes } from "./routes/shorten.js";

const fastify = Fastify({ logger: true });

await fastify.register(shortenRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
