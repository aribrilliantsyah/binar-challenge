const controller = require('../controllers/api/AuthController')
const { sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const mockRequest = (body = {}) => ({ body })
const mockResponse = () => {
  const res = {}
  res.json = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  return res
}
const base = new controller();

describe('AuthController Test', () => {
  beforeAll(async() => {
  })

  afterAll(async () => {
    try {
      await sequelize.query("TRUNCATE user_game, user_game_biodata, user_game_history RESTART IDENTITY;", {
        type: QueryTypes.RAW
      });
    } catch (error) {
      //console.log(error)
    }
  })

  test('function register with Register success, please sign in', async () => {
    const req = mockRequest({
      username: 'ariganteng',
      email: "kurosaki.ari.kun@gmail.com",
      password: 'rahasia',
      role_id: 1,
    })
    const res = mockResponse()
    await base.register(req, res)
    expect(res.status).toBeCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        "message": "Register success, please sign in", 
      })
    )
  })

  test('function register with Failed', async () => {
    const req = mockRequest()
    const res = mockResponse()
    await base.register(req, res)
    expect(res.status).toBeCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        "message": "Failed", 
      })
    )
  })

  test('function login with Username & Password Match', async () => {
    const req = mockRequest({
      username: 'ariganteng',
      password: 'rahasia'
    })
    const res = mockResponse()
    await base.login(req, res)
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        "message": "Username & Password Match", 
      })
    )
  })

  test('function login with Failed', async () => {
    const req = mockRequest()
    const res = mockResponse()
    await base.login(req, res)
    expect(res.status).toBeCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        "message": "Failed", 
      })
    )
  })

  test('function login with Username not found', async () => {
    const req = mockRequest({
      username: 'ariganteng123',
      password: 'rahasia'
    })
    const res = mockResponse()
    await base.login(req, res)
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({
      message: 'Username not found', 
    })
  })

  test('function login with Invalid password', async () => {
    const req = mockRequest({
      username: 'ariganteng',
      password: 'rahasia123'
    })
    const res = mockResponse()
    await base.login(req, res)
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({
      message: 'Invalid password', 
    })
  })
})