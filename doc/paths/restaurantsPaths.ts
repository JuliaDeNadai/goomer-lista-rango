import { createRestaurant } from "../operations/RestaurantOperations/createRestaurant";
import { deleteRestaurant } from "../operations/RestaurantOperations/deleteRestaurant";
import { getManyRestaurants } from "../operations/RestaurantOperations/getManyRestaurants";
import { getOneRestaurant } from "../operations/RestaurantOperations/getOneRestaurant";
import { updateRestaurant } from "../operations/RestaurantOperations/updateRestaurant";

export const restaurantsPaths = {
    "/api/restaurants": {
      post: createRestaurant,
      get: getManyRestaurants
    },
    "/api/restaurants/{id}": {
      get: getOneRestaurant,
      update: updateRestaurant,
      delete: deleteRestaurant
    },
  };