import { categoriesPaths } from "./categoriesPaths";
import { productsPaths } from "./productsPaths";
import { restaurantsPaths } from "./restaurantsPaths";
import { salesPaths } from "./salesPaths";

export const paths = {
    ...restaurantsPaths,
    ...productsPaths,
    ...salesPaths,
    ...categoriesPaths,
  };