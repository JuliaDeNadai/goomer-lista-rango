import {app} from "./api/app"

var http = app.get('http');

const port = process.env.PORT || 3333;


http.listen(port, () => {
  console.log(`Servidor iniciado, porta ${port}... ☑`);
});