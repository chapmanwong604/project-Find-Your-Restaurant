import { Knex } from "knex";
import xlsx from 'xlsx';


export type Restaurant = {
    name: string;
    categories: string;
    phone: number;
    address: string;
    openrice_link: string;
    door_photo: string;
    longitude: number;
    latitude: number;
}

export type Food = {
    name: string;
    chinese_name: string;
    categories: string;
    tags: string;
}

export async function seed(knex: Knex): Promise<void> {
    let res_workbook = xlsx.readFile('../data/res_workbook.xlsx');
    let food_workbook = xlsx.readFile('../data/food_workbook.xlsx');
    let restaurantsList = xlsx.utils.sheet_to_json<Restaurant>(res_workbook.Sheets.restaurants);
    let foodList = xlsx.utils.sheet_to_json<Food>(food_workbook.Sheets.food_list);

    // Deletes ALL existing entries
    await knex("restaurants").truncate();
    await knex("food").truncate();

    // Inserts seed entries

    for (let restaurants of restaurantsList) {
        let row = await knex
            .select('openrice_link')
            .from('restaurants')
            .where({ openrice_link: restaurants.openrice_link })
            .first();
        if (!row) {
            await knex
                .insert({
                    name: restaurants.name,
                    categories: restaurants.categories,
                    phone: restaurants.phone,
                    address: restaurants.address,
                    openrice_link: restaurants.openrice_link,
                    door_photo: restaurants.door_photo,
                    longitude: restaurants.longitude,
                    latitude: restaurants.latitude
                })
                .into('restaurants');
        }
    }

    for (let food of foodList) {
        await knex
        .insert({
            name: food.name,
            chinese_name: food.chinese_name,
            categories: food.categories,
            tags: food.tags
        })
        .into('food');
    }
};
