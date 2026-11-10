// console.log("Hello World");

// console.log(process);

// console.log(process.argv);

// console.log(global);



// console.log(typeof Array);
// console.log(typeof Object);
// console.log(typeof Function);



// console.log(window); 
// console.log(global);



// Basic Math Equation //

// let a = 20
// let b = 52
// console.log(a-b);

// let f = 10
// let g = 10
// console.log(f*g);

// let t = 4 
// let q = 8 
// console.log(t/q);



// Basic Calculator //

// const args = process.argv.slice(2);
// const num1 = parseFloat(args[0]);
// const operation = args[1];
// const num2 = parseFloat(args[2]);


// let result;


// if (operation === '+') {
// result = num1 + num2;
// } else if (operation === '-') {
// result = num1 - num2;
// } else if (operation === '*') {
// result = num1 * num2;
// } else if (operation === 'div') {
// result = num1 / num2;
// } else {
// console.log("Invalid operation!");
// process.exit(1);
// }


// console.log(`${num1} ${operation} ${num2} = ${result}`);



// Name Greeter //

// const args = process.argv.slice(2);
// const name = args[0] || "Guest";
// const age = args[1];
// console.log(`Hello, ${name}!`);
// if (age) {
// console.log(`You are ${age} years old.`);
// const yearBorn = new Date().getFullYear() - parseInt(age);
// console.log(`You were born around ${yearBorn}.`);
// }