import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('food', (table) => {
        table.string("tags").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('food', (table) => {
        table.dropColumn("tags");
    })
}

