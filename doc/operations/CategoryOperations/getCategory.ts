import { Category } from "../../definitions/CategoryDefinition";
import { ErrorResponse } from "../../definitions/errorDefinition";

export const getOneCategory = {
  tags: ["Categories"],
  summary: "Find category by ID",
  description: "Returns a single category",
  operationId: "getCategoryById",
  produces: ["application/json"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of category to return",
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
          schema: Category,
        },
      },
    },
    "404": {
      description: "Not found",
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