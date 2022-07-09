import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurants', (table) => {
        table.double("longitude").alter();
        table.double("latitude").alter();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.from("restaurants").whereRaw(
        `
        ("longitude"::real)
        in
        (select ("longitude"::real)
        from restaurants
        group by ("longitude"::real)
        having count(*) > 1)
        `
    ).delete()

    await knex.from("restaurants").whereRaw(
        `
        ("latitude"::real)
        in
        (select ("latitude"::real)
        from restaurants
        group by ("latitude"::real)
        having count(*) > 1)
        `
    ).delete()

    await knex.schema.alterTable('restaurants', (table) => {
        table.float("longitude").alter();
        table.float("latitude").alter();
    })
}

