
//import jwt from "jsonwebtoken";
//import bcryptjs from 'bcryptjs';
import {connection} from '../config/mysqlConector.js'
import dotenv from 'dotenv'
dotenv.config();

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const values = [email, password];
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
        const createTableUsers = `CREATE TABLE IF NOT EXISTS ibm_alkemy2022.users (
            id_user INT NOT NULL AUTO_INCREMENT , 
            name VARCHAR(150) NOT NULL , 
            email VARCHAR(150) NOT NULL , 
            password VARCHAR(150) NOT NULL , 
            PRIMARY KEY (id_user))`

          connection.query(createTableUsers, (error) => {
            if (error) {
                res.status(400).json({msg: "The users table cannot be created", error})
            }
        })
        
        connection.query(sql, values,(error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                if(result.length > 0){
                    const token = result[0].id_user
                    res.status(200).json({user: {
                        "id_user": result[0].id_user,
                        "name": result[0].name,
                        "email": result[0].email,
                    }, token})
                } else {
                    res.status(404).json({msg: "User doesn't exists", token: null})
                }
            }
        })
        } catch (error) {
            res.status(400).json({msg: "There was an error", error})
    }
     
   }

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const values = [name, email, password];
        const sql = `INSERT INTO users(id_user, name, email, password) VALUES (null, '${name}', '${email}', '${password}')`
        const createTableUsers = `CREATE TABLE IF NOT EXISTS ibm_alkemy2022.users (
            id_user INT NOT NULL AUTO_INCREMENT , 
            name VARCHAR(150) NOT NULL , 
            email VARCHAR(150) NOT NULL , 
            password VARCHAR(150) NOT NULL , 
            PRIMARY KEY (id_user))`

        connection.query(createTableUsers, (error) => {
            if (error) {
                res.status(400).json({msg: "The users table cannot be created", error})
            }
        })
        
        connection.query(sql, values,(error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                if(result.length > 0){
                    res.status(400).json({msg: "User cannot be created", token: null})
                } else {
                    res.status(200).json({msg: "New user created", values})
                }
            }


        })
        } catch (error) {
            res.status(400).json({msg: "There was an error", error})
    }
     
}





const authController = { 
    login,
    register
}

export default authController;