import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurants',(table) => {
        table.dropNullable("categories");
    })
}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurants',(table) => {
        table.setNullable("categories");
    })
}
