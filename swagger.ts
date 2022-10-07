import { paths } from "./doc/paths";

export default {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Goomer Rango Lista API",
    description: "RESTFul API to manage restaurants, products and sales",
    contact: {
      name: "Julia De Nadai"
    },
    servers: ["http://localhost:3308"]
  },
  basePath: "http://localhost:3308",
  tags: [
    {
      name: "Restaurants",
      description: ""
    },
    {
      name: "Products",
      description: "",
    },
    {
      name: "Sales",
      description: "",
    },
    {
      name: "Categories",
      description: "",
    },
    
  ],
  paths,
};