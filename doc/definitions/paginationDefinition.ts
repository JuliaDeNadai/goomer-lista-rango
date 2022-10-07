const Pagination = (recordDefinition: object) => ({
    properties: {
      records: {
        type: "array",
        items: recordDefinition,
      },
      perPage: {
        type: "integer",
        format: "int32",
      },
      page: {
        type: "integer",
        format: "int32",
      },
      pageCount: {
        type: "integer",
        format: "int32",
      },
      recordCount: {
        type: "integer",
        format: "int32",
      },
      prev: {
        type: "string",
        format: "int32",
      },
      next: {
        type: "string",
        format: "int32",
      },
    },
  });
  
  export { Pagination };