import { Request, Response } from 'express';


export class HomePageController {
    get = async (req: Request, res: Response) => {
        res.redirect('/homepage.html');
    }
}