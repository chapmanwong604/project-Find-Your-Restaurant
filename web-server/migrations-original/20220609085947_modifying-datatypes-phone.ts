import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurants', (table) => {
        table.string("phone").alter();
        table.dropNullable("phone")
    })
}



export async function down(knex: Knex): Promise<void> {
    let rows =
        await knex.select("phone", "id").from("restaurants")

    for (let row of rows) {
        let phone = JSON.parse(row.phone.replace(/'/g,"\""))[0]
        if (phone) {
            phone = phone.replace(/-/g,"").replace(/ /g,"")
            await knex.update({
                phone
            }).where({ id: row.id }).from("restaurants")
        } else {
            await knex.from("restaurants").where("id", row.id).delete()
        }
    }

    await knex.schema.alterTable('restaurants', (table) => {
        table.integer("phone").alter();
        table.setNullable("phone")
    })
}
