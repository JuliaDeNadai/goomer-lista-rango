import { Category, CategoryCreate } from "../../definitions/CategoryDefinition";
import { ErrorResponse } from "../../definitions/errorDefinition";

export const createCategory = {
    tags: ["Categories"],
    summary: "Create new category for products",
    operationId: "addTicketCriticality",
    consumes: ["application/json"],
    produces: ["application/json", "application/xml"],
    requestBody: {
      content: {
        "application/json": {
          schema: CategoryCreate,
        },
      },
    },
    responses: {
      "200": {
        description: "successful operation",
        content: {
          "application/json": {
            schema: Category,
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