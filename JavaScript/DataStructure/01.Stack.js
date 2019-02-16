const _InternalArraySymbol = Symbol('Internal Array');
class Stack {
    constructor() { this[_InternalArraySymbol] = []; }
    push(element) {
        this[_InternalArraySymbol].push(element); 
        console.log('Item Pushed :',element);
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
(function() {
    let firstStack = new Stack();
    firstStack.push(100);
    console.log('Peek:', firstStack.peek());
    console.log('Pop:', firstStack.pop());
    console.log('IsEmpty:', firstStack.isEmpty());
}());
//Decimal To Binary
function decimalToBinary(decimalNumber,base){
    if(typeof decimalNumber === 'number'){
        let stack = new Stack();
        while(decimalNumber>0){
            stack.push(Math.floor(decimalNumber%base));
            decimalNumber=Math.floor(decimalNumber/base);
        }
        let binaryStr = '';
        while (!stack.isEmpty()){ //{5}
            binaryStr += stack.pop().toString();
        }
        console.log(binaryStr);
    }else{
        throw Error(`${decimalNumber} Is Not A Number`);
    }
}
decimalToBinary(124567893,2);