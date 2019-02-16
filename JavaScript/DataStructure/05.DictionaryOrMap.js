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

function HashTable() {
    this.items = [];
    this.hashCode = function(key) {
        let sum = 0;
        for (let charAt in key) sum += key.charCodeAt(charAt);
        return sum % 37;
    }

    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    this.put = function(key, value) {
        if (!this.items[this.hashCode(key)]) {
            this.items[this.hashCode(key)] = new LinkedList();
        }
        this.items[this.hashCode(key)].append(new KeyValue(key, value));
    }
    this.get = function(key) {
        if (this.items[this.hashCode(key)]) {
            let head = this.items[this.hashCode(key)].getHead();
            while (head) {
                if (head.data.key === key) {
                    return head.data.value;
                }
                head = head.next;
            }
        }
        return undefined;
    }
    this.remove = function(key) {
        //Need To Shift & Rehash Other Element If We Delete 
        /*this.items[this.hashCode(key)] = undefined;*/
        if (this.items[this.hashCode(key)]) {
            let head = this.items[this.hashCode(key)].getHead();
            while (head) {
                if (head.data.key === key) {
                    head.remove(head.data);
                    break;
                }
                head = head.next;
            }
        }
    }
    this.getHashList = function(key) {
        return this.items[this.hashCode(key)].getHead();
    }
}
(function() {
    let hash = new HashTable();
    console.log(`Prajit HashCode :${hash.hashCode('Prajit')}`);
    console.log(`Gandhi HashCode :${hash.hashCode('Gandhi')}`);

    hash.put('Prajit', 'Prajit.Gandhi@email.com');
    hash.put('Gandhi', 'Gandhi.Prajit@email.com');
    console.log(hash.getHashList('Gandhi'));
    console.log(hash.getHashList('Prajit'));
    //Due To My Hash Logic Key Constituent Of Same Character Make Collision
    hash.put('123456789', 'Gandhi.Prajit@email.com');
    hash.put('123789456', 'Prajit.Gandhi@email.com');

    console.log(hash.get('123456789'));
    console.log(hash.get('123789456'));
    console.log(hash.getHashList('123456789'));
    console.log(hash.hashCode('123456789'));
    console.log(hash.hashCode('123789456'));
}())

function LinkedList() {
    function Node(data) {
        this.data = data;
        this.next = null;
    }
    this.head = null;
    this.length = 0;
    //Appending Element,First Element Of the List,Last Element Of The List
    this.append = function(element) {
        let toBeInsertedNode = new Node(element);
        if (this.head == null) {
            //First Element Of the List
            this.head = toBeInsertedNode;
            /*console.log(`Added The First Element`);*/
        }
        else {
            /*console.log(`Added As Last Element`);*/
            let currentNode = this.head;
            while (currentNode.next) { //Order(Length)=0(N)
                //At The End Of This Loop,Last Node Pointed By CurrentNode
                currentNode = currentNode.next;
            }
            currentNode.next = toBeInsertedNode;
            this.length++;
        }
    }
    this.print = function() {
        let toStr = 'Head:',
            currentNode = this.head,
            index = 0;
        while (currentNode) {
            toStr += currentNode.data + ':' + (index++) + ':=>';
            currentNode = currentNode.next;
        }
        console.log(toStr);
    }
    //First,Other Than First Case
    this.removeAt = function(position) {
        let previousNode, currentNode = this.head;
        if (position < 0 || position > this.length) {
            throw new Error(`Please Provide Valid Position Between 0 & ${this.length-1}`);
        }
        else if (position == 0) { //Removing The First Element
            currentNode = currentNode.next;
            this.head = currentNode; //Current Node Initialized With Head
            this.length--; //Length Property Decrease
        }
        else { //Removing Element Other Than First
            let index = 0;
            while (index < position) {
                previousNode = currentNode;
                currentNode = currentNode.next; //When Loop Ends Current Node Will Point To Position,Previous Node Index Position-1
                console.log('Previous Node:', previousNode.data, 'Current Node:', currentNode.data, 'Index:', index, '\n');
                index += 1;
            }
            //Node:00->Next==Node:01->Next==Node:02->Next==Node:03->Next==Node:04->Next
            //Remove @Third Position,Zero Index:Node:03,Node:02->Next=Node:03->Next[Assignment],
            //previousNode=Node:02,currentNode=Node:03
            previousNode.next = currentNode.next;
            this.length--; //Length Property Decrease
        }
        return currentNode.data || null;
    }
    //First,Last,In Between Case
    this.insert = function(position, element) {
        if (position < 0 || position > this.length) {
            throw new Error(`Please Provide Valid Position Between 0 & ${this.length-1}`);
        }
        else if (position === 0) { //Insert Node @ Head
            let toBeInsertedNode = new Node(element);
            toBeInsertedNode.next = this.head;
            this.head = toBeInsertedNode;
            this.length++;
        }
        else if (position == this.length) { //Insert Node @ End Of The List
            this.append(element); //Do Normal Append
        }
        else {
            let toBeInsertedNode = new Node(element),
                previousNode, currentNode = this.head,
                index = 0;
            while (index < position) {
                //When Loop Ends Current Node Will Point To Position,Previous Node Index Position-1
                previousNode = currentNode;
                currentNode = currentNode.next;
                index++;
            }
            toBeInsertedNode.next = currentNode; //Or previousNode.next
            previousNode.next = toBeInsertedNode;
            this.length++;
        }
    }
    this.indexOf = function(element) {
        let current = this.head,
            index = 0;
        while (current) {
            if (element === current.data) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    this.remove = function(element) {
        return this.removeAt(this.indexOf(element));
    }
    this.isEmpty = function() {
        return this.length === 0;
    }
    this.size = function() {
        return this.length;
    }
    this.getHead = function() {
        return this.head;
    }
}
