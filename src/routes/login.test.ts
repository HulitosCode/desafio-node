import { expect, test } from "vitest"
import request from "supertest"
import { app } from "../app.ts"
import { makeUser } from "../test/factories/make-user.ts"

test('login', async () => {
    await app.ready()

    const { user, passwordBeforeHash } = await makeUser()

    const response = await request(app.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({
            email: user.email,
            password: passwordBeforeHash,
        })
    
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        message: 'ok'
    })
})