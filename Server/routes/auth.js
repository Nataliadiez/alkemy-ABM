import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router()

//Base route: "api/users"

router.post('/login', authController.login)

router.post('/register', authController.register)



export { router };