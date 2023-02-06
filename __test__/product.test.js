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

//Read product customer

describe('GET /pub/products', () => {
    describe('GET /pub/products - success test', () => {
        it('should be return an array of products data from database', async () => {

            const response = await request(app).get('/pub/products?page=1&size=3&search')
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('response');
            expect(response.body).toHaveProperty('response', expect.any(Object));
        })
    })

    describe('GET /pub/products - error', () => {
        it('should be return an object with message', async () => {

            const response = await request(app).get('/pub/products?page=0')
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})

//Read product by id customer

describe('GET /pub/products/:id', () => {
    describe('GET /pub/products - success test', () => {
        it('should be return an array of products data from database', async () => {

            const response = await request(app).get('/pub/products/1')
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('product');
            expect(response.body).toHaveProperty('product', expect.any(Object));
        })
    })

    describe('GET /pub/products/categories/:id - error', () => {
        it('should be return an object with message', async () => {

            const response = await request(app).get('/pub/products/a')
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})