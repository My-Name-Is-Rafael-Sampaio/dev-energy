import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { electronicDevicesRoutes } from "./http/controllers/devices/routes";

export const app = fastify();

app.register(usersRoutes);
app.register(electronicDevicesRoutes, { prefix: "/electronics" });
