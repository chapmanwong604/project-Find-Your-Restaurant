import { knex } from "./db"

describe('db Test', () => {
    it('should rollback without error', async () => {
        await knex.migrate.rollback({},true)
    })
    it('should migrate without error', async () => {
        await knex.migrate.latest({})
    })
    it('should seed without error', async () => {
        await knex.seed.run()
    })
})