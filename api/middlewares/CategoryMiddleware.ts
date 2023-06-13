import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../utils/internalErrors'

enum MESSAGE {
    BAD_REQUEST = 'Dados incompletos'
}

class CategoryMiddleware{

    create(request: Request, response: Response, next: NextFunction){
        let category = request.body
    
        if(Object.keys(category).length === 0 ) throw new BadRequestError(MESSAGE.BAD_REQUEST)
    
        next(category)
    }
}


export { CategoryMiddleware }