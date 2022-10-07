import {Router} from "express"
import { validate } from "express-validation"
import { CategoryController } from "../controllers/CategoryController"

const categoryController = new CategoryController()
const routerCategory = Router()

routerCategory.route("/")
    .post(categoryController.create)

routerCategory.route("/:id")
    .get(categoryController.get_category)

export {routerCategory}