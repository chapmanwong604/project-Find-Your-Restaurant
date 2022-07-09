import { Knex } from "knex";


export class FoodService{
    constructor(
        private knex:Knex,
    ) {}

    async food(answer:any){
        // console.log(answer);
        
        let result:any = await this.knex("food").select("*").where("name",answer)
        // console.log(result);
            if(result.length == 0){
                result.json({error:"no food found"})
        }
        return result[0]
    }
}