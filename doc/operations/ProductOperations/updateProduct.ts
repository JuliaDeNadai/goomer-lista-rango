import { ErrorResponse } from "../../definitions/errorDefinition";
import { Product, ProductUpdate } from "../../definitions/productDefinition";

export const updateProduct = {
  tags: ["Products"],
  summary: "Update product by ID",
  operationId: "updateProduct",
  consumes: ["application/json", "application/xml"],
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
  requestBody: {
    content: {
      "application/json": {
        schema: ProductUpdate,
      },
    },
  },
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
};