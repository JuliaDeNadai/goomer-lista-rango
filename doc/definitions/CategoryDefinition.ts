

const Category = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        format: "int64",
      },
      nome: {
        type: "string",
      },
    },
  };
    
    const CategoryCreate = {
      type: "object",
      properties: {
        nome: {
            type: "string",
          },
      },
    };

    
    export { Category, CategoryCreate };