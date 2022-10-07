import {Router} from "express"
import { validate } from "express-validation"
import { RestaurantController } from "../controllers/RestaurantController"

const restaurantController = new RestaurantController()
const routerRestaurant = Router()


routerRestaurant.route("/")
    .post(restaurantController.create)
    .get(restaurantController.get_restaurants)


routerRestaurant.route("/:id")
    .get(restaurantController.get_restaurant)
    .put(restaurantController.update)
    .delete(restaurantController.delete)

export {routerRestaurant}