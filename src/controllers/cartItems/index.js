import db from '../../config/database'

export async function getAllCartItems(req, res) {
    db.query('SELECT * FROM cartitems ORDER BY itemId ASC', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

export async function getCartItemByID(req, res) {
    db.query(`SELECT * FROM cartitems WHERE itemId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createCartItem(req, res) {
    const { cartId, eventId } = req.body
    db.query("INSERT INTO cartitems (cartId, eventId) VALUES ($1, $2)", [cartId, eventId], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteCartItem(req, res) {
    db.query("DELETE FROM cartitems WHERE itemId = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editCartItem(req, res) {
    const { cartId, eventId } = req.body
    db.query("UPDATE cartitems SET cartId = $1, eventId = $2 WHERE itemId = $3", [cartId, eventId, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}
