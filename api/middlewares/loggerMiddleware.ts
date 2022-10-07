import winston from 'winston';
/* 
    Middleware responsável por formatar mensagens de erro
*/
const loggerMiddleware = winston.format.printf(( { title, statusCode, detail, level, stack, timestamp, code, errno, sqlMessage, sql, driverError } ) => {
  let stringError = ` `

  if(code && errno) 
    /* stringError.concat(`${timestamp}: [${level}] - code: ${errno} - title: ${code}\n${stack}\n`) */
    stringError += `${timestamp}: [${level}] - code: ${errno} - title: ${code}\n${stack}\n`
  else 
    /* stringError.concat(`${timestamp}: [${level}] - code: ${statusCode} - title: ${title}: ${detail} \n${stack}\n`) */
    stringError += `${timestamp}: [${level}] - code: ${statusCode} - title: ${title}: ${detail} \n${stack}\n`

  if(sql) 
    /* stringError.concat(`\nSQL MESSAGE: ${sqlMessage}\nSQL: ${sql}`) */
    stringError += `\nSQL MESSAGE: ${sqlMessage}\nSQL: ${sql}`

  return stringError
});




export {loggerMiddleware}