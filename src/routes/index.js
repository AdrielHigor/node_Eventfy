import { Router } from 'express'
import { createUser, deleteUser, editUser, getAllUsers, getUserByID } from '../controllers/users'
import { getAllEvents, getEventByID, createEvent, deleteEvent, editEvent } from '../controllers/events'
import { createAddress, deleteAddress, editAddress, getAddressByID, getAllAddresses } from '../controllers/addresses';
import { getAllOrders, createOrder, getOrderByID, deleteOrder, editOrder } from '../controllers/orders'

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ ok: true })
})

// ######## USERS ROUTES ############
routes.get('/users', getAllUsers)
routes.post('/users', createUser)
routes.get('/users/:id', getUserByID)
routes.delete('/users/:id', deleteUser)
routes.put('/users/:id', editUser)

// ######## EVENTS ROUTES ############
routes.get('/events', getAllEvents)
routes.post('/events', createEvent)
routes.get('/events/:id', getEventByID)
routes.delete('/events/:id', deleteEvent)
routes.put('/events/:id', editEvent)

// ######## ADDRESSES ROUTES ############
routes.get('/addresses', getAllAddresses)
routes.post('/addresses', createAddress)
routes.get('/addresses/:id', getAddressByID)
routes.delete('/addresses/:id', deleteAddress)
routes.put('/addresses/:id', editAddress)

// ######## ORDERS ROUTES ############
routes.get('/orders', getAllOrders)
routes.post('/orders', createOrder)
routes.get('/orders/:id', getOrderByID)
routes.delete('/orders/:id', deleteOrder)
routes.put('/orders/:id', editOrder)

export default routes