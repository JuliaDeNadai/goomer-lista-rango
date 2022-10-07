import {Router} from "express"
import { validate } from "express-validation"
import { ProductController } from "../controllers/ProductController"

const productController = new ProductController()
const routerProduct = Router()

routerProduct.route("/")
  .post(productController.create)
  .get(productController.get_products)

routerProduct.route("/:id")
  .get(productController.get_product)
  .put(productController.update)
  .delete(productController.delete)

routerProduct.route("/:id/restaurant")
  .get(productController.get_by_restaurant)

export {routerProduct}