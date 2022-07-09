import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurants', (table) => {
        table.dropUnique(["longitude"]);
        table.dropUnique(["latitude"]);
        table.dropUnique(["address"])
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.from("restaurants").whereIn(
        "address",
        knex.from("restaurants").groupBy('address').havingRaw("COUNT(*) > 1").select("address")
    ).delete()

    await knex.from("restaurants").whereIn(
        "longitude",
        knex.from("restaurants").groupBy('longitude').havingRaw("COUNT(*) > 1").select("longitude")
    ).delete()

    await knex.from("restaurants").whereIn(
        "latitude",
        knex.from("restaurants").groupBy('latitude').havingRaw("COUNT(*) > 1").select("latitude")
    ).delete()

    await knex.schema.alterTable('restaurants', (table) => {
        table.unique(["longitude"]);
        table.unique(["latitude"]);
        table.unique(["address"])
    })
}
