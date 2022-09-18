
//import jwt from "jsonwebtoken";
//import bcryptjs from 'bcryptjs';
import {connection} from '../config/mysqlConector.js'
import dotenv from 'dotenv'
dotenv.config();

const allOperations = (req, res) => {
    try {
        const sql = `SELECT * FROM operations INNER JOIN users ON id_userLogin = id_user WHERE id_userLogin = ${req.userId}`
        const createTableOperations = `CREATE TABLE IF NOT EXISTS ibm_alkemy2022.operations (
            id_operation INT NOT NULL AUTO_INCREMENT , 
            concept VARCHAR(100) NOT NULL , 
            amount INT NOT NULL , 
            date TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL , 
            type VARCHAR(50) NOT NULL , 
            category VARCHAR(50) NOT NULL , 
            id_userLogin INT NOT NULL , 
            PRIMARY KEY (id_operation))`

        connection.query(createTableOperations, (error) => {
            if (error) {
                res.status(400).json({msg: "The operations table cannot be created", error})
            }
        })

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
        } catch (error) {
        res.status(500).json({msg: "There was an error", error})
    }
}


const lasTenOperations = async (req, res) => {
    try {
        const sql = `SELECT * FROM operations INNER JOIN users ON id_userLogin = id_user WHERE id_userLogin=${req.userId} ORDER BY id_operation DESC limit 10`
    
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
        } catch (error) {
            res.status(500).json({msg: "There was an error", error})
    }

}



const getOneOperation = async (req, res) => {
    try {
        const { id } = req.params
        const sql = `SELECT * FROM operations WHERE id_operation=${id}`
        
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })

    } catch (error) {
        res.status(500).json({msg: "There was an error", error})
    }
}

const newOperation = async (req, res) => {
    try {
        const {concept, amount, date, type, category} = req.body;
        const id = req.userId
        const values = [concept, amount, date, type, category, id]
        const sql = `INSERT INTO operations (id_operation, concept, amount, date, type, category, id_userLogin) VALUES (null,'${concept}',${amount},'${date}','${type}','${category}', '${id}')`
        
        await connection.query(sql, values,(error, result) => {
            if (error) {
                  res.status(400).json(error)
              } else {
                  res.status(201).json({msg: "New register created", values})
               }
         })
     } catch (error) {
        res.status(500).json({msg: "There was an error", error})
     }
    
}

const deleteOperation = async (req, res) => {
    try {
        const { id } = req.params
        const sql = `DELETE FROM operations WHERE id_operation=${id}`
        
        connection.query(sql, (error) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({ msg: "Item removed successfully"})
            }
        })

    } catch (error) {
        res.status(500).json({msg: "There was an error", error})
    }
     
}

const updateOperation = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        let sql;
        for (const property in body) {
            sql = (`UPDATE operations SET ${property}='${body[property]}' WHERE id_operation=${id}`)
            connection.query(sql, (error) => {
                if(error !== null) {
                    res.status(400).json(error)
                } 
            })
          }
          res.status(200).json({msg: "Operation updated successfully"})

    } catch (error) {
        res.status(500).json({msg: "There was an error", error})
    }
     
}



const operationsController = { 
    allOperations,
    lasTenOperations,
    newOperation,
    deleteOperation,
    updateOperation,
    getOneOperation,

}

export default operationsController;