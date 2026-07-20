import type { RouteHandlerMethod } from "fastify";
import { Type } from "@sinclair/typebox";
import { isValidWebUrl } from "../lib/validate.js";

export const ShortenBodySchema = Type.Object({
  url: Type.String({ format: "uri" }),
});

export const handleShorten: RouteHandlerMethod = async (request, reply) => {
  const { url } = request.body as { url: string };

  if (!isValidWebUrl(url)) {
    return reply.status(400).send({
      error: "Bad Request",
      message:
        "Zadaný text není platná URL adresa. Musí začínat http:// nebo https://",
    });
  }

  const shortCode = Math.random().toString(36).substring(2, 8);

  return reply.status(201).send({
    shortCode,
    shortUrl: `http://localhost:3000/${shortCode}`,
    originalUrl: url,
  });
};
