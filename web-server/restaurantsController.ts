import { Request, Response } from 'express';
import { RestaurantsService } from './restaurantsService';
import "./session"

export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService){}
    
    get = async (req: Request, res: Response) => {
        try {
            console.log(req.query);
            let foodName = req.query.name;
            if(!foodName || typeof foodName !== 'string'){
                res.status(400).json({error:"Missing food name in request query."})
                return
            }
            // let foodTag:string = req.query.food.tags;
            // let ChineseName:string = req.query.food.chinese_name;
            // let foodName = "crab_cakes";
            
            let json = await this.restaurantsService.getRestaurants(foodName)
            
            // console.log(restaurantsInfo, foodTag);       
            res.json(json);
        }
        catch(error){
            if(error instanceof Error) {
                res.json({ success: false , msg:error.message});
            }
        }
    }
}

