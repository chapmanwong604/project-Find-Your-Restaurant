import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('restaurants', (table) => {
        table.increments();
        table.string("name").notNullable();
        table.string("categories").notNullable();
        table.integer("phone").nullable();
        table.string("address").unique().notNullable();
        table.float("longitude").unique().notNullable();
        table.float("latitude").unique().notNullable();
        table.text("openrice_link").unique().notNullable();
        table.text("door_photo").nullable();
    })

    await knex.schema.createTable('food',(table) => {
        table.increments();
        table.string("name").notNullable();
        table.string("chinese_name").notNullable();
        table.string("categories").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("restaurants");
    await knex.schema.dropTableIfExists("food");
}