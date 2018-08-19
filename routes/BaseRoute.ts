import {Request, Response} from "express";
import Graph from "../Graph";

export default class BaseRoute {
    private readonly header = { 'Content-Type': 'application/json; charset=utf-8' };

    public routes(app): void {
        app.route('/api/paths/').get((request: Request, response: Response) => {
            let {from} = request.query;
            if (!from || !Graph.graphObject.hasOwnProperty(from)) {
                return response.set(this.header).status(400).send(this.buildBody({
                    message: 'Bad request'
                }));
            }

            let result = Graph.buildShortestPaths(from);
            response.set(this.header).status(200).send(this.buildBody(result));
        });

        app.route('*').get((request: Request, response: Response) => {
            response.set(this.header).status(200).send(this.buildBody({
                message: 'Welcome to Navigator Dijkstra Api. /api/paths/?from=FROM',
                graph: Graph.graphObject
            }));
        });
    }

    private buildBody(body) {
        return JSON.stringify(body, undefined, ' ');
    }
}