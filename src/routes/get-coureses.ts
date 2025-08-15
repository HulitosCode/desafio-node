import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import z from "zod";
import { ilike, asc } from "drizzle-orm"

export const getCoursesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(['id', 'title']).optional().default('id')
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy } = request.query

      // No Select escolhemos quais dados queremos trazer, passando os objectos dentro,ou sem objecto para trazer todos dados
      const result = await db
        .select({
          id: courses.id,
          title: courses.title,
        })
        .from(courses)
        .orderBy(asc(courses[orderBy]))
        .where(
          search ? ilike(courses.title, `%${search}%`): undefined
        )
  
      return reply.send({ courses: result });
    },
  );
};
