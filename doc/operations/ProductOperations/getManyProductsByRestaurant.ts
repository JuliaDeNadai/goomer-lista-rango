import { ErrorResponse } from "../../definitions/errorDefinition";
import { Pagination } from "../../definitions/paginationDefinition";
import { Product } from "../../definitions/productDefinition";

export const getManyProductsByRestaurant = {
  tags: ["Products"],
  summary: "Returns products",
  description: "Returns all products with pagination",
  operationId: "getProducts",
  produces: ["application/json"],
  parameters: [
    {
        name: "id",
        in: "path",
        description: "ID of product to return",
        required: true,
        type: "integer",
        format: "int64",
    },
    {
      in: "query",
      name: "page",
      required: false,
      type: "integer",
      format: "int32",
    },
    {
      in: "query",
      name: "perPage",
      required: false,
      type: "integer",
      format: "int32",
    },
  ],
  responses: {
    "200": {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: Pagination(Product),
        },
      },
    },
    "500": {
      description: "Unexpected server response",
      content: {
        "application/json": {
          schema: ErrorResponse
        }
      }
    },
  }
}