import { NextFunction, Request, Response } from "express";
import { DriverError, InternalError } from "../utils/internalErrors";
//import { Logger } from "../../utils/Logger";

export const errorMiddleware = (
  error: Error & Partial<InternalError> & Partial<DriverError>, 
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  let title = ""
  let detail = ""
  console.log(error)
  
  let statusCode = error.statusCode ?? 500
  title = error.title ? error.title : 'Internal Server Error'
  detail = error.detail ? error.detail : 'Um error não esperado ocorreu. Caso persista, contate o administrador.'
  
  if(error.errno && error.code){ 

    if(error.errno === 1451){
      statusCode = 500
      title = error.code
      detail = 'Registro não pode ser excluído pois existem outros dados ligados a ele.'
    }
  }

	return response.status(statusCode).json({ title, detail })

}