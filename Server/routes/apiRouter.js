import express from 'express';
import { router as authRouter } from './auth.js';
import { router as operationsRouter} from './operations.js';

const router = express.Router()
//Base route: "api/"

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "This is ABM Backend App 2022 Working. Documentation is still in progress..."
    })
})


router.use('/users', authRouter) 

router.use('/operations', operationsRouter) 


export { router };
