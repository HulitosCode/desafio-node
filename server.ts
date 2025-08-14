import fastify from "fastify";

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { createCoursesRoute } from "./src/routes/create-course.ts";
import { getCoursesRoute } from "./src/routes/get-coureses.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import scalarAPIReference from "@scalar/fastify-api-reference"

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
}).withTypeProvider();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app.register(createCoursesRoute);
app.register(getCoursesRoute);
app.register(getCourseByIdRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
