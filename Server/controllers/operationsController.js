import { connection } from '../config/mysqlConector.js';
import dotenv from 'dotenv';

dotenv.config();

const getUserIdFromRequest = (req) => {
    if (req.userId && !isNaN(Number(req.userId))) {
        return Number(req.userId);
    }

    const authHeader = req.headers.authorization;
    const xAccessToken = req.headers['x-access-token'];
    const tokenHeader = req.headers.token;

    let rawToken = authHeader || xAccessToken || tokenHeader;

    if (!rawToken) {
        return null;
    }

    if (typeof rawToken === 'string' && rawToken.toLowerCase().startsWith('bearer ')) {
        rawToken = rawToken.slice(7).trim();
    }

    const parsedUserId = Number(rawToken);

    if (isNaN(parsedUserId)) {
        return null;
    }

    return parsedUserId;
};

const allOperations = (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);

        if (!userId) {
            return res.status(401).json({
                msg: 'Unauthorized: userId not found in request'
            });
        }

        const sql = `
            SELECT
                o.id_operation,
                o.concept,
                o.amount,
                o.date,
                o.type,
                o.category,
                o.id_userLogin,
                u.id_user,
                u.name,
                u.email
            FROM operations o
            INNER JOIN users u ON o.id_userLogin = u.id_user
            WHERE o.id_userLogin = ?
            ORDER BY o.id_operation DESC
        `;

        connection.query(sql, [userId], (error, result) => {
            if (error) {
                console.error('allOperations error:', error);
                return res.status(400).json({
                    msg: 'Error getting operations',
                    error
                });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('allOperations catch error:', error);
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const lasTenOperations = (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);

        if (!userId) {
            return res.status(401).json({
                msg: 'Unauthorized: userId not found in request'
            });
        }

        const sql = `
            SELECT
                o.id_operation,
                o.concept,
                o.amount,
                o.date,
                o.type,
                o.category,
                o.id_userLogin,
                u.id_user,
                u.name,
                u.email
            FROM operations o
            INNER JOIN users u ON o.id_userLogin = u.id_user
            WHERE o.id_userLogin = ?
            ORDER BY o.id_operation DESC
            LIMIT 10
        `;

        connection.query(sql, [userId], (error, result) => {
            if (error) {
                console.error('lasTenOperations error:', error);
                return res.status(400).json({
                    msg: 'Error getting last operations',
                    error
                });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        console.error('lasTenOperations catch error:', error);
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const getOneOperation = (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                msg: 'Unauthorized: userId not found in request'
            });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                msg: 'Invalid operation id'
            });
        }

        const sql = `
            SELECT *
            FROM operations
            WHERE id_operation = ? AND id_userLogin = ?
            LIMIT 1
        `;

        connection.query(sql, [Number(id), userId], (error, result) => {
            if (error) {
                console.error('getOneOperation error:', error);
                return res.status(400).json({
                    msg: 'Error getting operation',
                    error
                });
            }

            if (!result || result.length === 0) {
                return res.status(404).json({
                    msg: 'Operation not found'
                });
            }

            return res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error('getOneOperation catch error:', error);
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const newOperation = (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const { concept, amount, date, type, category } = req.body;

        if (!userId) {
            return res.status(401).json({
                msg: 'Unauthorized: userId not found in request'
            });
        }

        if (!concept || amount === undefined || amount === null || !date || !type || !category) {
            return res.status(400).json({
                msg: 'Missing required fields'
            });
        }

        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedAmount)) {
            return res.status(400).json({
                msg: 'Amount must be a valid number'
            });
        }

        const sql = `
            INSERT INTO operations
            (id_operation, concept, amount, date, type, category, id_userLogin)
            VALUES (null, ?, ?, ?, ?, ?, ?)
        `;

        const values = [concept, parsedAmount, date, type, category, userId];

        connection.query(sql, values, (error, result) => {
            if (error) {
                console.error('newOperation error:', error);
                return res.status(400).json({
                    msg: 'Error creating operation',
                    error
                });
            }

            return res.status(201).json({
                msg: 'New register created',
                operationId: result.insertId
            });
        });
    } catch (error) {
        console.error('newOperation catch error:', error);
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const deleteOperation = (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                msg: 'Unauthorized: userId not found in request'
            });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                msg: 'Invalid operation id'
            });
        }

        const sql = `
            DELETE FROM operations
            WHERE id_operation = ? AND id_userLogin = ?
        `;

        connection.query(sql, [Number(id), userId], (error, result) => {
            if (error) {
                console.error('deleteOperation error:', error);
                return res.status(400).json({
                    msg: 'Error deleting operation',
                    error
                });
            }

            if (!result || result.affectedRows === 0) {
                return res.status(404).json({
                    msg: 'Operation not found'
                });
            }

            return res.status(200).json({
                msg: 'Item removed successfully'
            });
        });
    } catch (error) {
        console.error('deleteOperation catch error:', error);
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const updateOperation = (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const { id } = req.params;
        const { concept, amount, date, type, category } = req.body;

        if (!userId) {
            return res.status(401).json({
                msg: 'Unauthorized: userId not found in request'
            });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                msg: 'Invalid operation id'
            });
        }

        const fields = [];
        const values = [];

        if (concept !== undefined) {
            fields.push('concept = ?');
            values.push(concept);
        }

        if (amount !== undefined) {
            const parsedAmount = parseFloat(amount);

            if (isNaN(parsedAmount)) {
                return res.status(400).json({
                    msg: 'Amount must be a valid number'
                });
            }

            fields.push('amount = ?');
            values.push(parsedAmount);
        }

        if (date !== undefined) {
            fields.push('date = ?');
            values.push(date);
        }

        if (type !== undefined) {
            fields.push('type = ?');
            values.push(type);
        }

        if (category !== undefined) {
            fields.push('category = ?');
            values.push(category);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                msg: 'No valid fields provided to update'
            });
        }

        const sql = `
            UPDATE operations
            SET ${fields.join(', ')}
            WHERE id_operation = ? AND id_userLogin = ?
        `;

        values.push(Number(id), userId);

        connection.query(sql, values, (error, result) => {
            if (error) {
                console.error('updateOperation error:', error);
                return res.status(400).json({
                    msg: 'Error updating operation',
                    error
                });
            }

            if (!result || result.affectedRows === 0) {
                return res.status(404).json({
                    msg: 'Operation not found'
                });
            }

            return res.status(200).json({
                msg: 'Operation updated successfully'
            });
        });
    } catch (error) {
        console.error('updateOperation catch error:', error);
        return res.status(500).json({
            msg: 'There was an error',
            error
        });
    }
};

const operationsController = {
    allOperations,
    lasTenOperations,
    newOperation,
    deleteOperation,
    updateOperation,
    getOneOperation
};

export default operationsController;