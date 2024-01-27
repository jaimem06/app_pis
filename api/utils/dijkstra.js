const PriorityQueue = require('js-priority-queue');
function dijkstra(grafo, inicio, fin) {
    const distancias = {};
    const previos = {};
    const cola = new PriorityQueue({ comparator: (a, b) => distancias[a] - distancias[b] });

    distancias[inicio] = 0;
    cola.queue(inicio);

    while (cola.length > 0) {
        const nodo = cola.dequeue();

        if (nodo === fin) {
            let ruta = [fin];
            let nodoActual = nodo;
            while (previos[nodoActual]) {
                ruta.unshift(previos[nodoActual]);
                nodoActual = previos[nodoActual];
            }
            return ruta;
        }

        for (const vecino in grafo[nodo]) {
            const nuevaDistancia = distancias[nodo] + grafo[nodo][vecino];

            if (!(vecino in distancias) || nuevaDistancia < distancias[vecino]) {
                distancias[vecino] = nuevaDistancia;
                previos[vecino] = nodo;
                cola.queue(vecino);
            }
        }
    }

    return null; // Devuelve null si no hay ruta desde el inicio hasta el fin
}
module.exports = dijkstra;