import type { FastifyInstance } from "fastify";
import { handleShorten } from "../controllers/shorten.js";

export async function shortenRoutes(fastify: FastifyInstance) {
  fastify.post("/shorten", handleShorten);
}
