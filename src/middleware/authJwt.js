import jwt from 'jsonwebtoken'
import config from '../config/auth.config'
import db from '../config/database'

export function verifyToken(req, res, next) {
    let token = req.headers["authorization"];

    console.log(token)

    if (!token) {
        return res.status(403).json({
            data: "Não Autorizado"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                data: "Não Autorizado"
            })
        }
        req.userId = decoded.id;
        next();
    })
}

export function isAdmin(req, res, next) {
    console.log(req)
    db.query(`SELECT * FROM user_roles WHERE userId = ${req.userId}`, async (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }

        for (let i = 0; i < results.rows.length; i++) {
            await db.query(`SELECT * FROM roles WHERE roleId = ${results.rows[i].roleid}`, (error, results) => {
                if (error) {
                    return res.status(500).json(error)
                }

                if (results.rows[0].role_name === "administrator") {
                    next();
                    return;
                }

            })
        }
        // return res.status(401).json({
        //     data: "Não Autorizado!"
        // })
    })
}