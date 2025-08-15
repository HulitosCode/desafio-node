ALTER TABLE "enrollments" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();