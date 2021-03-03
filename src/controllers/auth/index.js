import db from '../../config/database'
import config from '../../config/auth.config'
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    const { full_name, email, cpf, password } = req.body
    db.query("INSERT INTO users (full_name, email, cpf, password) VALUES ($1, $2, $3, $4)", [full_name, email, cpf, password], (error, results) => {
        if (error) {
            return res.status(400).json(error)
        }
        db.query("SELECT * FROM users WHERE cpf = $1", [cpf], (error, results) => {
            if (error) {
                return res.status(500).json(error)
            }
            db.query("INSERT INTO user_roles (userid, roleid) VALUES ($1, $2)", [results.rows[0].userid, 2], (error, results) => {
                if (error) {
                    return res.status(500).json(error)
                }
                return res.status(201).json({
                    data: "Registrado com sucesso!"
                })
            })
        })
    })
}

export async function signin(req, res) {
    const { username, password } = req.body
    db.query("SELECT * FROM users WHERE email = $1", [username], (error, results) => {
        if (error) {
            return res.status(500).json(error)
        }
        if (password !== results.rows[0].password) {
            return res.status(401).json({
                data: "Senha inválida!"
            })
        }

        let token = jwt.sign({ id: results.rows[0].userid }, config.secret, {
            expiresIn: 86400
        });

        results.rows[0]['token'] = token

        return res.status(200).json(results.rows[0])
    })
}