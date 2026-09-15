//==> Basic Function with Types:

// Parameter types + return type
function add(a: number, b: number): number {
   return a + b;
}

add(5, 10); // Returns 15
add("5", 10); // ERROR: string is not assignable to number

//==> Arrow Functions:
const multiply = (a: number, b: number): number => {
   return a * b;
};

// Short form (implicit return)
const square = (n: number): number => n * n;

//==> Optional Parameters: Use ? after the parameter name. Optional params must come AFTER required ones.

function greet(name: string, greeting?: string): string {
   if (greeting) {
      return `${greeting}, ${name}!`;
   }
   return `Hello, ${name}!`;
}

greet("Alice"); // "Hello, Alice!"
greet("Alice", "Good morning"); // "Good morning, Alice!"

//==> Default Parameters:
function createUser(name: string, role: string = "user"): string {
   return `${name} is a ${role}`;
}

createUser("Alice"); // "Alice is a user"
createUser("Bob", "admin"); // "Bob is a admin"

//==> Rest Parameters:
function sum(...numbers: number[]): number {
   return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4, 5, "2"); // 15

//==> Function Type (Storing functions in variables):
// Define what shape of function a variable can hold
let mathOperation: (a: number, b: number) => number;

mathOperation = (x, y) => x + y; // ✅
mathOperation = (x, y) => x * y; // ✅
mathOperation = (x) => x.toString(); // ❌ ERROR: return type should be number

let calc: (a: number, b: number) => number;

//==> Callback Functions:
function processData(data: string, callback: (result: string) => void): void {
   const processed = data.toUpperCase();
   callback(processed);
}

processData("hello", (result) => {
   console.log(result); // "HELLO"
});

//==> Functions that Never Return:

// void — function that doesn't return anything
function logMessage(msg: string): void {
   console.log(msg);
   // no return statement
}

// never — function that NEVER completes (throws error or infinite loop)
function throwError(message: string): never {
   throw new Error(message);
}
