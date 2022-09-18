import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_URI
})

const connectDB = async () => {
    try{
        await connection.connect()
        console.log('Database server running')
    } catch (error) {
        console.log('Something went wrong with the DB connection');
        console.log(error);
        process.exit(1)
    }
}


export {connectDB, connection}
