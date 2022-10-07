import {Router} from "express"
import { validate } from "express-validation"
import { SaleController } from "../controllers/SaleController"

const saleController = new SaleController()
const routerSale = Router()

routerSale.route("/")
    .post(saleController.create)

routerSale.route("/:id")
    .get(saleController.get_sale)

// Rota onde é possível recuperar todas as promoções de um dado produto
routerSale.route("/:id/products")
    .get(saleController.get_sales_by_product)

export {routerSale}