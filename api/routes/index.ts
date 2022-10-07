import express from "express";
import { routerCategory } from "./categories";
import { routerProduct } from "./products";
import { routerRestaurant } from "./restaurant";
import { routerSale } from "./sales";

const router = express();

router.use("/restaurants", routerRestaurant)
router.use("/categories", routerCategory)
router.use("/sales", routerSale)
router.use("/products", routerProduct)

export default router;