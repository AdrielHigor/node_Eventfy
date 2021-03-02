import { Router } from 'express'
import { getAllUsers } from '../controllers/users/index'

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ ok: true })
})

routes.get('/users/', getAllUsers)

export default routes