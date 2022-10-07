import { ErrorResponse } from "../../definitions/errorDefinition";
import { Product, ProductCreate } from "../../definitions/productDefinition";
import { Restaurant, RestaurantCreate } from "../../definitions/RestaurantDefinition";

export const createProduct = {
    tags: ["Products"],
    summary: "Create new product",
    operationId: "addProduct",
    consumes: ["application/json"],
    produces: ["application/json", "application/xml"],
    requestBody: {
      content: {
        "application/json": {
          schema: ProductCreate,
        },
      },
    },
    responses: {
      "200": {
        description: "successful operation",
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