import { ErrorResponse } from "../../definitions/errorDefinition";
import { Product } from "../../definitions/productDefinition";
import { Sale } from "../../definitions/SaleDefinition";

export const getOneSale = {
  tags: ["Sales"],
  summary: "Find sale by ID",
  description: "Returns a single sale",
  operationId: "getSaleById",
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
  ],
  responses: {
    "200": {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: Sale,
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