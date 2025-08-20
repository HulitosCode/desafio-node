import { expect, test } from "vitest";
import request from "supertest";
import { app } from "../app.ts";
import { makeCourse } from "../test/factories/make-course.ts";
import { makeAuthenticatedUser } from "../test/factories/make-user.ts";

test("Get a course By Id", async () => {
  await app.ready();

  const { token } = await makeAuthenticatedUser('student')
  const course = await makeCourse();

  const response = await request(app.server)
    .get(`/courses/${course.id}`)
    .set('Authorization', token)

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});



test("Test return 404 for non existing courses", async () => {
  await app.ready();

  const { token } = await makeAuthenticatedUser('student')
  const course = await makeCourse();

  const response = await request(app.server)
    .get(`/courses/2733a765-93a8-4c36-9aec-b0d7492b3919`)
    .set('Authorization', token)

  expect(response.status).toEqual(404);
});