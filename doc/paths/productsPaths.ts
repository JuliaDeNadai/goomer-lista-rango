import { createProduct } from "../operations/ProductOperations/createProduct";
import { deleteProduct } from "../operations/ProductOperations/deleteProduct";
import { getManyProducts } from "../operations/ProductOperations/getManyProducts";
import { getManyProductsByRestaurant } from "../operations/ProductOperations/getManyProductsByRestaurant";
import { getOneProduct } from "../operations/ProductOperations/getOneProduct";
import { updateProduct } from "../operations/ProductOperations/updateProduct";


export const productsPaths = {
    "/api/products": {
      post: createProduct,
      get: getManyProducts
    },
    "/api/products/{id}": {
      get: getOneProduct,
      update: updateProduct,
      delete: deleteProduct
    },
    "/api/products/{id}/restaurants": {
        get: getManyProductsByRestaurant,
      },
  };