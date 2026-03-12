import { connection } from '../config/mysqlConector.js';
import dotenv from 'dotenv';

dotenv.config();

const login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email and password are required'
            });
        }

        const sql = `
            SELECT id_user, name, email
            FROM users
            WHERE email = ? AND password = ?
            LIMIT 1
        `;
        const values = [email, password];

        connection.query(sql, values, (error, result) => {
            if (error) {
                return res.status(400).json({
                    msg: 'Error logging in',
                    error
                });
            }

            if (!result || result.length === 0) {
                return res.status(404).json({
                    msg: "User doesn't exist",
                    token: null
                });
            }

            const user = result[0];
            const token = String(user.id_user);

            return res.status(200).json({
                user: {
                    id_user: user.id_user,
                    name: user.name,
                    email: user.email
                },
                token
            });
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const register = (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                msg: 'Name, email and password are required'
            });
        }

        const checkUserSql = `
            SELECT id_user
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        connection.query(checkUserSql, [email], (checkError, checkResult) => {
            if (checkError) {
                return res.status(400).json({
                    msg: 'Error checking existing user',
                    error: checkError
                });
            }

            if (checkResult && checkResult.length > 0) {
                return res.status(409).json({
                    msg: 'Email already registered'
                });
            }

            const insertSql = `
                INSERT INTO users (id_user, name, email, password)
                VALUES (null, ?, ?, ?)
            `;
            const values = [name, email, password];

            connection.query(insertSql, values, (insertError, insertResult) => {
                if (insertError) {
                    return res.status(400).json({
                        msg: 'User cannot be created',
                        error: insertError
                    });
                }

                return res.status(201).json({
                    msg: 'New user created',
                    userId: insertResult.insertId
                });
            });
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const authController = {
    login,
    register
};

export default authController;