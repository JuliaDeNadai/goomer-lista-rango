import { Entity } from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";
import { Restaurant } from "./Restaurant";
import { Sale } from "./Sale";

export const entities = [
  Restaurant,
  Product,
  Sale,
  Category,
]