const _InternalArraySymbol = Symbol('InternalArray');
class Queue {
    constructor() {
        this[_InternalArraySymbol] = [];
        console.log(this);
    }
    enqueue(element) { //Pushing At The End
        this[_InternalArraySymbol].push(element);
        /*console.log('Item Enqued :', element);*/
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
(function() {
    let firstQueue = new Queue();
    console.log('IsEmpty', firstQueue.isEmpty(), 'Enque');
    firstQueue.enqueue(100);
    console.log('Size', firstQueue.size(), 'Front', firstQueue.front());
    console.log('IsEmpty', firstQueue.isEmpty(), 'Dequeue', firstQueue.dequeue());
    console.log('IsEmpty', firstQueue.isEmpty(), 'Size', firstQueue.size());
    console.log('Enque', firstQueue.enqueue(100), 'Size', firstQueue.size());
    console.log('Clear', firstQueue.clear(), 'Size', firstQueue.size());
}());
//Ascending=>ascendingDescendingFlag==true
//Descending=>ascendingDescendingFlag==false
function PriorityQueue(ascendingDescendingFlag) {
    let internalItems = [];

    function PriorityQueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element, priority) {
        let queueElement = new PriorityQueueElement(element, priority);
        let isElementAdded = false;
        for (let index = 0; index < internalItems.length; index++) {
            if (ascendingDescendingFlag && queueElement.priority <= internalItems[index].priority) {
                internalItems.splice(index, 0, queueElement);
                isElementAdded = !isElementAdded;
                break;
            }
            else if (!ascendingDescendingFlag && queueElement.priority >= internalItems[index].priority) {
                internalItems.splice(index, 0, queueElement);
                isElementAdded = !isElementAdded;
                break;
            }
        }
        if (!isElementAdded) {
            internalItems.push(queueElement);
        }
    }
    this.dequeue = function() {
        if (!this.isEmpty()) { //Removing From The Front
            return internalItems.shift();
        }
        throw new Error("Queue Underflow Error,Queue Is Empty");
    }
    this.front = function() {
        if (!this.isEmpty()) {
            return internalItems[0];
        }
        throw new Error("Queue Underflow Error,Queue Is Empty");
    }
    this.isEmpty = function() { return internalItems.length === 0; }
    this.clear = function() { internalItems = []; }
    this.size = function() { return internalItems.length; }
    this.print = function() { return internalItems; }
}

(function() {
    let firstQueue = new PriorityQueue(false);
    firstQueue.enqueue(100, 10);
    firstQueue.enqueue(200, 15);
    firstQueue.enqueue(250, 5);
    firstQueue.enqueue(150, 10);
    console.log('IsEmpty', firstQueue.isEmpty(), 'Queue', firstQueue.print());
    console.log('Size', firstQueue.size(), 'Front', firstQueue.front());
    console.log('IsEmpty', firstQueue.isEmpty(), 'Dequeue', firstQueue.dequeue());
}());
//Musical-Chair Game Using Circular Queue
(function() {
    let firstQueue = new Queue(),
        names=['Prakash','Chandra','Mahato','Prajit','Gandhi','Choti','Anwesha','Shamim','Aktar'],
        added={},
        numOfChairs=names.length-1;//Initialy No Of Chairs Less Than Participant
    names.forEach((name,index,array)=>{
        //Randoom Array Will Have The Same Size Of Source Array,
        //Item May Be Duplicated If Following Check Not Performed
        //If Same Random Number Generated
        //Randomizing The Array
        let randVal = Math.floor(Math.random()*(names.length));
        if(!!added[randVal]){//If Index Not Added Already
            firstQueue.enqueue(array[randVal]);    
            added[randVal]=true;
        }else{//If Index Added Already,Until Next Random Index Found
            while(added[randVal])randVal = Math.floor(Math.random()*(names.length));
            firstQueue.enqueue(array[randVal]);    
            added[randVal]=true;
        }
    });
    while(firstQueue.size()>1){
        for(let index=0;index<numOfChairs;index++){
            firstQueue.enqueue(firstQueue.dequeue());    
        }
        numOfChairs--;//Decreasing No Of Chairs
        console.log('Eliminating Player:',firstQueue.dequeue());
    }
    console.log('Winner:',firstQueue.dequeue());
}());
