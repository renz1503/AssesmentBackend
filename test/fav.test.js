const request = require("supertest");
const server = require('../server/server')
const { close } = require('../server/connect');
let _id = ''

describe('Test API', () =>{
    afterAll(async () => { 
        await server.close()
        await close()
    })

    test('Should not get all lists', async () => {
        const res = await request(server).get('/api/favs/')
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(401)
    })

    test('Should not get all lists', async () => {
        const res = await request(server).get('/api/favs/')
                                         .set({ token: 'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(401)
    })

    test('Should get all lists', async () => {
        const res = await request(server).get('/api/favs/')
                                         .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
    })

    test('Should not create a new list', async () => {
        const res = await request(server).post('/api/favs/')
                                         .set({ token: 'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
                                         .send({
                                            "user": "6264e77f7489faf52b02db3e",
                                            "name": "prueba",
                                            "favs": [{
                                                "title": "titulo1",
                                                "description": "descripcion1",
                                                "link": "link1"
                                            }]
                                         })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(401)
    })

    test('Should create a new list', async () => {
        const res = await request(server).post('/api/favs/')
                                         .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
                                         .send({
                                            "user": "6264e77f7489faf52b02db3e",
                                            "name": "prueba",
                                            "favs": [{
                                                "title": "titulo1",
                                                "description": "descripcion1",
                                                "link": "link1"
                                            }]
                                         })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(201)
        _id = JSON.parse(res.text).fav._id
    })

    test('Should update a specific list', async () => {
        const res = await request(server).post('/api/favs/')
                                         .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
                                         .send({
                                             "_id": _id,
                                            "user": "6264e77f7489faf52b02db3e",
                                            "name": "prueba",
                                            "favs": [{
                                                "title": "titulo1",
                                                "description": "descripcion1",
                                                "link": "link1"
                                            },
                                            {
                                                "title": "titulo2",
                                                "description": "descripcion2",
                                                "link": "link2"
                                            }]
                                         })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
    })

    test('Should not get a specific list', async () => {
        const res = await request(server).get('/api/favs/'+_id)
                                         .set({ token: 'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(401)
    })

    test('Should get a specific list', async () => {
        const res = await request(server).get('/api/favs/'+_id)
                                         .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
    })

    test('Should not delete a specific list', async () => {
        const res = await request(server).delete('/api/favs/'+_id)
                                         .set({ token: 'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(401)
    })

    test('Should delete a specific list', async () => {
        const res = await request(server).delete('/api/favs/'+_id)
                                         .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjRlNzdmNzQ4OWZhZjUyYjAyZGIzZSIsImlhdCI6MTY1MDc4NDQ0OSwiZXhwIjoxNjgyMzIwNDQ5fQ.tqSp_3YQ5Uq5gTGyf-4gc5w0cuEIGE4NFUubrJAWquM' })
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
    })
})