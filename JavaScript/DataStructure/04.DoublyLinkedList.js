function DoublyLinkedList() {
    function Node(element) {
        this.data = element;
        this.previousNode = null;
        this.nextNode = null;
    }
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.insert = function(position, element) {
        if (position < 0 || position > this.length) {
            throw new Error(`Please Provide Valid Position Between 0 & ${this.length-1}`);
        }
        else {
            let nodeToBeInserted = new Node(element);
            if (position === 0) { //   Insert In Head Position=>
                if (!this.head) { //  01.Head Not Exist,First Element,
                    this.head = nodeToBeInserted;
                    this.tail = nodeToBeInserted;
                }
                else { //  02.Head Present,Replace Head With New Node As Head
                    nodeToBeInserted.nextNode = this.head;
                    this.head.previousNode = nodeToBeInserted;
                    this.head = nodeToBeInserted;
                }
            }
            else if (position === this.length) { // Last Element Insertion Position
                this.tail.nextNode = nodeToBeInserted;
                nodeToBeInserted.previousNode = this.tail;
                this.tail = nodeToBeInserted;
            }
            else { // In Between Element Insertion
                //previousNode=this.head Initialize Without Harming LinkedList
                let index = 0,
                    previousNode = this.head,
                    currentNode = this.head;
                while (index < position) {
                    previousNode = currentNode;
                    currentNode = currentNode.nextNode;
                    index++; // Increment Index Until Position Reached
                }
                //Position 3:[0->0,1,1],[1->1,2,2],[2->2,3,3]
                //Previous Node & New Node Relation SetUp,One Side Of The Chain
                previousNode.nextNode = nodeToBeInserted;
                nodeToBeInserted.previousNode = previousNode;
                //Next Node & New Node Relation SetUp,Other Side Of The Chain
                nodeToBeInserted.nextNode = currentNode;
                currentNode.previousNode = nodeToBeInserted;
            }
            this.length++;
            //Optimize When Position>Length/2=>Start From Tail
        }
    }
    this.remove = function(position) {
        if (position < 0 || position > this.length) {
            throw new Error(`Please Provide Valid Position Between 0 & ${this.length-1}`);
        }
        else {
            if (position === 0) { //Remove From Head:Position:0
                this.head = this.head.nextNode;
                if (this.length === 1) { //Single Node Deletion
                    this.tail = null; //this.head == Null In This Case,No Need To Garbage Collect Previous/Next Pointer
                }
                else {
                    this.head.previousNode.nextNode = null; //Garbage Collection Old Head Next Pointer
                    this.head.previousNode = null; //Garbage Collection Old Head Previous Pointer
                }
            }
            else if (position === this.length - 1) { //Remove From Tail:Position:this.length-1
                this.tail = this.tail.previousNode;
                this.tail.nextNode.previousNode = null;
                this.tail.nextNode = null;
            }
            else { //Remove From InBetween.
                //previousNode=this.head Initialize Without Harming LinkedList
                let index = 0,
                    previousNode = this.head,
                    currentNode = this.head;
                while (index++ < position) {
                    previousNode = currentNode;
                    currentNode = currentNode.nextNode;
                }
                //When Loops End CurrentNode == Position,PreviousNode == Position-1
                previousNode.nextNode = currentNode.nextNode; //Set Up Next Pointer
                currentNode.nextNode.previousNode = previousNode; //Set Up Previous Pointer
            }
        }
        this.length--;
    }
    this.print=function(){
        let toStr = '',currentNode = this.head,index=0;
        while(currentNode){
            toStr+=(index++)+':'+currentNode.data+'=>';
            currentNode = currentNode.nextNode;
        }
        console.log(`DoublyLinkedList:${toStr}`);
    }
}
(function(){
    let doublyLinkedList = new DoublyLinkedList();
    //[0:100]=>[0:121]:[1:100]=>[0:144]:[1:121]:[1:100]=>[0:169]:[1:144]:[2:121]:[3:100]
    doublyLinkedList.insert(0,100);doublyLinkedList.insert(0,121);doublyLinkedList.print();
    doublyLinkedList.insert(0,144);doublyLinkedList.insert(0,169);doublyLinkedList.print();
    //[169,144,121,100]=>[169,144,4,121,100]=>[169,144,4,9,121,100]=>[169,144,4,9,16,121,100]=>[169,144,4,9,16,25,121,100]
    doublyLinkedList.insert(2,4);doublyLinkedList.insert(3,9);doublyLinkedList.print();
    doublyLinkedList.insert(4,16);doublyLinkedList.insert(5,25);doublyLinkedList.print();
    doublyLinkedList.remove(2);doublyLinkedList.print();
    doublyLinkedList.remove(3);doublyLinkedList.print();
}())