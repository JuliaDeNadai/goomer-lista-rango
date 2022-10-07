import { ErrorResponse } from "../../definitions/errorDefinition";
import { Restaurant, RestaurantUpdate } from "../../definitions/RestaurantDefinition";

export const updateRestaurant = {
  tags: ["Restaurants"],
  summary: "Update restaurant by ID",
  operationId: "updateRestaurant",
  consumes: ["application/json", "application/xml"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of restaurant to return",
      required: true,
      type: "integer",
      format: "int64",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: RestaurantUpdate,
      },
    },
  },
  responses: {
    "200": {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: Restaurant,
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