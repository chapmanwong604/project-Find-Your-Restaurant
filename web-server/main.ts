import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { routes } from './routes';

const app = express();
const server = new http.Server(app)

// Setup API Routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes);

// Setup Static Files
app.use(express.static(path.resolve('public')));

app.use((req: Request, res: Response) => {
    res.sendFile(path.resolve("public/404.html"))
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});