import fastify from "fastify";

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";

import scalarAPIReference from "@scalar/fastify-api-reference";
import { createCoursesRoute } from "./routes/create-course.ts";
import { getCoursesRoute } from "./routes/get-coureses.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import type{ ZodTypeProvider } from "fastify-type-provider-zod";
import { loginRoute } from "./routes/login.ts";

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty", //pino-pretty é um formatador de logs  usado pelo Fastify
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid, hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Desafio Node.js",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(scalarAPIReference, {
    routePrefix: "/docs",
  });
}

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createCoursesRoute);
app.register(getCoursesRoute);
app.register(getCourseByIdRoute);
app.register(loginRoute)

export { app };
