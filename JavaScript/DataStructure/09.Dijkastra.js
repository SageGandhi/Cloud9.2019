function dijkastraSingleSourceShortestPath(source) {
    let distance = [],
        visited = [],
        adjacencyMatrix = [
            [0, 2, 4, 0, 0, 0],
            [0, 0, 1, 4, 2, 0],
            [0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 3, 0, 2],
            [0, 0, 0, 0, 0, 0]
        ],
        length = adjacencyMatrix.length;
    for (let index = 0; index < length; index++) {
        distance[index] = Number.MAX_VALUE;
        visited[index] = false;
    }
    distance[source] = 0;
    for (let vertex = 0; vertex < length; vertex++) {
        let { minIndex } = minDistanceNode(distance, visited);
        visited[minIndex] = true;
        for (let vertexOther = 0; vertexOther < length; vertexOther++) {
            //Not Visited Yet,Adj.Matrix Have Weight Between These Vertex,
            if (!visited[vertexOther] &&
                adjacencyMatrix[minIndex][vertexOther] !== 0 &&
                distance[minIndex] !== Number.MAX_VALUE &&
                distance[minIndex] + adjacencyMatrix[minIndex][vertexOther] < distance[vertexOther]) {
                distance[vertexOther] = distance[minIndex] + adjacencyMatrix[minIndex][vertexOther];
            }
        }
    }
    return distance;
}

function minDistanceNode(distanceArrayUntilNow, visitedArrayUntilNow) {
    let minVal = Number.MAX_VALUE,
        minIndex = -1;
    distanceArrayUntilNow.forEach((distance, index, array) => {
        if (!visitedArrayUntilNow[index] && distance <= minVal) {
            minVal = distance;
            minIndex = index;
        }
    });
    console.log('UntilNow:', { minIndex, minVal });
    return { minIndex, minVal };
}
/*console.log(dijkastraSingleSourceShortestPath(0));*/
