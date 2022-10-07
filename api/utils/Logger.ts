import winston from 'winston';
import path from 'path';
import {loggerMiddleware} from '../middlewares/loggerMiddleware';

export class Logger{
  public logger: winston.Logger

  constructor(){
    this.logger = winston.createLogger({
      format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.colorize(), loggerMiddleware ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ 
        filename: path.resolve(__dirname, '..', 'logs', `failed_${new Date().getDate()}_${new Date().getMonth()+1}_${new Date().getFullYear()}.log`), 
        level: 'error' }),
      ],
    });
  }
}