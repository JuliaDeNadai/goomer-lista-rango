import { ErrorResponse } from "../../definitions/errorDefinition";

export const deleteProduct = {
  tags: ["Products"],
  summary: "Delete product by ID",
  description: "Delete a single product",
  operationId: "deleteProduct",
  consumes: ["application/json", "application/xml"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of product to delete",
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