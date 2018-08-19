import GooglePriorityQueue from "./GooglePriorityQueue";

export default class Graph {
    public static buildShortestPaths(from) {
        let result = {
            'from': from,
            'paths': [],
            'graph': Graph.graphObject
        };
        Object.keys(this.graph).forEach(to => {
            if (from !== to) {
                let sp = this.shortestPath(from, to);
                let res = {
                    'to': to,
                    'distance': sp.distance,
                    'path': sp.path
                };
                result.paths.push(res);
            }
        });
        return result;
    }

    private static shortestPath(start, finish) {
        let nodes = new GooglePriorityQueue();
        let distances = {};
        let previous = {};
        let path = [];
        let distance = -1;

        for (let vertex in this.graph) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(Infinity, vertex);
            }

            previous[vertex] = null;
        }

        while (!nodes.isEmpty()) {
            let smallest = nodes.dequeue();

            if (smallest === finish) {
                path = [];
                distance = distances[smallest];

                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if (!smallest || distances[smallest] === Infinity) continue;

            for (let neighbor in this.graph[smallest]) {
                let alt = distances[smallest] + this.graph[smallest][neighbor];

                let sm = smallest;
                while (previous[sm]) {
                    sm = previous[sm];
                }

                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return {
            'path': path.concat(start).reverse(),
            'distance': distance
        };
    }

    public static get graphObject() {
        return this.graph;
    }

    private static readonly graph: any = {
        'Санкт-Петербург': {
            'Вологда': 545,
            'Великий Новгород': 151
        },
        'Вологда': {
            'Санкт-Петербург': 545,
            'Ярославль': 174
        },
        'Ярославль': {
            'Вологда': 174,
            'Москва': 246,
            'Иваново': 100
        },
        'Иваново': {
            'Ярославль': 100,
            'Владимир': 83
        },
        'Владимир': {
            'Иваново': 83,
            'Москва': 184
        },
        'Москва': {
            'Ярославль': 246,
            'Владимир': 184,
            'Воронеж': 462,
            'Тула': 171,
            'Калуга': 157,
            'Смоленск': 363,
            'Тверь': 156
        },
        'Воронеж': {
            'Москва': 462,
            'Курск': 212
        },
        'Курск': {
            'Орел': 135,
            'Воронеж': 212
        },
        'Орел': {
            'Курск': 135,
            'Тула': 174
        },
        'Тула': {
            'Москва': 171,
            'Орел': 174
        },
        'Калуга': {
            'Москва': 157,
            'Брянск': 171
        },
        'Брянск': {
            'Калуга': 171
        },
        'Смоленск': {
            'Москва': 363
        },
        'Тверь': {
            'Москва': 156,
            'Великий Новгород': 323
        },
        'Великий Новгород': {
            'Тверь': 323,
            'Санкт-Петербург': 151
        }
    };
}