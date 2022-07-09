import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('food'))) {
    await knex.schema.createTable('food', table => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('chinese_name', 255).notNullable()
      table.string('categories', 255).notNullable()
      table.string('tags', 255).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('restaurants'))) {
    await knex.schema.createTable('restaurants', table => {
      table.double('latitude').nullable()
      table.double('longitude').nullable()
      table.increments('id')
      table.string('phone', 255).notNullable()
      table.string('address', 255).notNullable()
      table.text('openrice_link').notNullable().unique()
      table.text('door_photo').nullable()
      table.string('name', 255).notNullable()
      table.text('categories').notNullable()
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('restaurants')
  await knex.schema.dropTableIfExists('food')
}
