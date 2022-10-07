import { ErrorResponse } from "../../definitions/errorDefinition";
import { Restaurant } from "../../definitions/RestaurantDefinition";

export const getOneRestaurant = {
  tags: ["Restaurants"],
  summary: "Find restaurant by ID",
  description: "Returns a single restaurant",
  operationId: "getRestaurantById",
  produces: ["application/json"],
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
  },
  security: [
    {
      api_key: [],
    },
  ],
}