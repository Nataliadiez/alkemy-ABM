import express from 'express';
import operationsController from '../controllers/operationsController.js';
import {validateToken} from '../middlewares/index.js'
const router = express.Router()

//Base route: "api/operations"

router.get('/', validateToken, operationsController.allOperations)

router.get('/last_operations/', validateToken, operationsController.lasTenOperations)

router.post('/', validateToken, operationsController.newOperation)

router.get('/:id',validateToken, operationsController.getOneOperation)

router.delete('/:id', validateToken, operationsController.deleteOperation)

router.patch('/:id', validateToken, operationsController.updateOperation)



export { router };