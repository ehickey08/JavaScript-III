/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. window/global binding where 'this' is used in the global scope and refers to the window/console object
* 2. new binding: 'this' will refer to the instance of the object created by the constructor
* 3.  implicit binding: object.function causes 'this' to point towards the object
* 4. explicit binding: when the user uses .call, .apply. or.bind to tell the function what object to use as 'this'
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding

console.log(this); //window binding

function Dog (greeting, name) {
    this.greeting = greeting;
    this.name = name;
    this.speak = function() {
        return (`${this.greeting}, my name is ${this.name}`)
    }
};

// Principle 3

// code example for New Binding
const pet = new Dog('Woof', 'Ivy');
console.log(pet.speak()); //new binding

// Principle 2

// code example for Implicit Binding

// Principle 4

// code example for Explicit Binding
function sayHello (greeting) {
    return (`${greeting} my name is ${this.name}`);
}

const animal = {
    name: "Ivy",
    intro: sayHello
}

const human = {
    name: "Ethan",
    intro: sayHello
}

console.log(human.intro('Hello')); //implicit - sayHello uses human as this
console.log(animal.intro('Woof')) ; //implicit - sayHello uses animal as this

let explicitBinding = sayHello.bind({name: 'Lucy'}, 'Meow');
console.log(explicitBinding()); //explicit - tell the function to bind the inline object to the greeting


