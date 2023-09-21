import mysql from 'mysql'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cars'
})

export const executeQuery = async (query, data = []) => {
    if (connection.state === 'disconnected') {
        connection.connect()
    }
    return new Promise((resolve, reject) => {
        connection.query(query, data, (err, rows, fields) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}
