import { randomUUID } from "crypto"
import fastify from "fastify"

const app = fastify({
    logger: true
})

const courses = [
    {
        id: "1",
        title: "DEV Front"
    },
    {
        id: "2",
        title: "DEV Back"
    }
]

app.get('/courses', () => {
    return {courses}
})

app.get('/courses/:id', (request, reply) => {
    const courseId = request.params.id

    const course = courses.find(course => course.id === courseId)

    if (course) {
        return { course }
    }

    return reply.status(404).send()
})

app.post('/courses', (request, reply) => {
    const courseId = crypto.randomUUID()
    const courseTitle = request.body.title

    if (!courseTitle) {
        return reply.status(400).send({ message: 'Titulo e obrigatorio'})
    }
    courses.push({
        id: courseId, title: courseTitle
    })
    return reply.status(201).send({ courseId, courseTitle })
})


app.listen({
    port: 3333
}).then(
    () => {
        console.log('HTTP server running')
    }
)