import type { RouteHandlerMethod } from "fastify";

export const handleShorten: RouteHandlerMethod = async (request, reply) => {
  return reply.send(
    "This is the route for shortening URLs (handled by Controller).",
  );
};
