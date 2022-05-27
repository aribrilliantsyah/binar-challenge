const request = require('supertest')
const app = require('../app')
const { QueryTypes } = require('sequelize')
const { sequelize, UserGame } = require('../models')

const prefix = '/api/v1/'
const controller = 'user-game'
const path = `${prefix}${controller}` 
const jwt = require('jsonwebtoken')
const privateKey = 'Ari-Ganteng-Banget'

let token = '';
let id = 1;

describe('User Game API Test', () => {
  beforeAll(async () => {
    let account = {
      "username": "ariganteng11",
      "password": "rahasia"
    }
    
    let user_game_id = await UserGame.create(account)
    token = jwt.sign({
      id: user_game_id,
      username: account.username,
      password: account.password
    }, privateKey, {
      expiresIn: '1d'
    })
  })

  afterAll(async () => {
    try {
      await sequelize.query("TRUNCATE user_game, user_game_biodata, user_game_history RESTART IDENTITY;", { type: QueryTypes.RAW });
    } catch (error) {
      //console.log(error)
    }
  })

  // Success
  test(`GET ${path} - Success Get all `, async() => {
    const { body, statusCode } = await request(app).get(`${path}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Success')
  })

  test(`POST ${path} - Success Create user game `, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
    .send({
      "username": "ariganteng",
      "password": "rahasia"
    })
    .set({
      Authorization: `Bearer ${token}`
    })
    
    id = body.data.id
    expect(statusCode).toEqual(201)
    expect(body.message).toEqual('Success')
  })

  test(`GET ${path}/${id} - Success Find by id `, async() => {
    const { body, statusCode } = await request(app).get(`${path}/${id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Success')
  })

  test(`PUT ${path}/${id} - Success Update user game `, async() => {
    const { body, statusCode } = await request(app).put(`${path}/${id}`)
      .send({
        "username": "ariganteng123",
        "password": "rahasia"
      })
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Success')
  })

  test(`DELETE ${path}/${id} - Success Delete user game `, async() => {
    const { body, statusCode } = await request(app).delete(`${path}/${id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual(`Success delete data with id ${id}`)
  })

  // Without Auth
  test(`GET ${path} - Unauthorized Get all `, async() => {
    const { body, statusCode } = await request(app).get(`${path}`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`POST ${path} - Unauthorized Create user game `, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`GET ${path}/2 - Unauthorized Find by id `, async() => {
    const { body, statusCode } = await request(app).get(`${path}/2`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`PUT ${path}/2 - Unauthorized Update user game `, async() => {
    const { body, statusCode } = await request(app).put(`${path}/2`)
      .send({
        "username": "ariganteng123",
        "password": "rahasia"
      })
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`DELETE ${path}/2 - Unauthorized Delete user game `, async() => {
    const { body, statusCode } = await request(app).delete(`${path}/2`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  // Failed
  test(`POST ${path} - Failed Create user game `, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
      .send()
      .set({
        Authorization: `Bearer ${token}`
      })

    let id = body?.data?.id
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  test(`PUT ${path}/${id} - Failed Update user game `, async() => {
    const { body, statusCode } = await request(app).put(`${path}/${id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  // Not Found
  id = 100
  test(`PUT ${path}/${id} - Data not found Update user game `, async() => {
    const { body, statusCode } = await request(app).put(`${path}/${id}`)
      .send({
        "username": "ariganteng123",
        "password": "rahasia"
      })
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Data not found')
  })

  test(`DELETE ${path}/${id} - Data not found Delete user game `, async() => {
    const { body, statusCode } = await request(app).delete(`${path}/${id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual(`Data not found`)
  })

})