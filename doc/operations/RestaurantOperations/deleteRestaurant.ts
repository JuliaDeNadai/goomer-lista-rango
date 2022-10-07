import { ErrorResponse } from "../../definitions/errorDefinition";

export const deleteRestaurant = {
  tags: ["Restaurants"],
  summary: "Delete restaurant by ID",
  description: "Delete a single restaurant",
  operationId: "deleteRestaurant",
  consumes: ["application/json", "application/xml"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of restaurant to delete",
      required: true,
      type: "integer",
      format: "int64",
    },
  ],
  responses: {
    "200": {
      description: "Successful operation",
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
}