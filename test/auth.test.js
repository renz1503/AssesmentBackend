const request = require("supertest");
const server = require('../server/server')
const { close } = require('../server/connect');

describe('Test Login', () =>{
    afterAll(async () => { 
        await server.close()
        await close()
    })

    test('Should login', async () => {
        const res = await request(server).post('/auth/local/login')
                                         .send({
                                            "email": "renzo123@correo.com",
	                                        "password": "12345"
                                            })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(201)
    })
})