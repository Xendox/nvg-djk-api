import * as express from "express";
import * as bodyParser from "body-parser";
import BaseRoute from "./routes/BaseRoute";

export default class App {

    public app: express.Application;
    public baseRoute: BaseRoute = new BaseRoute();

    constructor() {
        this.app = express();
        this.config();
        this.baseRoute.routes(this.app);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}