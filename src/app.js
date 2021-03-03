import express from 'express'
import routes from './routes/index'
import cors from 'cors'

class App {
    constructor() {
        this.server = express();

        this.corsOptions = {
            origin: "http://localhost:3030"
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors(this.corsOptions))
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

}

export default new App().server;