import { NextFunction, Request, Response } from 'express'

import { Router } from "express"
import { validate } from "express-validation"
import { CategoryController } from "../controllers/CategoryController"
import { BadRequestError } from '../utils/internalErrors'
import { CategoryMiddleware } from '../middlewares/CategoryMiddleware'

enum MESSAGE {
    BAD_REQUEST = 'Dados incompletos'
}

const categoryController = new CategoryController()
const categoryMiddleware = new CategoryMiddleware()
const routerCategory = Router()

routerCategory.route("/")
    .post(categoryController.create)

routerCategory.route("/:id")
    .get(categoryController.get_category)

export {routerCategory}