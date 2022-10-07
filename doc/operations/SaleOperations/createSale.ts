import { ErrorResponse } from "../../definitions/errorDefinition";
import { Sale, SaleCreate } from "../../definitions/SaleDefinition";

export const createSale = {
    tags: ["Sales"],
    summary: "Create new sale",
    operationId: "addSale",
    consumes: ["application/json"],
    produces: ["application/json", "application/xml"],
    requestBody: {
      content: {
        "application/json": {
          schema: SaleCreate,
        },
      },
    },
    responses: {
      "200": {
        description: "successful operation",
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
        description: "NotFound",
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
    },
}