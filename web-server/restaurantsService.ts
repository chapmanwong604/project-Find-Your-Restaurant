import { Knex } from "knex";
import { Restaurant } from "./seeds/import-from-xlsx";
export class RestaurantsService {
    constructor(private knex: Knex){}

    async getRestaurants(foodName:string) {
        let food = await this.knex("food").select("chinese_name","tags").where("name",foodName).first()
        if(!food) {
            throw new Error("Food not found")
        }
        let {tags,chinese_name} = food
        
        
        let restaurantsInfo: Restaurant[] = await this.knex
        .from('restaurants')
        .select('name',
                'openrice_link', 
                'door_photo', 
                'categories', 
                'longitude', 
                'latitude', 
                'address', 
                'phone' )
        .where('categories','like',`%${tags}%`)
        // .orWhere('categories','like',`%${categories}%`)  /* 'categories' is not a good identifier */
        return {restaurantsInfo,tags,chinese_name}

    }
}
