const ColaPrioridad = require('./cola_prioridad.js');

function dijkstra(graph, startNode, endNode) {
    let distances = {};
    let previous = {};
    let visited = {};
    let queue = new ColaPrioridad((a, b) => distances[a] - distances[b]);

    if (!graph[startNode]) {
        throw new Error('El nodo de inicio no existe en el grafo');
    }

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }

    distances[startNode] = 0;
    queue.push(startNode);

    while (!queue.isEmpty()) {
        let currentNode = queue.pop();
        visited[currentNode] = true;

        for (let neighbor in graph[currentNode]) {
            if (visited[neighbor]) continue;

            let newDistance = distances[currentNode] + graph[currentNode][neighbor];

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = currentNode;
                if (!queue.isEmpty()) {
                    queue.pop();
                }
                queue.push(neighbor);
            }
        }
    }

    let path = [];
    let currentNode = endNode;
    while (currentNode != null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    return path;
}

module.exports = dijkstra;