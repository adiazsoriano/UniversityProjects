class Node {
    data;
    next;
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

//based on Java Foundations implementation
class LinkedQueue {
    count;
    head;
    tail;
    constructor() {
        this.count = 0;
        this.head = null;
        this.tail = null;
    }

    enqueue(element) {
        let temp = new Node(element);

        if(this.isEmpty()) {
            this.head = temp;
        } else {
            this.tail.next = temp;
        }
        this.tail = temp;
        this.count++;
    }

    dequeue() {
        if(this.isEmpty()) {
            throw 'The queue is empty';
        }

        let result = this.head.data;

        this.head = this.head.next;
        this.count--;

        if(this.isEmpty()) {
            this.tail = null;
        }
        return result;
    }

    isEmpty() {
        return this.count == 0;
    }

    toString() {
        let result = "Queue: ";

        for(let p = this.head; p != null; p = p.next) {
            result += p.data + " ";
        }

        return result;
    }
}

class LinkedStack {
    count;
    top;

    constructor() {
        this.count = 0;
        this.top = null;
    }

    push(element) {
        let temp = new Node(element);

        temp.next = this.top;
        this.top = temp;
        this.count++;
    }

    pop() {
        if(this.isEmpty()) {
            throw 'The stack is empty';
        }

        let result = this.top.data;

        this.top = this.top.next;
        this.count--;

        return result;
    }

    peek() {
        if(this.isEmpty()) {
            throw 'The stack is empty';
        }
        return this.top.data;
    }

    isEmpty() {
        return this.count == 0;
    }

    toString() {
        let result = "Stack: ";

        for(let p = this.top; p != null; p = p.next) {
            result += p.data + " ";
        }

        return result;
    }
}

//My implementation of the shunting yard algorithm.
function calculate() {
    var lQueue = new LinkedQueue();
    var lStack = new LinkedStack();
    var userInput = removeSpaces(document.getElementById("input").value.toString().trim());

    const operators = ["^","*","/","%","+","-","="];

    if(userInput.length >= 3 && isInputValid(userInput) && lQueue.isEmpty()) {
        
        console.clear();
        
        for(let i = 0; i < userInput.length; i++) {

            console.log(userInput[i]);

            if(isOperand(userInput[i])) {

                console.log("Operand Detected.")
                console.log(userInput[i] + " Enqueued.");

                lQueue.enqueue(userInput[i]);

            } else if(isOpenParen(userInput[i])) {

                console.log("Open Paren Detected.");
                console.log(userInput[i] + " Pushed.");

                lStack.push(userInput[i]);

            } else if(isClosedParen(userInput[i])) {

                console.log("Closed Paren Detected");

                while(!isOpenParen(lStack.peek())) {

                    console.log("Iteration.");
                    console.log(lStack.peek() + " Enqueued.");
                    console.log("Stack Popped.");

                    lQueue.enqueue(lStack.peek());
                    lStack.pop();
                }
                console.log("Stack Popped.");
                lStack.pop();

            } else if(isOperator(userInput[i])) {

                console.log("Operator Detected.");

                if(lStack.isEmpty() || isOpenParen(lStack.peek())) {

                    console.log("Stack is Empty / Open Paren on Peek");
                    console.log(userInput[i] + " Pushed.");

                    lStack.push(userInput[i]);
                    
                } else {

                    console.log("Operator Processing.");

                    operatorProcessing(userInput[i]);
                }
            }
            console.log(lStack.toString());
            console.log(lQueue.toString());
            console.log(" ");
        }
        enqueueStack();
        show();

    } else {
        errorMessage();
    }
    
    function operatorProcessing(text) {

        if(comparePrecedence(text, lStack.peek()) > 0 ||
          (comparePrecedence(text, lStack.peek()) == 0 && isRightAssociativity(text))) {

            if(comparePrecedence(text, lStack.peek()) > 0){
                console.log(text + " > " + lStack.peek());
            } else {
                console.log(text + " == " + lStack.peek() + " and " + text + " is right-left");
            }
            console.log(text + " Pushed.");

            lStack.push(text);

        } else if(comparePrecedence(text, lStack.peek()) < 0 ||
                 (comparePrecedence(text, lStack.peek()) == 0 && !isRightAssociativity(text))) {

                    if(comparePrecedence(text, lStack.peek()) > 0){
                        console.log(text + " < " + lStack.peek());
                    } else {
                        console.log(text + " == " + lStack.peek() + " and " + text + " is left-right");
                    }

              while(!lStack.isEmpty() && (comparePrecedence(text, lStack.peek()) < 0 ||
                   (comparePrecedence(text, lStack.peek()) == 0 && !isRightAssociativity(text)))) {

                  if(lStack.peek() != null) {

                    console.log("Iteration.");
                    if(comparePrecedence(text, lStack.peek()) > 0){
                        console.log(text + " < " + lStack.peek());
                    } else {
                        console.log(text + " == " + lStack.peek() + " and " + text + " is left-right");
                    }
                    console.log(lStack.peek() + " Enqueued.");
                    console.log("Stack Popped.");

                    lQueue.enqueue(lStack.peek());
                    lStack.pop();
                  }
              }
              console.log(text + " Pushed.");

              lStack.push(text);
          }
    }
    function enqueueStack() {

        while(!lStack.isEmpty()) {
            lQueue.enqueue(lStack.peek());
            lStack.pop();
        }
    }
    function show() {
        var output = "";

        while(!lQueue.isEmpty()) {
            output += lQueue.dequeue() + " ";
        }

        document.getElementById("output").innerHTML = output;
    }

    function removeSpaces(input) {
        var nIn = "";
        if(typeof input === "string") {
            nIn = input.split(" ").join("");
        }

        return nIn;
    }

    function isOperand(text) {
        return !isNaN(text) || (text.toUpperCase() != text.toLowerCase());
    }

    function isOperator(text) {
        for(let i = 0; i < operators.length; i++) {
            if(text == operators[i]) {
                return true;
            }
        }
        return false;
    }

    function isOpenParen(text) {
        return text == "(";
    }

    function isClosedParen(text) {
        return text == ")";
    }
    function isParen(text) {
        return isOpenParen(text) || isClosedParen(text);
    }

    function isInputValid(input) {
        let parenCount = 0;
        let operandCount = 0;
        let operatorCount = 0;

        for(let i = 0; i < input.length; i++) {
            if(isParen(input[i])) {
                parenCount++;
            }
            if(isOperand(input[i])) {
                operandCount++;
            }
            if(isOperator(input[i])) {
                operatorCount++;
            }
        }

        //boolean flag
        var isContentValid = parenCount % 2 == 0 &&
                             operandCount > 0 &&
                             operatorCount > 0 &&
                             operandCount > operatorCount;

        if(isContentValid) {

            for(let i = 0; i < input.length - 1; i++) {

                //boolean flags
                let isOpenParenAndNext = isOpenParen(input[i]) &&
                                        (isOpenParen(input[i+1]) || isOperand(input[i+1]));

                let isClosedParenAndNext = isClosedParen(input[i]) &&
                                          (isClosedParen(input[i+1]) || isOperator(input[i+1]));

                let isOperandAndNext = isOperand(input[i]) &&
                                      (isOperator(input[i+1]) || isOpenParen(input[i+1]) || isClosedParen(input[i+1]));

                let isOperatorAndNext = isOperator(input[i]) &&
                                       (isOperand(input[i+1]) || isOpenParen(input[i+1]));

                if(!(isOpenParenAndNext || isClosedParenAndNext || isOperandAndNext || isOperatorAndNext)) {
                    return false; 
                }
            }
            return true;
        }
        return false;
    }

    function errorMessage() {
        let result = "There was an error with your input: <br>";

        if(userInput.length < 3) {
            result += "---Input too short.<br>";
        }
        if(!isInputValid(userInput)) {
            result += "---Input invalid.<br>";
        }

        document.getElementById("output").innerHTML = result;

        alert("Please retype your input.");
        document.getElementById("input").select();
        document.getElementById("input").focus();
    }

    function comparePrecedence(op1, op2) {

        if(precedence(op1) > precedence(op2)) {
            return 1;
        }
        if(precedence(op1) == precedence(op2)) {
            return 0;
        }
        return -1;
    }

    function precedence(op) {

        switch(op) {
            case "^":
                return 4;
            case "*":
            case "/":
            case "%":
                return 3;
            case "+":
            case "-":
                return 2;
            case "=":
                return 1;
            default:
                return 0;
        }
    }

    function isRightAssociativity(op) {

        switch(op) {
            case "^":
            case "=":
                return true;
            default:
                return false;
        }
    }
}