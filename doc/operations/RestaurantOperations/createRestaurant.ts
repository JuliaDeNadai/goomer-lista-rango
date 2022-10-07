import { ErrorResponse } from "../../definitions/errorDefinition";
import { Restaurant, RestaurantCreate } from "../../definitions/RestaurantDefinition";

export const createRestaurant = {
    tags: ["Restaurants"],
    summary: "Create new restaurant",
    operationId: "addRestaurant",
    consumes: ["application/json"],
    produces: ["application/json", "application/xml"],
    requestBody: {
      content: {
        "application/json": {
          schema: RestaurantCreate,
        },
      },
    },
    responses: {
      "200": {
        description: "successful operation",
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