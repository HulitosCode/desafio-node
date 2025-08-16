import { expect, test } from "vitest";
import request from "supertest";
import { app } from "../app.ts";
import { makeCourse } from "../test/factories/make-course.ts";

test("Get a course By Id", async () => {
  await app.ready();

  const course = await makeCourse();

  const response = await request(app.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});
