export default class GooglePriorityQueue {
    private nodes: any[];

    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {

        this.nodes.push({
            key: key,
            priority: priority
        });

        this.sort();
    };

    dequeue() {
        let node = this.nodes.shift();
        return node.key;
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return !this.nodes.length;
    }
}