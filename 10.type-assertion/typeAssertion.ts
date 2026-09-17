// Type assertion is when you tell TypeScript "I know more about this type than you do." It's your way of overriding TypeScript's type inference.

// Syntax:
// Syntax 1: using 'as' keyword (RECOMMENDED)
let someValue: unknown = "Hello, World!";
let strLength: number = (someValue as string).length;

// Syntax 2: using angle brackets (does NOT work in React/JSX files)
let strLength2: number = (<string>someValue).length;



// COMMON USE CASES:

//==> 1. DOM Elements:

// TypeScript doesn't know what type of element getElementById returns
// It could be any HTMLElement or null

// Without assertion — TypeScript thinks it might be null
const inputElement = document.getElementById("username");

// inputElement.value // ERROR: Object is possibly 'null', and 'value' doesn't exist on HTMLElement

// With assertion — you tell TypeScript what it is
const inputElement2 = document.getElementById("username") as HTMLInputElement;
console.log(inputElement2.value); // Now TypeScript knows it's an input element



//==> 2. API Responses:
interface User {
  id: number;
  name: string;
  email: string;
}

// fetch returns 'any' by default from .json()
async function getUser(): Promise<User> {
  const response = await fetch("/api/user");
  const data = (await response.json()) as User; // Assert the response shape
  return data;
}



//==> 3. Non-null Assertion (!): When you're SURE something is not null or undefined:

// The ! at the end tells TypeScript: "I promise this is NOT null"
const element = document.getElementById("app")!;
// Without !, TypeScript says: element could be null
// With !, you tell TypeScript: trust me, it exists



//==> Warning: Type assertions can be dangerous if you're wrong:

let value: unknown = "hello";
let num = value as number; // TypeScript won't complain
console.log(num.toFixed(2)); // RUNTIME ERROR! "hello" is not a number

// Rule: Only use type assertions when you genuinely know more than TypeScript. Don't use them to silence errors.
