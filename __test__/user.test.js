const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const fs = require("fs");
const { hashPassword, compareHash } = require('../helpers/bcrypt');
let access_token;

beforeAll(async () => {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    users.forEach(x => {
        x.createdAt = new Date();
        x.updatedAt = new Date();
        x.password = hashPassword(x.password)
    });
    await queryInterface.bulkInsert("Users", users, {});

    let categories = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"));
    categories.forEach(x => {
        x.createdAt = new Date();
        x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories, {});

    let products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
    products.forEach(x => {
        x.createdAt = new Date();
        x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Products", products, {});
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
    await queryInterface.bulkDelete("Categories", null, { truncate: true, cascade: true, restartIdentity: true });
    await queryInterface.bulkDelete("Products", null, { truncate: true, cascade: true, restartIdentity: true });
})

//Register

describe('POST /pub/users/register', () => {
    describe('POST /pub/users/register - success test', () => {
        it('should be return an object with message', async () => {
            const payload = { email: 'test1@mail.com', password: '12345', role: 'Customer', phoneNumber: '1111111', address: 'Address' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })

    describe('POST /pub/users/register - error', () => {
        it('should be return an object with message', async () => {
            const payload = { email: undefined, password: '150697', role: 'Customer', phoneNumber: '537286', address: 'Melati' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })

        it('should be return an object with message', async () => {
            const payload = { email: 'test1@mail.com', password: undefined, role: 'Customer', phoneNumber: '537286', address: 'Melati' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })

        it('should be return an object with message', async () => {
            const payload = { email: '', password: '150697', role: 'Customer', phoneNumber: '537286', address: 'Melati' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })

        it('should be return an object with message', async () => {
            const payload = { email: 'test1@mail.com', password: '', role: 'Customer', phoneNumber: '537286', address: 'Melati' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })

        it('should be return an object with message', async () => {
            const payload = { email: 'test1@mail.com', password: '55555', role: 'Customer', phoneNumber: '537286', address: 'Melati' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })

        it('should be return an object with message', async () => {
            const payload = { email: 'test1mail.com', password: '150697', role: 'Customer', phoneNumber: '537286', address: 'Melati' };

            const response = await request(app).post('/pub/users/register').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})

//Login

describe('POST /pub/users/login', () => {
    describe('POST /pub/users/login - success test', () => {
        it('should be return an object with access_token,id,email,role', async () => {
            const payload = { email: 'test1@mail.com', password: '150697' };

            const response = await request(app).post('/pub/users/login').send(payload)
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('access_token');
            expect(response.body).toHaveProperty('access_token', expect.any(String));
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('id', expect.any(Number));
            expect(response.body).toHaveProperty('email');
            expect(response.body).toHaveProperty('email', expect.any(String));
            expect(response.body).toHaveProperty('role');
            expect(response.body).toHaveProperty('role', expect.any(String));
            access_token = response.body.access_token
        })
    })

    describe('POST /pub/users/login - error', () => {
        it('should be return an object with message', async () => {
            const payload = { email: 'test1@mail.com', password: '5555' };

            const response = await request(app).post('/pub/users/login').send(payload)
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })

        it('should be return an object with message', async () => {
            const payload = { email: undefined, password: undefined };

            const response = await request(app).post('/pub/users/login').send(payload)
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})


//Read wishlist

describe('GET /pub/wishlist', () => {
    describe('GET /pub/wishlist - success test', () => {
        it('should be return an array of wishlist data from database', async () => {

            const response = await request(app).get('/pub/wishlist').set('access_token', access_token)
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('wishlist');
            expect(response.body).toHaveProperty('wishlist', expect.any(Array));
        })
    })

    describe('GET /pub/wishlist - error', () => {
        it('should be return an object with message', async () => {

            const response = await request(app).get('/pub/wishlist')
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})


//Create wishlist

describe('POST /pub/wishlist/:productId', () => {
    describe('POST /pub/wishlist/:productId - success test', () => {
        it('should be return an object of wishlist data', async () => {

            const response = await request(app).post('/pub/wishlist/1').set('access_token', access_token)
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('wishlist');
            expect(response.body).toHaveProperty('wishlist', expect.any(Object));
        })
    })

    describe('POST /pub/wishlist/:productId - error', () => {
        it('should be return an object with message', async () => {

            const response = await request(app).post('/pub/wishlist/a').set('access_token', access_token)
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})
