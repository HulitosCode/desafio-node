import { expect, test } from "vitest";
import request from "supertest";
import { app } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "../test/factories/make-user.ts";

test("Create a course", async () => {
  await app.ready();

  // Aqui o usuario deve estar autenicado como manager para criar curso
  const { token } = await makeAuthenticatedUser("manager");

  const response = await request(app.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .set("Authorization", token) // set o token de autenticacao do manager
    .send({ title: faker.lorem.words(6) });

  expect(response.status).toEqual(201);
  expect(response.body).toEqual({
    courseId: expect.any(String),
  });
});
