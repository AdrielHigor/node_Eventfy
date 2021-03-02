import db from '../../config/database'

export async function getAllOrders(req, res) {
    db.query('SELECT * FROM orders ORDER BY orderId ASC', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

export async function getOrderByID(req, res) {
    db.query(`SELECT * FROM orders WHERE orderId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createOrder(req, res) {
    const { order_status, userId } = req.body
    db.query("INSERT INTO orders (order_status, userId) VALUES ($1, $2)", [order_status, userId], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteOrder(req, res) {
    db.query("DELETE FROM orders WHERE orderId = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editOrder(req, res) {
    const { order_status, userId } = req.body
    db.query("UPDATE orders SET order_status = $1, userId = $2 WHERE orderId = $3", [order_status, userId, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}
