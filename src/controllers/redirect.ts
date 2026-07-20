import type { RouteHandlerMethod } from "fastify";
import { urlService } from "../services/url.ts";

export const handleRedirect: RouteHandlerMethod = async (request, reply) => {
  const { code } = request.params as { code: string };

  try {
    const originalUrl = await urlService.getOriginalUrl(code);

    if (!originalUrl) {
      return reply.status(404).send({
        error: "Not Found",
        message: "Zadaný krátký odkaz neexistuje nebo již vypršel.",
      });
    }

    return reply.redirect(originalUrl, 302);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Došlo k chybě při zpracování přesměrování z databáze.",
    });
  }
};
