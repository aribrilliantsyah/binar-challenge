const request = require('supertest')
const app = require('../app')
const { QueryTypes } = require('sequelize')
const { sequelize, UserGame } = require('../models')

const prefix = '/api/v1/'
const controller = 'user-game-history'
const path = `${prefix}${controller}` 
const jwt = require('jsonwebtoken')
const privateKey = 'Ari-Ganteng-Banget'

let token = '';
let id = 1;
let user_game_id = '';

describe('User Game history API Test', () => {
  beforeAll(async () => {
    let account = {
      "username": "ariganteng11",
      "password": "rahasia"
    }
    
    let res = await UserGame.create(account)
    user_game_id = res.id
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

  test(`POST ${path} - Success Create user game history`, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
      .send({
        "user_game_id": user_game_id,
        "score": 10,
        "start_at": "2022-04-07 10:10:00",
        "end_at": "2022-04-07 12:10:00"
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

  test(`GET ${path} - Success Get all (query user_game_id)`, async() => {
    const { body, statusCode } = await request(app).get(`${path}?user_game_id=${user_game_id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Success')
  })

  test(`PUT ${path}/${id} - Success Update user game history`, async() => {
    const { body, statusCode } = await request(app).put(`${path}/${id}`)
      .send({
        "user_game_id": user_game_id,
        "score": 30,
        "start_at": "2022-04-07 10:10:00",
        "end_at": "2022-04-07 12:10:00"
      })
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Success')
  })

  test(`DELETE ${path}/${id} - Success Delete user game history`, async() => {
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

  test(`POST ${path} - Unauthorized Create user game history`, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`GET ${path}/2 - Unauthorized Find by id `, async() => {
    const { body, statusCode } = await request(app).get(`${path}/2`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`PUT ${path}/2 - Unauthorized Update user game history`, async() => {
    const { body, statusCode } = await request(app).put(`${path}/2`)
      .send({
        "user_game_id": user_game_id,
        "score": 10,
        "start_at": "2022-04-07 10:10:00",
        "end_at": "2022-04-07 12:10:00"
      })
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  test(`DELETE ${path}/2 - Unauthorized Delete user game history`, async() => {
    const { body, statusCode } = await request(app).delete(`${path}/2`)
    expect(statusCode).toEqual(401)
    expect(body.message).toEqual('Unauthorized')
  })

  // Failed
  test(`POST ${path} - Failed Create user game history`, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
      .send()
      .set({
        Authorization: `Bearer ${token}`
      })

    let id = body?.data?.id
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  test(`GET ${path}/wkwkwk - Failed Find by id `, async() => {
    const { body, statusCode } = await request(app).get(`${path}/wkwkwk`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  test(`POST ${path} - Failed Create user game history (2) user_game_id = string`, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
      .send({
        'user_game_id': 'hh'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    let id = body?.data?.id
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  test(`PUT ${path}/${id} - Failed Update user game history`, async() => {
    const { body, statusCode } = await request(app).put(`${path}/${id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })
  
  test(`PUT ${path}/wkwk - Failed Update user game history (2) id = string`, async() => {
    const { body, statusCode } = await request(app).put(`${path}/wkwkw`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  test(`DELETE ${path}/wkwk - Failed Delete user game history (2) id = string`, async() => {
    const { body, statusCode } = await request(app).put(`${path}/wkwkw`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(400)
    expect(body.message).toEqual('Failed')
  })

  // Not Found
  id = 100
  test(`PUT ${path}/${id} - Data not found Update user game history`, async() => {
    const { body, statusCode } = await request(app).put(`${path}/${id}`)
      .send({
        "user_game_id": user_game_id,
        "score": 10,
        "start_at": "2022-04-07 10:10:00",
        "end_at": "2022-04-07 12:10:00"
      })
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('Data not found')
  })

  test(`DELETE ${path}/${id} - Data not found Delete user game history`, async() => {
    const { body, statusCode } = await request(app).delete(`${path}/${id}`)
      .set({
        Authorization: `Bearer ${token}`
      })
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual(`Data not found`)
  })

  // User Game ID Not Found
  ug_id = 100
  test(`POST ${path} - User game id not found Create user game history`, async() => {
    const { body, statusCode } = await request(app).post(`${path}`)
      .send({
        "user_game_id": ug_id,
        "name": "Ari Ardiansyah",
        "gender": "Male",
        "date_of_birth": "2000-09-08",
        "place_of_birth": "Bandung",
        "address": "Kp.Rancakasiat"
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    id = body?.data?.id
    expect(statusCode).toEqual(200)
    expect(body.message).toEqual('User game id not found')
  })

})