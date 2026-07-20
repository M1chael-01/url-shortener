import "dotenv/config";
import Fastify from "fastify";
import fastifyRateLimit from "@fastify/rate-limit";
import { shortenRoutes } from "./routes/shorten.ts";
import { redirectRoutes } from "./routes/redirect.ts";

const fastify = Fastify({ logger: true });

const PORT = Number(process.env.PORT) || 3000;

fastify.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  function (req, body, done) {
    try {
      const json = JSON.parse(body as string);
      done(null, json);
    } catch (err: any) {
      err.statusCode = 400;
      done(err, undefined);
    }
  },
);

const start = async () => {
  try {
    await fastify.register(fastifyRateLimit, {
      max: 100,
      timeWindow: "1 minute",
      errorResponseBuilder: (request, context) => ({
        statusCode: 429,
        error: "Too Many Requests",
        message: `Překročili jste limit požadavků. Zkuste to znovu za ${context.after}.`,
      }),
    });

    await fastify.register(shortenRoutes);
    await fastify.register(redirectRoutes);

    await fastify.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
