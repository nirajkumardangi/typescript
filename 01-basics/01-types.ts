// 1. string — for text
let firstName: string = "John";
let greeting: string = `Hello, ${firstName}`;

// 2. number — for all numbers (integer, float, negative — all are 'number')
let age: number = 25;
let price: number = 99.99;
let negative: number = -10;

// 3. boolean — true or false only
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// 4. null — intentionally empty
let emptyValue: null = null;

// 5. undefined — declared but not assigned
let notAssigned: undefined = undefined;

// 6. bigint — for very large numbers
let bigNumber: bigint = 9007199254740991n;

// 7. symbol — unique identifiers (rarely used in MERN)
let uniqueId: symbol = Symbol("id");

// 8. any - Opt out of type checking (avoid using!)
let data: any = "hello";
data = 42; // ✅ No error (defeats TypeScript purpose)
data = true; // ✅ No error

// 9. unknown - Safer than any (must check type before using)
let value: unknown = "hello";
// value.toUpperCase();  // ❌ Error! Must check type first
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe!
}

// 10. void - Function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement
}

// 11. never - Function never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}
