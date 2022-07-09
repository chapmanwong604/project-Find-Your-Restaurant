import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('restaurants', table => {
    table.float('latitude').notNullable().alter()
    table.dropNullable('latitude')
    table.float('longitude').notNullable().alter()
    table.dropNullable('longitude')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('restaurants', table => {
    table.setNullable('longitude')
    table.double('longitude').nullable().alter()
    table.setNullable('latitude')
    table.double('latitude').nullable().alter()
  })
}
