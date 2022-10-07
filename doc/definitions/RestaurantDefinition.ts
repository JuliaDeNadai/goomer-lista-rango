

const Restaurant = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    nome: {
      type: "string",
    },
    endereco: {
      type: "string",
    },
    abertura: {
      type: "number",
      format: "currency"
    },
    encerramento: {
      type: "number",
      format: "currency"
    },
  },
};
  
  const RestaurantCreate = {
    type: "object",
    properties: {
      nome: {
        type: "string",
      },
      endereco: {
        type: "string",
      },
      abertura: {
        type: "number",
        format: "currency"
      },
      encerramento: {
        type: "number",
        format: "currency"
      },
    },
  };
  
  const RestaurantUpdate = {
    type: "object",
    properties: {
      nome: {
        type: "string",
      },
      endereco: {
        type: "string",
      },
      abertura: {
        type: "number",
        format: "currency"
      },
      encerramento: {
        type: "number",
        format: "currency"
      },
    },
  };
  
  export { Restaurant, RestaurantCreate, RestaurantUpdate };