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

    console.log('Nodo de inicio:', startNode);

    while (!queue.isEmpty()) {
        let currentNode = queue.pop();
        visited[currentNode] = true;

        console.log('Nodo actual:', currentNode);

        for (let neighbor in graph[currentNode]) {
            let newDistance = distances[currentNode] + graph[currentNode][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = currentNode;
                queue.push(neighbor);
                console.log(`Actualizando distancia del vecino ${neighbor} a ${newDistance}`);
            }
        }
    }

    let path = [endNode];
    let currentNode = endNode;
    while (previous[currentNode] != null) {
        currentNode = previous[currentNode];
        path.unshift(currentNode);
    }

    console.log('Ruta encontrada:', path);

    return path;
}

module.exports = dijkstra;