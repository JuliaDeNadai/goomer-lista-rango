import { createCategory } from "../operations/CategoryOperations/createCategory";
import { getOneCategory } from "../operations/CategoryOperations/getCategory";

export const categoriesPaths = {
    "/api/categories": {
      post: createCategory
    },
    "/api/categories/{id}": {
      get: getOneCategory
    },
  };