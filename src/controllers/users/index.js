import db from '../../config/database'

export async function getAllUsers(req, res) {
    db.query('SELECT * FROM users ORDER BY userId ASC', (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows)
    })
}

export async function getUserByID(req, res) {
    db.query(`SELECT * FROM users WHERE userId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createUser(req, res) {
    const { full_name, email, cpf, password } = req.body
    db.query("INSERT INTO users (full_name, email, cpf, password) VALUES ($1, $2, $3, $4)", [full_name, email, cpf, password], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteUser(req, res) {
    db.query("DELETE FROM users WHERE userID = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editUser(req, res) {
    const { full_name, email, cpf, password } = req.body
    db.query("UPDATE users SET full_name = $1, email = $2, cpf = $3, password = $4 WHERE userId = $5", [full_name, email, cpf, password, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

