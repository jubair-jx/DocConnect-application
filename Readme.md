# JavaScript Interview Questions

Welcome to our JavaScript interview questions repository! Here, you'll find a collection of common JavaScript interview questions along with their answers and examples.

## Question 1: What is a closure in JavaScript?

### Answer:

A closure is a function bundled together with its lexical environment (the scope chain) at the time of its creation. It allows the function to retain access to variables from its containing scope even after that scope has finished executing.

### Example:

```javascript
function outerFunction() {
  let outerVariable = "I am from the outer function";

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closureExample = outerFunction();
closureExample(); // Output: I am from the outer function
```
