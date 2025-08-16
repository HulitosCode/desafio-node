import { expect, test } from "vitest";
import request from "supertest";
import { app } from "../app.ts";
import { makeCourse } from "../test/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("Get a courses", async () => {
  await app.ready();

  const titleId = randomUUID();

  const course = await makeCourse(titleId);

  const response = await request(app.server).get(`/courses?search=${titleId}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      },
    ],
  });
});
