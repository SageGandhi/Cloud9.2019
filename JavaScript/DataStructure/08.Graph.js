//Path=>Vertex.01->Vertex.02->...->Vertex.(i)->Vertex.(i+1)->...
//Adjacency Matrix:I'thVertex With J'th Vertex Of Connected AdjacencyMatrix[I'thVertex][J'thVertex]===1,0 Otherwise.
// [
//      A B C D E F G H I
//   A  0 1 1 1 0 0 0 0 0
//   B  1 0 0 0 1 1 0 0 0
//   C  1 0 0 1 0 0 1 0 0
//   D  1 0 1 0 0 0 1 1 0
//   E  0 1 0 0 0 0 0 0 1
//   F  0 1 0 0 0 0 0 0 0
//   G  0 0 1 1 0 0 0 0 0
//   H  0 0 0 1 0 0 0 0 0
//   I  0 0 0 0 1 0 0 0 0
// ]
//Adjacency List:I'thVertex With J'th Vertex Of Connected I'thVertex AdjacencyList Contain [J'thVertex].
// [
//   A=>B C D
//   B=>A E F
//   C=>A D G
//   D=>A C G H
//   E=>B I
//   F=>B
//   G=>C D
//   H=>D
//   I=>E
// ]
//Incidence Matrix:I'thVertex Connected With J'thEdge AdjacencyMatrix[I'thVertex][J'thEdge]===1,0 Otherwise.
function DictionaryOrMap() {
    this.items = {};
    this.set = function(key, value) {
        this.items[key] = value;
    }
    this.delete = function(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }
    this.has = function(key) {
        return this.items.hasOwnProperty(key);
    }
    this.get = function(key) {
        return this.has(key) ? this.items[key] : undefined;
    }
    this.clear = function() {
        this.items = {};
    }
    this.size = function() {
        let keys = 0;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                keys++;
            }
        }
        return keys;
    }
    this.keys = function() {
        let keys = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }
    this.values = function() {
        let values = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(this.items[key]);
            }
        }
        return values;
    }
}
const _InternalArraySymbol = Symbol('InternalArray');
class Queue {
    constructor() {
        this[_InternalArraySymbol] = [];
        console.log(this);
    }
    enqueue(element) { //Pushing At The End
        this[_InternalArraySymbol].push(element);
    }
    dequeue() {
        if (!this.isEmpty()) { //Removing From The Front
            return this[_InternalArraySymbol].shift();
        }
        throw new Error("Queue Underflow Error,Queue Is Empty");
    }
    front() {
        if (!this.isEmpty()) {
            return this[_InternalArraySymbol][0];
        }
        throw new Error("Queue Underflow Error,Queue Is Empty");
    }
    isEmpty() { return this[_InternalArraySymbol].length === 0; }
    clear() { this[_InternalArraySymbol] = []; }
    size() { return this[_InternalArraySymbol].length; }
}
class Stack {
    constructor() { this[_InternalArraySymbol] = []; }
    push(element) {
        this[_InternalArraySymbol].push(element);
    }
    pop() {
        if (!this.isEmpty()) {
            return this[_InternalArraySymbol].pop();
        }
        throw new Error("Stack Underflow Error,Stack Is Empty");
    }
    peek() {
        if (!this.isEmpty()) {
            return this[_InternalArraySymbol][this[_InternalArraySymbol].length - 1];
        }
        throw new Error("Stack Underflow Error,Stack Is Empty");
    }
    isEmpty() { return this[_InternalArraySymbol].length === 0; }
    clear() { this[_InternalArraySymbol] = []; }
    size() { return this[_InternalArraySymbol].length; }
}
/**********************************Graph*********************************************/
function Graph() {
    this.vertices = [], this.adjacentList = new DictionaryOrMap();
    let _Visited = 'Visited', //Visited/Enqued But Not All Nodes From There Enqued
        _Explored = 'Explored', //All The Nodes From Current Node Are Enqued
        _NotVisited = 'NotVisited'; //Still Not Enqued
    this.addVertex = function(vertex) {
        this.vertices.push(vertex);
        this.adjacentList.set(vertex, []);
    }
    this.addEdge = function(startVertex, endVertex) {
        this.adjacentList.get(startVertex).push(endVertex);
        this.adjacentList.get(endVertex).push(startVertex);
    }
    this.toString = function() {
        let toStr = '';
        this.vertices.forEach(vertex => {
            toStr += vertex + '=>';
            this.adjacentList.get(vertex).forEach(vertexConnectedTo => toStr += vertexConnectedTo + ' ');
            toStr += '\n';
        });
        return toStr;
    }
    this.breadthFirstSearch = function(startVertex, callback) { //Use Queue:Explore Node Level By Level
        let statusArray = this.initializeVerticesForBfsDfs(),
            vertexQueue = new Queue(), //Create A Queue For BreadFirst
            edgeDistance = [],
            predecessor = [];
        this.vertices.forEach(vertex => {
            edgeDistance[vertex] = 0; //Initialize Edge Distance From Root For Each Vertex
            predecessor[vertex] = null; //Initialize Predecessor For Each Vertex
        });
        vertexQueue.enqueue(startVertex); //Enqued The Start Vertex
        while (!vertexQueue.isEmpty()) {
            let currentVertexToExplore = vertexQueue.dequeue(),
                adjacencyList = this.adjacentList.get(currentVertexToExplore);
            statusArray[currentVertexToExplore] = _Visited; //Visited But Not Explored
            adjacencyList.forEach(vertexAdj => {
                if (statusArray[vertexAdj] === _NotVisited) {
                    edgeDistance[vertexAdj] = edgeDistance[currentVertexToExplore] + 1; //Increment Edge Distance From Source
                    predecessor[vertexAdj] = currentVertexToExplore; //Set Predecessor For A Node
                    vertexQueue.enqueue(vertexAdj); //Enqueued All Neighbours From currentVertexToExplore   
                    statusArray[vertexAdj] = _Visited; //Mark These Vertices As Visited
                }
            });
            statusArray[currentVertexToExplore] = _Explored; //Current Node Is Explored
            if (callback) { callback({ currentVertexToExplore, edgeDistance, predecessor }); } //Invoke Callback If Passed
        }
        return { edgeDistance, predecessor };
    }
    this.depthFirstSearch = function(callback) { //Use Stack:Explore Node Until Leaf Node Reached,Then BackTrack
        let statusArray = this.initializeVerticesForBfsDfs(),
            discoveryOrder = [],
            exploredOrder = [],
            predecessor = [];
        this.vertices.forEach(vertex => {
            if (statusArray[vertex] === _NotVisited) {
                this.performDepthFirstSearch(vertex, statusArray, callback, discoveryOrder, exploredOrder, predecessor);
            }
        });
        return { discoveryOrder, exploredOrder, predecessor };
    }
    this.initializeVerticesForBfsDfs = function() {
        let veticesStatus = [];
        this.vertices.forEach(item => veticesStatus[item] = _NotVisited);
        return veticesStatus;
    }
    this.performDepthFirstSearch = function(vertex, statusArray, callback, discoveryOrder, exploredOrder, predecessor) {
        statusArray[vertex] = _Visited;
        discoveryOrder[vertex] = this.dfsOrderDiscovery++;
        if (callback) callback(vertex);
        this.adjacentList.get(vertex).forEach(adjVertex => {
            if (statusArray[adjVertex] === _NotVisited) {
                predecessor[adjVertex] = vertex;
                this.performDepthFirstSearch(adjVertex, statusArray, callback, discoveryOrder, exploredOrder, predecessor);
            }
        });
        exploredOrder[vertex] = this.dfsOrderExplored++;
        statusArray[vertex] = _Explored;
    }
    this.dfsOrderDiscovery = 1;
    this.dfsOrderExplored = 1;
}
(function() {
    let firstGraph = new Graph(),
        adjacencyList = { 'A': ['B', 'C', 'D'], 'B': ['E', 'F'], 'C': ['D', 'G'], 'D': ['G', 'H'], 'E': ['I'] };
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(item => firstGraph.addVertex(item));
    Object.keys(adjacencyList).forEach((vertex) => adjacencyList[vertex].forEach(vertexConnectedTo => firstGraph.addEdge(vertex, vertexConnectedTo)));
    /*console.log(firstGraph.toString());*/ //Printing Graph For Adjacency List
    /*console.log(firstGraph.initializeVerticesForBfsDfs());*/
    let edgeWithPredecessor = firstGraph.breadthFirstSearch(firstGraph.vertices[0] /*, (args) => console.log(args)*/ ),
        fromVertex = 'A'; /*console.log(firstGraph.vertices, edgeWithPredecessor);*/

    for (let index = 1; index < firstGraph.vertices.length; index++) {
        let toVertex = firstGraph.vertices[index],
            vertexStackPath = new Stack(),
            path = '';
        for (let vertex = toVertex; vertex !== fromVertex; vertex = edgeWithPredecessor.predecessor[vertex]) {
            vertexStackPath.push(vertex);
        }
        vertexStackPath.push(fromVertex);
        while (!vertexStackPath.isEmpty()) {
            path += `${vertexStackPath.pop()}=>`;
        }
        console.log(`Path From ${fromVertex} To ${toVertex}=>${path}`);
    }
    console.log(firstGraph.depthFirstSearch((args) => console.log(args)));
}())
