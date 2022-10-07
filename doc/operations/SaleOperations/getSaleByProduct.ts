import { ErrorResponse } from "../../definitions/errorDefinition";
import { Pagination } from "../../definitions/paginationDefinition";
import { Product } from "../../definitions/productDefinition";
import { Sale } from "../../definitions/SaleDefinition";

export const getSalesByProduct = {
  tags: ["Sales"],
  summary: "Returns sales",
  description: "Returns all sales with pagination",
  operationId: "getSales",
  produces: ["application/json"],
  parameters: [
    {
        name: "id",
        in: "path",
        description: "ID of sale to return",
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
          schema: Pagination(Sale),
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