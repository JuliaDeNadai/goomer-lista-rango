import 'express-async-errors';

require("dotenv-safe").config({
  path: /* process.env.NODE_ENV?.trim() == "test" ? ".env.test" : */ ".env",
  allowEmptyValues: true
});

//import './database/mysql';

import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";



import router from './routes/index';
import "reflect-metadata";

import { errorMiddleware } from './middlewares/errorMiddleware';
import { swaggerOptions } from '../swagger';

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const cors = require('cors');
const app = express();
var http = require('http').Server(app)

app.use("/goomer-lista-rango-api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: ['http://192.168.10.33', 'http://127.0.0.1:3333', 'http://localhost:3000']
}));

// set in production
app.set('trust proxy', 1)


app.set("http", http);

app.use('/api', router);

app.use(errorMiddleware)

export {app};