const PriorityQueue = require('../routes/PriorityQueue');

async function dijkstra(grafo, inicio, fin) {
    let distancias = {};
    let previos = {};
    let visitados = {};
    let cola = new PriorityQueue();
/*     console.log("grafo: " + JSON.stringify(grafo));
    console.log("inicio: " + inicio); */
    // Verifica si el nodo de inicio existe en el grafo
    if (!(inicio in grafo)) {
        throw new Error("El nodo de inicio no existe en el grafo");
    }

    
    // Inicializa todos los nodos con distancia infinita
    for(let nodo in grafo) {
        if (grafo.hasOwnProperty(nodo)) {
            distancias[nodo] = Infinity;
            previos[nodo] = null;
        }
    }

    // La distancia al nodo de inicio es 0
    distancias[inicio] = 0;
    cola.enqueue(inicio, 0);

    while (!cola.isEmpty()) {

        let minNodo = cola.dequeue();

        if (visitados[minNodo]) {
            continue;
        }

        visitados[minNodo] = true;

        for(let vecino in grafo[minNodo]) {
            let nuevaDistancia = distancias[minNodo] + grafo[minNodo][vecino];
            

            if (nuevaDistancia < distancias[vecino]) {
                distancias[vecino] = nuevaDistancia;
                previos[vecino] = minNodo;
                cola.enqueue(vecino, nuevaDistancia);
            }
        }
    }
/* console.log("distancias: " + JSON.stringify(distancias));
console.log("previos: " + JSON.stringify(previos));   */
    let nodoFinal = fin;
    let ruta = [];

    while (nodoFinal) {
        ruta.unshift(nodoFinal);
        nodoFinal = previos[nodoFinal];
    }

    return ruta;
}

module.exports = dijkstra;