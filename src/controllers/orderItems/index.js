import db from '../../config/database'

export async function getAllOrderItems(req, res) {
    db.query('SELECT * FROM orderitems ORDER BY itemId ASC', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

export async function getOrderItemByID(req, res) {
    db.query(`SELECT * FROM orderitems WHERE itemId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createOrderItem(req, res) {
    const { orderId, eventId } = req.body
    db.query("INSERT INTO orderitems (orderId, eventId) VALUES ($1, $2)", [orderId, eventId], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteOrderItem(req, res) {
    db.query("DELETE FROM orderitems WHERE itemId = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editOrderItem(req, res) {
    const { orderId, eventId } = req.body
    db.query("UPDATE orderitems SET orderId = $1, eventId = $2 WHERE itemId = $3", [orderId, eventId, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}
