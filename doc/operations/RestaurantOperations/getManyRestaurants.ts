import { ErrorResponse } from "../../definitions/errorDefinition";
import { Pagination } from "../../definitions/paginationDefinition";
import { Restaurant } from "../../definitions/RestaurantDefinition";

export const getManyRestaurants = {
  tags: ["Restaurants"],
  summary: "Returns restaurants",
  description: "Returns all restaurants with pagination",
  operationId: "getRestaurants",
  produces: ["application/json"],
  parameters: [
    {
      in: "query",
      name: "page",
      required: false,
      type: "integer",
      format: "int32",
    },
    {
      in: "query",
      name: "perPage",
      required: false,
      type: "integer",
      format: "int32",
    },
  ],
  responses: {
    "200": {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: Pagination(Restaurant),
        },
      },
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