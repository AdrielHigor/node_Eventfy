import db from '../../config/database'

export async function getAllEvents(req, res) {
    db.query('SELECT * FROM events ORDER BY eventId ASC', (error, results) => {
        if (error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

export async function getEventByID(req, res) {
    db.query(`SELECT * FROM events WHERE eventId = ${req.params.id}`, (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        return res.status(200).json(results.rows[0])
    })
}

export async function createEvent(req, res) {
    const { title, entrance_value, available, start_at, description } = req.body
    db.query("INSERT INTO events (title, entrance_value, available, start_at, description) VALUES ($1, $2, $3, $4, $5)", [title, entrance_value, available, start_at, description], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(201).json(results.rows)
    })
}

export async function deleteEvent(req, res) {
    db.query("DELETE FROM events WHERE eventId = $1", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(200).json(results.rows)
    })
}

export async function editEvent(req, res) {
    const { title, entrance_value, available, start_at, description } = req.body
    db.query("UPDATE events SET title = $1, entrance_value = $2, available = $3, start_at = $4, description = $5 WHERE eventId = $6", [title, entrance_value, available, start_at, description, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json(results.rows)
    })
}
