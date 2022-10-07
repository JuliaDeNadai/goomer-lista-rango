import {Router} from "express"
import { validate } from "express-validation"
import { RestaurantController } from "../controllers/RestaurantController"

const restaurantController = new RestaurantController()
const routerRestaurant = Router()


routerRestaurant.route("/")
    .post(restaurantController.create)
    .get(restaurantController.get_restaurants)


routerRestaurant.route("/:id")
    /**
   * @swagger
   * /restaurants:
   *  get:
   *    description: Use to request all restaurants
   *    responses:
   *      '200':
   *        description: A successful response
   */
    .get(restaurantController.get_restaurant)

    /**
     * @swagger
     * /restaurants:
     *    put:
     *      description: Use to return update all columns of a retaurant
     *    parameters:
     *      - nome: string
     *        in: query
     *        description: Name of restaurant
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *      - endereco: string
     *        in: query
     *        description:  of restaurant
     *        required: true
     *        schema:
     *          type: string
     *          format: string
     *    responses:
     *      '201':
     *        description: Successfully created user
     */
    .put(restaurantController.update)
    .delete(restaurantController.delete)

export {routerRestaurant}