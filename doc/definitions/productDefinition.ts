import { Category } from "./CategoryDefinition";
import { Restaurant } from "./RestaurantDefinition";

const Product = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        format: "int64",
      },
      nome: {
        type: "string",
      },
      categoria: Category,
      preco: {
        type: "decimal",
        format: "int64",
      },
      restaurante: Restaurant
    },
  };
  
  const ProductCreate = {
    type: "object",
    properties: {
      nome: {
        type: "string",
      },
      categoria: {
        type: "integer",
        format: "int64",
      },
      preco: {
        type: "decimal",
        format: "int64",
      },
      restaurante: {
        type: "integer",
        format: "int64",
      },
    },
  };
  
  const ProductUpdate = {
    type: "object",
    properties: {
      nome: {
        type: "string",
      },
      categoria: {
        type: "integer",
        format: "int64",
      },
      preco: {
        type: "decimal",
        format: "int64",
      },
      restaurante: {
        type: "integer",
        format: "int64",
      },
    },
  };
  
  export { Product, ProductCreate, ProductUpdate };