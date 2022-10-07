import { createSale } from "../operations/SaleOperations/createSale";
import { getOneSale } from "../operations/SaleOperations/getOneSale";
import { getSalesByProduct } from "../operations/SaleOperations/getSaleByProduct";

export const salesPaths = {
    "/api/sales": {
      post: createSale
    },
    "/api/sales/{id}": {
      get: getOneSale
    },
    "/api/sales/{id}/products": {
        get: getSalesByProduct,
      },
  };