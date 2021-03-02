import db from '../../config/database'

export async function getAllAddresses(req, res) {
    db.query('SELECT * FROM addresses ORDER BY addressId ASC', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

export async function getAddressByID(req, res) {
    db.query(`SELECT * FROM addresses WHERE addressId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createAddress(req, res) {
    const { address, neighborhood, address_number, userID } = req.body
    db.query("INSERT INTO addresses (address, neighborhood, address_number, userID) VALUES ($1, $2, $3, $4)", [address, neighborhood, address_number, userID], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteAddress(req, res) {
    db.query("DELETE FROM addresses WHERE addressId = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editAddress(req, res) {
    const { address, neighborhood, address_number, userID } = req.body
    db.query("UPDATE addresses SET address = $1, neighborhood = $2, address_number = $3, userID = $4 WHERE addressId = $5", [address, neighborhood, address_number, userID, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}
