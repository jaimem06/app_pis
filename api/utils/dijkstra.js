const ColaPrioridad = require('./colaprioridad.js');

function dijkstra(graph, startNode, endNode) {                               // 1
    let distances = {};                                                      // 1
    let previous = {};                                                       // 1
    let visited = {};                                                        // 1
    let queue = new ColaPrioridad((a, b) => distances[a] - distances[b]);    // 1

    if (!graph[startNode]) {                                                 // 1                                 
        throw new Error('El nodo de inicio no existe en el grafo');          // = 6
    }

    for (let node in graph) {                                                // n + 1
        distances[node] = Infinity;                                          // n 
        previous[node] = null;                                               // n
    }                                                                        // = 3n + 1

    distances[startNode] = 0;                                                // 1  
    queue.push(startNode);                                                   // 1
                                                                             // = 2
    console.log('Nodo de inicio:', startNode);

    while (!queue.isEmpty()) {                                               // n
        let currentNode = queue.pop();                                       // n                                 
        visited[currentNode] = true;                                         // n
                                                                             // = 3n
        //console.log('Nodo actual:', currentNode);

        for (let neighbor in graph[currentNode]) {                                     // n * n + 1
            let newDistance = distances[currentNode] + graph[currentNode][neighbor];   // n * n 
            if (newDistance < distances[neighbor]) {                                   // n * n
                distances[neighbor] = newDistance;                                     // n * n
                previous[neighbor] = currentNode;                                      // n * n
                queue.push(neighbor);                                                  // n * n  
                //console.log(`Actualizando distancia del vecino ${neighbor} a ${newDistance}`);
                }                                                                      
                                                                                       // = 6n^2 + 1
        }
    }

    let path = [endNode];                                                   // 1
    let currentNode = endNode;                                              // 1
    while (previous[currentNode] != null) {                                 // n     
        currentNode = previous[currentNode];                                // n
        path.unshift(currentNode);                                          // n                       
    }                                                                       // = 3n + 2

    console.log('Ruta encontrada:', path);

    return path;                                                            // 1
}

module.exports = dijkstra;

// T(n) = 6 +  3n + 1 + 2 + 3n + 6n^2 + 1 + 3n + 2
// T(n) = 12 + 9n + 6n^2
// Funcion T(n) = 6n^2 + 9n + 12
// T(n) = O(n^2)