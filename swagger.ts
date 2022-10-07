export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Goomer Rango Lista API",
      description: "RESTFul API developed for a test",
      contact: {
        name: "Julia De Nadai"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["api/app.ts"]
};