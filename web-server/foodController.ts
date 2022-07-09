import express, { Request, Response } from "express";
import fetch from "node-fetch";
import { FoodService } from "./foodService";
import { extractSingleFile, form } from "./uploadimage";

export class FoodController {
  constructor(private foodService: FoodService) {}

  post = async (req: Request, res: Response) => {
    form.parse(req, async (error, fields,files) => {
      try {
        let file = extractSingleFile(files.image);
        let imageFilename = file?.newFilename;
        // console.log(file, imageFilename)
        let response = await fetch("http://localhost:8080/", {
          method: "POST",
          body: JSON.stringify({filename:imageFilename}),
        });
        let foodAnswer = await response.json();
        console.log("answer from python server:", foodAnswer);
        let food = await this.foodService.food(foodAnswer.name);
        // console.log(food);
        if(food.error){
            throw new Error(food.error);
        }
        req.session["food"] = {
          name: food.name,
          chinese_name: food.chinese_name,
          categories: food.categories,
          tags: food.tags,
        };
        // console.log(req.session);
        res.json(food);
      }catch (error) {
        if(String(error).includes('ECONNREFUSED')){
          res.status(500).json({error:'Fail to connect Python server.'});
          return
        }
          if(error instanceof Error) {
              res.status(500).json({error:error.message});
          } else{
              res.status(500).json({error:String(error)});
          }
        return
      }
      return
    });
  };
}
