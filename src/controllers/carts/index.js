import db from '../../config/database'

export async function getAllCarts(req, res) {
    db.query('SELECT * FROM carts ORDER BY cartId ASC', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

export async function getCartByID(req, res) {
    db.query(`SELECT * FROM carts WHERE cartId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createCart(req, res) {
    const { userId } = req.body
    db.query("INSERT INTO carts (userId) VALUES ($1)", [userId], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteCart(req, res) {
    db.query("DELETE FROM carts WHERE cartId = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editCart(req, res) {
    const { userId } = req.body
    db.query("UPDATE carts SET userId = $1 WHERE cartId = $2", [userId, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}
