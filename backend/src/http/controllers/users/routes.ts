import { FastifyInstance } from "fastify";
import { create } from "./create.controller";
import { authenticate } from "./authenticate.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/signup", create);
  app.post("/sessions", authenticate);
}
