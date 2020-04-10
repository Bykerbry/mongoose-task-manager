const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Jim',
    email: 'jim@mailers.com',
    password: 'anotherPass123'
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should singup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Bryce',
        email: 'bryce@mailer.com',
        password: 'mypass123'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'hello',
        password: 'notmypass'
    }).expect(400)
})