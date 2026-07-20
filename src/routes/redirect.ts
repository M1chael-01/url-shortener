import type { FastifyInstance } from "fastify";
import { handleRedirect } from "../controllers/redirect.ts";

export async function redirectRoutes(fastify: FastifyInstance) {
  fastify.get("/:code", handleRedirect);
}
