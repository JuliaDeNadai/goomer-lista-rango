import { ErrorResponse } from "../../definitions/errorDefinition";
import { Product } from "../../definitions/productDefinition";

export const getOneProduct = {
  tags: ["Products"],
  summary: "Find product by ID",
  description: "Returns a single product",
  operationId: "getProductById",
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
  ],
  responses: {
    "200": {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: Product,
        },
      },
    },
    "400": {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: ErrorResponse
          }
        }
      },
    "404": {
      description: "Not found",
      content: {
        "application/json": {
          schema: ErrorResponse
        }
      }
    },
    "409": {
        description: "Conflict",
        content: {
          "application/json": {
            schema: ErrorResponse
          }
        }
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