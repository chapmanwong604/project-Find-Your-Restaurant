import express from 'express';
import { FoodController } from './foodController';
import { FoodService } from './foodService';
import { HomePageController } from './homePageController';
import { RestaurantsController } from './restaurantsController';
import { RestaurantsService } from './restaurantsService';
import {knex} from './db'
import { sessionRoutes } from './session';

export const routes = express.Router();

// Prepare the Services and Controllers

let foodService = new FoodService(knex);
let restaurantsService = new RestaurantsService(knex);

let homePageController = new HomePageController();     // Controller to redirect to the homepage
let foodController = new FoodController(foodService);
let restaurantsController = new RestaurantsController(restaurantsService);

routes.use(sessionRoutes)

// homepage routes
routes.get('/', homePageController.get)

// image routes
// routes.post('/upload', imageController.upload);
// routes.get('/preview', imageController.preview);         /* IF PREVIEW IS NEEDED */

// food routes
routes.post('/food', foodController.post);

// restaurants routes
routes.get('/restaurants', restaurantsController.get);

