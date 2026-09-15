# 📘 TypeScript Complete Notes for MERN Developers

---

## 📑 Table of Contents (Index)

1. [What is TypeScript?](#1-what-is-typescript)
2. [Why TypeScript for MERN Developers?](#2-why-typescript-for-mern-developers)
3. [Setting Up TypeScript](#3-setting-up-typescript)
4. [Basic Types](#4-basic-types)
5. [Type Inference](#5-type-inference)
6. [Type Annotation](#6-type-annotation)
7. [Arrays and Tuples](#7-arrays-and-tuples)
8. [Objects in TypeScript](#8-objects-in-typescript)
9. [Functions in TypeScript](#9-functions-in-typescript)
10. [Union and Intersection Types](#10-union-and-intersection-types)
11. [Type Aliases](#11-type-aliases)
12. [Interfaces](#12-interfaces)
13. [Type Aliases vs Interfaces](#13-type-aliases-vs-interfaces)
14. [Literal Types](#14-literal-types)
15. [Enums](#15-enums)
16. [Type Assertion (Type Casting)](#16-type-assertion-type-casting)
17. [Narrowing (Type Guards)](#17-narrowing-type-guards)
18. [Optional and Default Properties](#18-optional-and-default-properties)
19. [The `any`, `unknown`, `never`, and `void` Types](#19-the-any-unknown-never-and-void-types)
20. [Generics](#20-generics)
21. [Utility Types](#21-utility-types)
22. [Classes in TypeScript](#22-classes-in-typescript)
23. [Modules and Imports/Exports](#23-modules-and-importsexports)
24. [TypeScript with React (Frontend)](#24-typescript-with-react-frontend)
25. [TypeScript with Node.js and Express (Backend)](#25-typescript-with-nodejs-and-express-backend)
26. [TypeScript with MongoDB/Mongoose](#26-typescript-with-mongodbmongoose)
27. [Declaration Files and @types](#27-declaration-files-and-types)
28. [tsconfig.json Explained](#28-tsconfigjson-explained)
29. [Common Mistakes and Tips](#29-common-mistakes-and-tips)
30. [Cheat Sheet](#30-cheat-sheet)

---

## 1. What is TypeScript?

### Theory

TypeScript is a **superset of JavaScript**. This means every valid JavaScript code is also valid TypeScript code, but TypeScript adds **extra features** on top of JavaScript.

The biggest feature TypeScript adds is **static typing**. In JavaScript, you can put any type of value in any variable. This is flexible, but it causes many bugs. TypeScript lets you **define what type of data** a variable should hold.

**Think of it like this:**
- JavaScript = A road with no traffic rules. Fast, but accidents happen.
- TypeScript = Same road, but now with traffic signals and lanes. Slightly more effort, but much safer.

TypeScript was created by **Microsoft** in 2012. It **compiles** (converts) to plain JavaScript before running, because browsers and Node.js only understand JavaScript.

### How it works:

```
You write: .ts file (TypeScript)
        ↓
Compiler converts it (tsc command)
        ↓
Output: .js file (JavaScript)
        ↓
Browser/Node.js runs the .js file
```

### Key Points:
- TypeScript = JavaScript + Types
- It catches errors **before** you run the code (at compile time)
- It does NOT run in the browser directly — it compiles to JavaScript first
- It makes your code more **readable**, **predictable**, and **maintainable**

---

## 2. Why TypeScript for MERN Developers?

### Theory

As a MERN developer (MongoDB, Express, React, Node.js), you are writing JavaScript everywhere — frontend and backend. Here's why TypeScript helps:

| Problem in JavaScript | TypeScript Solution |
|---|---|
| You pass wrong data to a function and find out only at runtime | TypeScript shows the error in your editor before running |
| You forget what shape an API response has | You define an interface, so you always know the shape |
| Team members don't know what a function expects | Types serve as documentation |
| Renaming a property? You miss some places | TypeScript highlights all the places that break |
| Autocomplete is weak | TypeScript gives amazing autocomplete in VS Code |

### Real-world Example:

In plain JavaScript:
```javascript
// You think user.name exists, but maybe the API sends user.username
function greet(user) {
  return "Hello " + user.name; // No error shown. Bug happens at runtime.
}
```

In TypeScript:
```typescript
interface User {
  username: string;
  email: string;
}

function greet(user: User) {
  return "Hello " + user.name; // ❌ ERROR! Property 'name' does not exist on type 'User'
}
```

TypeScript caught the bug **before** you even ran the code!

---

## 3. Setting Up TypeScript

### Installing TypeScript

```bash
# Install globally (available everywhere)
npm install -g typescript

# Check version
tsc --version

# OR install in a project (recommended)
npm init -y
npm install --save-dev typescript
```

### Compiling TypeScript

```bash
# Create a file called index.ts
# Then compile it:
tsc index.ts
# This creates index.js

# Run the JavaScript file:
node index.js
```

### Initialize a TypeScript Project

```bash
# Creates a tsconfig.json file with default settings
tsc --init
```

### Quick Setup with ts-node (Run .ts directly)

```bash
npm install --save-dev ts-node
# Now you can run TypeScript directly without manual compiling:
npx ts-node index.ts
```

### Project Structure Example:

```
my-project/
├── src/
│   ├── index.ts
│   └── utils.ts
├── dist/           ← compiled JS goes here
├── package.json
└── tsconfig.json
```

---

## 4. Basic Types

### Theory

Types tell TypeScript **what kind of value** a variable can hold. JavaScript has types too (string, number, boolean, etc.), but it doesn't **enforce** them. TypeScript enforces them.

### The Primitive Types:

```typescript
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
```

### Important Notes:
- In TypeScript, `number` covers integers, floats, hex, octal — everything. There's no separate `int` or `float`.
- `string` can use single quotes `' '`, double quotes `" "`, or backticks `` ` ` `` (template literals).
- `null` and `undefined` are their own types in TypeScript.

### What happens when you assign the wrong type?

```typescript
let age: number = 25;
age = "twenty five"; // ❌ ERROR: Type 'string' is not assignable to type 'number'
```

This is the whole point of TypeScript — catching mistakes like this!

---

## 5. Type Inference

### Theory

Type inference means TypeScript **automatically guesses the type** of a variable based on the value you assign to it. You don't always need to write the type manually.

TypeScript is smart. When you write `let x = 10`, TypeScript knows `x` is a `number` without you saying so.

```typescript
// You DON'T write the type, but TypeScript figures it out:
let city = "Mumbai";        // TypeScript infers: string
let count = 42;             // TypeScript infers: number
let isActive = true;        // TypeScript infers: boolean

// Now if you try to change the type, it will still show an error:
city = 100; // ❌ ERROR: Type 'number' is not assignable to type 'string'
```

### When does inference work?
- When you **initialize** a variable with a value
- When a function **returns** a value
- When you use **default parameter** values

### When should you write types manually?
- When there's no initial value
- When the inferred type is too broad (like `any`)
- When you want to be explicit for readability

```typescript
// No initial value — you MUST write the type
let username: string;
username = "john_doe";

// With initial value — inference works fine, type annotation is optional
let score = 100; // TypeScript knows it's a number
```

### Best Practice:
> Let TypeScript infer when it can. Write types manually when it helps clarity or when inference can't work.

---

## 6. Type Annotation

### Theory

Type annotation means **you explicitly tell TypeScript** what type a variable, parameter, or return value should have. You write the type after a colon `:`.

This is the opposite of inference — here YOU tell TypeScript what to expect.

```typescript
// Syntax: let variableName: type = value;

let movieName: string = "Inception";
let releaseYear: number = 2010;
let isBlockbuster: boolean = true;
```

### Annotation on Function Parameters and Return:

```typescript
// Parameters: name is string, age is number
// Return type: string (after the parentheses)
function introduce(name: string, age: number): string {
  return `I am ${name}, and I am ${age} years old.`;
}

introduce("Alice", 30);    // ✅ Works
introduce("Alice", "30");  // ❌ ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Annotation on Variables Declared Without a Value:

```typescript
let email: string;       // declared, not initialized
email = "a@b.com";       // ✅ works
email = 123;             // ❌ ERROR
```

### When to use annotations:
| Situation | Use Annotation? |
|---|---|
| Variable with an initial value | Optional (inference works) |
| Variable without initial value | ✅ Yes, required |
| Function parameters | ✅ Yes, always recommended |
| Function return types | Recommended (but inference works) |
| Complex objects | ✅ Yes, use interfaces/types |

---

## 7. Arrays and Tuples

### Arrays

#### Theory

Arrays in TypeScript work the same as JavaScript arrays, but you can specify **what type of elements** the array should hold. This prevents you from accidentally adding wrong types.

```typescript
// Syntax 1: type[]
let fruits: string[] = ["apple", "banana", "mango"];
let scores: number[] = [10, 20, 30];
let flags: boolean[] = [true, false, true];

// Syntax 2: Array<type> (Generic syntax — same result)
let cities: Array<string> = ["Delhi", "Mumbai", "Pune"];
let prices: Array<number> = [100, 200, 300];

// Adding elements
fruits.push("orange");    // ✅ Works
fruits.push(42);          // ❌ ERROR: number is not assignable to string

// Mixed type array (using union — covered later)
let mixed: (string | number)[] = ["hello", 42, "world", 100];
```

### Tuples

#### Theory

A tuple is a **fixed-length array** where **each position has a specific type**. Regular arrays can have any number of elements of the same type. Tuples are strict about both the **number of elements** and the **type at each position**.

Think of a tuple like a row in a database table — each column has a specific type.

```typescript
// Tuple: exactly 2 elements — first is string, second is number
let user: [string, number] = ["Alice", 25];

// ✅ Correct
user = ["Bob", 30];

// ❌ ERROR: wrong order
user = [30, "Bob"];

// ❌ ERROR: wrong number of elements
user = ["Charlie"];

// Accessing tuple elements
console.log(user[0]); // "Alice" — TypeScript knows this is a string
console.log(user[1]); // 25 — TypeScript knows this is a number

// Practical Example: function that returns multiple values
function getUser(): [string, number] {
  return ["Alice", 25];
}

const [name, age] = getUser(); // Destructuring works!
```

### Tuple with Optional Elements:

```typescript
let data: [string, number, boolean?] = ["hello", 42];
// The third element (boolean) is optional
```

### Read-only Tuple:

```typescript
const point: readonly [number, number] = [10, 20];
// point[0] = 30; // ❌ ERROR: Cannot assign to '0' because it is a read-only property
```

---

## 8. Objects in TypeScript

### Theory

In JavaScript, objects are everywhere. In TypeScript, you can define the **shape** (structure) of an object — what properties it should have and what types those properties should be.

This is incredibly useful in MERN development because your API data, database documents, and component props are all objects.

### Basic Object Typing:

```typescript
// Inline type annotation
let user: { name: string; age: number; isAdmin: boolean } = {
  name: "Alice",
  age: 25,
  isAdmin: false,
};

// Accessing properties
console.log(user.name); // ✅ "Alice"
console.log(user.salary); // ❌ ERROR: Property 'salary' does not exist
```

### Optional Properties:

Sometimes a property may or may not exist. Use `?` to mark it optional.

```typescript
let product: { 
  name: string; 
  price: number; 
  discount?: number;  // optional — may or may not be there
} = {
  name: "Laptop",
  price: 50000,
  // discount is not provided — that's fine because it's optional
};
```

### Readonly Properties:

Properties that should never be changed after creation.

```typescript
let config: { 
  readonly apiUrl: string; 
  readonly port: number;
} = {
  apiUrl: "https://api.example.com",
  port: 3000,
};

// config.apiUrl = "https://other.com"; // ❌ ERROR: Cannot assign to 'apiUrl' because it is read-only
```

### Nested Objects:

```typescript
let order: {
  id: number;
  product: {
    name: string;
    price: number;
  };
  customer: {
    name: string;
    email: string;
  };
} = {
  id: 1,
  product: { name: "Phone", price: 30000 },
  customer: { name: "Bob", email: "bob@mail.com" },
};
```

> **Note:** For complex objects, use **Interfaces** or **Type Aliases** (covered next) instead of inline types. Inline types get messy for large objects.

### Index Signatures (Dynamic Keys):

When you don't know the exact property names ahead of time:

```typescript
let dictionary: { [key: string]: string } = {};
dictionary["hello"] = "नमस्ते";
dictionary["bye"] = "अलविदा";
dictionary["count"] = 42; // ❌ ERROR: number not assignable to string
```

---

## 9. Functions in TypeScript

### Theory

Functions are the building blocks of any MERN application. TypeScript lets you define types for:
1. **Parameters** — what goes IN
2. **Return value** — what comes OUT

This makes functions much more predictable and safe.

### Basic Function with Types:

```typescript
// Parameter types + return type
function add(a: number, b: number): number {
  return a + b;
}

add(5, 10);       // ✅ Returns 15
add("5", 10);     // ❌ ERROR: string is not assignable to number
```

### Arrow Functions:

```typescript
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Short form (implicit return)
const square = (n: number): number => n * n;
```

### Optional Parameters:

Use `?` after the parameter name. Optional params must come AFTER required ones.

```typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

greet("Alice");              // ✅ "Hello, Alice!"
greet("Alice", "Good morning"); // ✅ "Good morning, Alice!"
```

### Default Parameters:

```typescript
function createUser(name: string, role: string = "user"): string {
  return `${name} is a ${role}`;
}

createUser("Alice");           // ✅ "Alice is a user"
createUser("Bob", "admin");    // ✅ "Bob is a admin"
```

### Rest Parameters:

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4, 5); // ✅ 15
```

### Function Type (Storing functions in variables):

```typescript
// Define what shape of function a variable can hold
let mathOperation: (a: number, b: number) => number;

mathOperation = (x, y) => x + y;    // ✅
mathOperation = (x, y) => x * y;    // ✅
mathOperation = (x) => x.toString(); // ❌ ERROR: return type should be number
```

### Callback Functions:

```typescript
function processData(data: string, callback: (result: string) => void): void {
  const processed = data.toUpperCase();
  callback(processed);
}

processData("hello", (result) => {
  console.log(result); // "HELLO"
});
```

### Functions that Never Return:

```typescript
// void — function that doesn't return anything
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement
}

// never — function that NEVER completes (throws error or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}
```

---

## 10. Union and Intersection Types

### Union Types (`|`)

#### Theory

A union type means a variable can hold **one of multiple types**. You use the pipe symbol `|` to separate the types. Think of it as "this OR that."

This is very common in real-world code. For example, an ID could be a string or a number.

```typescript
// id can be string OR number
let id: string | number;
id = "abc123";  // ✅
id = 42;        // ✅
id = true;      // ❌ ERROR: boolean is not assignable to string | number

// Function that accepts union type
function printId(id: string | number): void {
  console.log(`Your ID is: ${id}`);
}

printId(101);      // ✅
printId("abc123"); // ✅
```

### Narrowing with Union Types:

When you have a union type, you need to **narrow** (check) the type before using type-specific methods.

```typescript
function formatId(id: string | number): string {
  if (typeof id === "string") {
    // TypeScript now KNOWS id is a string here
    return id.toUpperCase();
  } else {
    // TypeScript now KNOWS id is a number here
    return id.toFixed(2);
  }
}

formatId("abc");  // "ABC"
formatId(42);     // "42.00"
```

### Intersection Types (`&`)

#### Theory

An intersection type **combines multiple types into one**. The result must have ALL the properties of ALL the combined types. Think of it as "this AND that."

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  company: string;
  role: string;
};

// Intersection: must have ALL properties from BOTH types
type WorkingPerson = Person & Employee;

const worker: WorkingPerson = {
  name: "Alice",
  age: 30,
  company: "Google",
  role: "Developer",
};

// Missing any property would cause an error:
// const worker2: WorkingPerson = { name: "Bob", age: 25 }; // ❌ Missing company and role
```

### Union vs Intersection — Simple Analogy:
- **Union (`|`)** = You can be a **cat OR a dog** (either one)
- **Intersection (`&`)** = You must be a **cat AND a dog** (you need everything from both)

---

## 11. Type Aliases

### Theory

A type alias is a **custom name for a type**. Instead of writing long, complex types inline, you create a reusable name for them. It's like creating a variable, but for types.

Use the `type` keyword to create type aliases.

```typescript
// Without type alias (messy for complex types)
let user1: { name: string; age: number; email: string } = {
  name: "Alice", age: 25, email: "alice@mail.com"
};
let user2: { name: string; age: number; email: string } = {
  name: "Bob", age: 30, email: "bob@mail.com"
};
// You're repeating the same type definition!

// With type alias (clean and reusable)
type User = {
  name: string;
  age: number;
  email: string;
};

let user3: User = { name: "Alice", age: 25, email: "alice@mail.com" };
let user4: User = { name: "Bob", age: 30, email: "bob@mail.com" };
```

### Type Aliases for Primitives and Unions:

```typescript
type ID = string | number;
type Status = "active" | "inactive" | "banned";
type Coordinate = [number, number]; // Tuple

let userId: ID = "abc123";
let userStatus: Status = "active";
let location: Coordinate = [28.6139, 77.2090];
```

### Type Aliases for Functions:

```typescript
type MathFunction = (a: number, b: number) => number;

const add: MathFunction = (a, b) => a + b;
const subtract: MathFunction = (a, b) => a - b;
```

### Type Aliases with Generics (Preview — covered in detail later):

```typescript
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

const userResponse: ApiResponse<User> = {
  success: true,
  data: { name: "Alice", age: 25, email: "alice@mail.com" },
  message: "User fetched successfully",
};
```

---

## 12. Interfaces

### Theory

An interface is another way to **define the shape of an object** in TypeScript. It looks very similar to a type alias, but it uses the `interface` keyword and has some special features.

Interfaces are mainly used for **objects** and **classes**.

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Alice",
  age: 25,
  email: "alice@mail.com",
};
```

### Optional and Readonly in Interfaces:

```typescript
interface Product {
  readonly id: number;       // Can't be changed after creation
  name: string;
  price: number;
  discount?: number;         // Optional
}

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 200000,
};

// laptop.id = 2; // ❌ ERROR: Cannot assign to 'id' because it is read-only
```

### Extending Interfaces (Inheritance):

One interface can **extend** (inherit from) another. This is like saying "this interface has everything the other one has, plus more."

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  company: string;
  salary: number;
}

// Employee now has: name, age, company, salary
const emp: Employee = {
  name: "Alice",
  age: 30,
  company: "Google",
  salary: 100000,
};
```

### Extending Multiple Interfaces:

```typescript
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

interface Document extends Printable, Loggable {
  title: string;
}
```

### Declaration Merging (Unique to Interfaces):

If you declare the same interface twice, TypeScript **merges** them automatically. This is special — type aliases can't do this.

```typescript
interface Car {
  brand: string;
}

interface Car {
  model: string;
}

// Now Car has BOTH brand and model
const myCar: Car = {
  brand: "Toyota",
  model: "Camry",
};
```

### Interface for Functions:

```typescript
interface SearchFunction {
  (query: string, limit: number): string[];
}

const search: SearchFunction = (query, limit) => {
  return [`Result for "${query}"`, `Limit: ${limit}`];
};
```

---

## 13. Type Aliases vs Interfaces

### Theory

This is one of the most confusing topics for beginners. Both `type` and `interface` can define the shape of objects. Here's a clear comparison:

| Feature | Type Alias | Interface |
|---|---|---|
| Define object shape | ✅ Yes | ✅ Yes |
| Define primitives, unions, tuples | ✅ Yes | ❌ No |
| Extend/Inherit | ✅ Using `&` (intersection) | ✅ Using `extends` |
| Declaration merging | ❌ No | ✅ Yes |
| Use with classes (`implements`) | ✅ Yes | ✅ Yes |
| Computed properties | ✅ Yes | ❌ No |

### Examples:

```typescript
// Things ONLY type can do:
type ID = string | number;                    // Union — interface can't do this
type Coords = [number, number];              // Tuple — interface can't do this
type StringOrNumber = string | number;       // Primitive union

// Things ONLY interface can do:
interface User {
  name: string;
}
interface User {               // Declaration merging — type can't do this
  age: number;
}
// User now has both name and age

// Both can define object shapes:
type UserType = { name: string; age: number };
interface UserInterface { name: string; age: number }
```

### Which one should you use?

> **Rule of thumb:**
> - Use **`interface`** for defining object shapes and class contracts (most common in MERN)
> - Use **`type`** for unions, tuples, and complex type compositions
> - If you're not sure, use `interface` for objects and `type` for everything else

---

## 14. Literal Types

### Theory

Literal types let you specify **exact values** a variable can hold, not just general types like `string` or `number`. Instead of "any string," you say "only these specific strings."

This is extremely useful for things like status values, directions, roles, etc.

```typescript
// Regular type — any string is allowed
let color: string = "anything goes here";

// Literal type — ONLY these specific values are allowed
let direction: "up" | "down" | "left" | "right";
direction = "up";    // ✅
direction = "down";  // ✅
direction = "diagonal"; // ❌ ERROR: not one of the allowed values

// Number literals
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3;  // ✅
diceRoll = 7;  // ❌ ERROR

// Boolean literal (less common but possible)
let alwaysTrue: true = true;
// alwaysTrue = false; // ❌ ERROR
```

### Literal Types with Type Aliases:

```typescript
type Theme = "light" | "dark" | "system";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Role = "admin" | "user" | "moderator";

let currentTheme: Theme = "dark";    // ✅
let method: HttpMethod = "GET";       // ✅
let userRole: Role = "superadmin";    // ❌ ERROR
```

### Practical Example — API Status:

```typescript
type ApiStatus = "loading" | "success" | "error";

function handleResponse(status: ApiStatus): string {
  switch (status) {
    case "loading":
      return "Please wait...";
    case "success":
      return "Data loaded!";
    case "error":
      return "Something went wrong!";
  }
}
```

### `as const` for Literal Inference:

```typescript
// Without 'as const' — TypeScript infers "string"
let method = "GET";  // type: string

// With 'as const' — TypeScript infers the literal "GET"
let method2 = "GET" as const;  // type: "GET"

// Useful with objects:
const config = {
  url: "/api/users",
  method: "GET",
} as const;
// config.method is type "GET", not just string
// config.url is type "/api/users", not just string
```

---

## 15. Enums

### Theory

Enums (short for "enumerations") let you define a **set of named constants**. They're similar to literal types but with some extra features. Enums give **readable names** to sets of numeric or string values.

### Numeric Enums:

By default, enum values start at 0 and auto-increment.

```typescript
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

let myDirection: Direction = Direction.Up;
console.log(myDirection);        // 0
console.log(Direction.Left);     // 2

// You can set custom starting number:
enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

console.log(StatusCode.NotFound); // 404
```

### String Enums:

Each value is a string. More readable and easier to debug.

```typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

let favoriteColor: Color = Color.Red;
console.log(favoriteColor); // "RED"
```

### Practical Example:

```typescript
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Moderator = "MODERATOR",
}

function checkAccess(role: UserRole): string {
  if (role === UserRole.Admin) {
    return "Full access granted";
  }
  return "Limited access";
}

checkAccess(UserRole.Admin);     // ✅ "Full access granted"
checkAccess(UserRole.User);      // ✅ "Limited access"
// checkAccess("ADMIN");         // ❌ ERROR: string is not assignable to UserRole
```

### `const enum` (Better Performance):

```typescript
const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L",
}

let tshirtSize = Size.Medium; // At compile time, this becomes just "M"
// const enums are completely removed from the compiled JavaScript
```

### Enums vs Literal Types — Which to Use?

| Feature | Enum | Literal Type |
|---|---|---|
| Runtime existence | ✅ Yes (creates real JS code) | ❌ No (types only — removed at compile) |
| Reverse mapping | ✅ Yes (numeric only) | ❌ No |
| Tree-shaking (bundle size) | ❌ Can't be tree-shaken | ✅ Better for bundle size |
| Simplicity | More verbose | Simpler |

> **Modern recommendation:** Many developers prefer **literal union types** over enums for simplicity. But enums are still widely used and perfectly valid.

---

## 16. Type Assertion (Type Casting)

### Theory

Type assertion is when **you tell TypeScript** "I know more about this type than you do." It's your way of overriding TypeScript's type inference.

It does NOT change the actual data. It only tells the TypeScript compiler to treat the value as a specific type.

**Important:** Type assertions are NOT type casting like in other languages. They don't convert data — they just tell the compiler "trust me."

### Syntax:

```typescript
// Syntax 1: using 'as' keyword (RECOMMENDED)
let someValue: unknown = "Hello, World!";
let strLength: number = (someValue as string).length;

// Syntax 2: using angle brackets (does NOT work in React/JSX files)
let strLength2: number = (<string>someValue).length;
```

### Common Use Cases:

#### 1. DOM Elements:

```typescript
// TypeScript doesn't know what type of element getElementById returns
// It could be any HTMLElement or null

// Without assertion — TypeScript thinks it might be null
const inputElement = document.getElementById("username");
// inputElement.value // ❌ ERROR: Object is possibly 'null', and 'value' doesn't exist on HTMLElement

// With assertion — you tell TypeScript what it is
const inputElement2 = document.getElementById("username") as HTMLInputElement;
console.log(inputElement2.value); // ✅ Now TypeScript knows it's an input element
```

#### 2. API Responses:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// fetch returns 'any' by default from .json()
async function getUser(): Promise<User> {
  const response = await fetch("/api/user");
  const data = await response.json() as User; // Assert the response shape
  return data;
}
```

#### 3. Non-null Assertion (`!`):

When you're SURE something is not null or undefined:

```typescript
// The ! at the end tells TypeScript: "I promise this is NOT null"
const element = document.getElementById("app")!;
// Without !, TypeScript says: element could be null
// With !, you tell TypeScript: trust me, it exists
```

### ⚠️ Warning:

Type assertions can be **dangerous** if you're wrong:

```typescript
let value: unknown = "hello";
let num = value as number; // TypeScript won't complain
console.log(num.toFixed(2)); // 💥 RUNTIME ERROR! "hello" is not a number
```

> **Rule:** Only use type assertions when you genuinely know more than TypeScript. Don't use them to silence errors.

---

## 17. Narrowing (Type Guards)

### Theory

Narrowing is the process of **refining a broad type to a more specific type** within a block of code. When you have a union type (like `string | number`), you need to narrow it down before using type-specific methods.

TypeScript is smart — when you use certain checks, it automatically understands the specific type within that code block.

### typeof Narrowing:

```typescript
function processValue(value: string | number): string {
  // At this point, value could be string or number

  if (typeof value === "string") {
    // TypeScript KNOWS value is a string here
    return value.toUpperCase(); // ✅ String method works
  } else {
    // TypeScript KNOWS value is a number here
    return value.toFixed(2); // ✅ Number method works
  }
}
```

### Truthiness Narrowing:

```typescript
function printName(name: string | null | undefined): void {
  if (name) {
    // name is definitely a string here (not null, not undefined, not empty string)
    console.log(name.toUpperCase());
  } else {
    console.log("No name provided");
  }
}
```

### Equality Narrowing:

```typescript
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // The only way a === b is if both are strings
    // TypeScript narrows both to string
    console.log(a.toUpperCase());
    console.log(b.toUpperCase());
  }
}
```

### `in` Operator Narrowing:

Check if a property exists in an object.

```typescript
interface Dog {
  bark(): void;
  breed: string;
}

interface Cat {
  meow(): void;
  color: string;
}

function makeSound(animal: Dog | Cat): void {
  if ("bark" in animal) {
    // TypeScript knows it's a Dog
    animal.bark();
  } else {
    // TypeScript knows it's a Cat
    animal.meow();
  }
}
```

### `instanceof` Narrowing:

Check if something is an instance of a class.

```typescript
function formatDate(date: string | Date): string {
  if (date instanceof Date) {
    // TypeScript knows it's a Date object
    return date.toISOString();
  } else {
    // TypeScript knows it's a string
    return new Date(date).toISOString();
  }
}
```

### Custom Type Guards (Type Predicates):

You can create your own narrowing functions.

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// The return type 'animal is Fish' is a TYPE PREDICATE
function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function move(animal: Fish | Bird): void {
  if (isFish(animal)) {
    animal.swim(); // ✅ TypeScript knows it's Fish
  } else {
    animal.fly();  // ✅ TypeScript knows it's Bird
  }
}
```

### Discriminated Unions:

A powerful pattern where each type in a union has a **common property** with literal values to distinguish them.

```typescript
interface Circle {
  kind: "circle";     // discriminant property
  radius: number;
}

interface Rectangle {
  kind: "rectangle";  // discriminant property
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";   // discriminant property
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
  }
}
```

---

## 18. Optional and Default Properties

### Theory

In real-world applications, not every piece of data is always available. TypeScript provides ways to handle this gracefully.

### Optional Properties (`?`):

```typescript
interface UserProfile {
  name: string;
  email: string;
  phone?: string;         // may or may not be present
  bio?: string;           // may or may not be present
}

const user1: UserProfile = {
  name: "Alice",
  email: "alice@mail.com",
  // phone and bio are not provided — that's OK
};

const user2: UserProfile = {
  name: "Bob",
  email: "bob@mail.com",
  phone: "+91-9876543210",
  bio: "Full stack developer",
};
```

### Optional Chaining (`?.`):

Safely access nested properties that might not exist.

```typescript
interface Company {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

const company: Company = { name: "TechCorp" };

// Without optional chaining — would crash if address is undefined
// console.log(company.address.city); // 💥 Runtime Error!

// With optional chaining — returns undefined safely
console.log(company.address?.city);    // undefined (no crash)
console.log(company.address?.street);  // undefined (no crash)
```

### Nullish Coalescing (`??`):

Provide a **default value** when something is `null` or `undefined` (but NOT for `0`, `""`, or `false`).

```typescript
let userInput: string | null = null;

// Using ?? — only replaces null and undefined
let displayName = userInput ?? "Guest";  // "Guest"

// Compare with || — replaces ALL falsy values (0, "", false, null, undefined)
let count: number = 0;
console.log(count || 10);    // 10  (WRONG! 0 is valid but treated as falsy)
console.log(count ?? 10);    // 0   (CORRECT! 0 is not null/undefined)
```

### Optional Parameters in Functions:

```typescript
function createPost(title: string, body: string, tags?: string[]): void {
  console.log(`Title: ${title}`);
  console.log(`Body: ${body}`);
  if (tags) {
    console.log(`Tags: ${tags.join(", ")}`);
  }
}

createPost("Hello", "World");                      // ✅
createPost("Hello", "World", ["ts", "javascript"]); // ✅
```

---

## 19. The `any`, `unknown`, `never`, and `void` Types

### Theory

These are **special types** in TypeScript. Understanding them is crucial.

### `any` — The Escape Hatch

`any` completely **disables type checking** for that variable. It's like going back to JavaScript.

```typescript
let data: any = 42;
data = "hello";     // ✅ No error
data = true;        // ✅ No error
data = [1, 2, 3];   // ✅ No error
data.foo.bar.baz;   // ✅ No error (but will crash at runtime!)

// any is contagious — it infects other variables
let num: number = data; // ✅ No error, even if data is actually a string!
```

> **⚠️ Avoid `any` as much as possible.** It defeats the purpose of TypeScript. Use it only as a last resort when migrating from JavaScript or dealing with truly dynamic data.

### `unknown` — The Safe Version of `any`

`unknown` also accepts any value, but you **can't use it until you narrow/check its type**. It's like `any` but with safety.

```typescript
let value: unknown = "Hello";

// You CAN'T directly use it:
// value.toUpperCase(); // ❌ ERROR: Object is of type 'unknown'

// You MUST check the type first:
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Now it's safe
}

// Practical use: parsing unknown data from an API
function processData(data: unknown): void {
  if (typeof data === "string") {
    console.log(data.toUpperCase());
  } else if (typeof data === "number") {
    console.log(data.toFixed(2));
  } else {
    console.log("Unknown data type");
  }
}
```

> **Rule:** Use `unknown` instead of `any` when you don't know the type. Then narrow it.

### `void` — No Return Value

`void` means a function **does not return anything**.

```typescript
function logMessage(message: string): void {
  console.log(message);
  // No return statement (or return without a value)
}

// A function that returns void:
function showAlert(): void {
  alert("Hello!");
  return;       // ✅ OK — returning nothing
  // return 42; // ❌ ERROR: number is not assignable to void
}
```

### `never` — This Should NEVER Happen

`never` represents values that **never occur**. It's used for:
1. Functions that **always throw errors**
2. Functions with **infinite loops**
3. Exhaustive checks (making sure all cases are handled)

```typescript
// Function that always throws — it never returns
function throwError(message: string): never {
  throw new Error(message);
}

// Function with infinite loop — it never returns
function infiniteLoop(): never {
  while (true) {
    // Runs forever
  }
}

// Exhaustive checking:
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 10 * 10;
    case "square":
      return 10 * 10;
    case "triangle":
      return 0.5 * 10 * 10;
    default:
      // If someone adds a new shape but forgets to handle it here,
      // TypeScript will show an error on this line
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
```

### Summary Table:

| Type | Meaning | When to use |
|---|---|---|
| `any` | Anything, no checking | Avoid! Only for migration |
| `unknown` | Anything, but must check before using | When you don't know the type |
| `void` | Function returns nothing | For functions with no return value |
| `never` | This code should never be reached | Error functions, exhaustive checks |

---

## 20. Generics

### Theory

Generics are one of TypeScript's most **powerful features**. They let you write **reusable code that works with multiple types** while still maintaining type safety.

Think of generics like **function parameters, but for types**. Just like a function takes a value parameter, a generic takes a type parameter.

**Problem without generics:**

```typescript
// You want a function that returns what you pass in
function identity(value: number): number {
  return value;
}

function identityString(value: string): string {
  return value;
}

// You'd need a separate function for every type! 
// Or use 'any', which loses type safety:
function identityAny(value: any): any {
  return value;
}
const result = identityAny("hello"); // result is 'any' — TypeScript doesn't know it's a string
```

### Solution — Generics:

```typescript
// T is a TYPE PARAMETER — a placeholder for any type
function identity<T>(value: T): T {
  return value;
}

// When you call the function, T gets replaced with the actual type:
const num = identity<number>(42);       // T = number, result type = number
const str = identity<string>("hello");  // T = string, result type = string
const bool = identity<boolean>(true);   // T = boolean, result type = boolean

// TypeScript can also INFER the generic type:
const inferred = identity("hello");     // TypeScript knows T = string automatically
```

### Generic Functions:

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = getFirst([10, 20, 30]);        // type: number
const firstStr = getFirst(["a", "b", "c"]);     // type: string

// Multiple generic parameters
function makePair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const pair1 = makePair("name", "Alice");   // [string, string]
const pair2 = makePair("age", 25);         // [string, number]
const pair3 = makePair(1, true);           // [number, boolean]
```

### Generic Interfaces:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: Date;
}

// Use with different data types:
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Alice" },
  message: "User found",
  timestamp: new Date(),
};

const productResponse: ApiResponse<Product> = {
  success: true,
  data: { id: 1, name: "Laptop", price: 50000 },
  message: "Product found",
  timestamp: new Date(),
};

// Even arrays:
const usersResponse: ApiResponse<User[]> = {
  success: true,
  data: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
  message: "Users found",
  timestamp: new Date(),
};
```

### Generic Constraints:

Sometimes you want to **restrict** what types can be used with a generic.

```typescript
// T must have a 'length' property
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");         // ✅ Strings have .length
getLength([1, 2, 3]);       // ✅ Arrays have .length
getLength({ length: 10 });  // ✅ Object with length property
// getLength(42);           // ❌ ERROR: number doesn't have .length

// T must extend a specific interface
interface HasId {
  id: number;
}

function getById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
```

### `keyof` with Generics:

```typescript
// K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25, email: "alice@mail.com" };

getProperty(user, "name");    // ✅ returns string
getProperty(user, "age");     // ✅ returns number
// getProperty(user, "phone"); // ❌ ERROR: "phone" is not a key of user
```

### Generic Type Aliases:

```typescript
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ReadonlyArray2<T> = readonly T[];

let name: Nullable<string> = "Alice";
name = null;  // ✅

let age: Optional<number> = 25;
age = undefined; // ✅
```

---

## 21. Utility Types

### Theory

TypeScript provides built-in **utility types** that help you transform and manipulate types. These are generic types that take another type as input and produce a new type. They save you from writing common type transformations manually.

### `Partial<T>` — Makes All Properties Optional

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// All properties become optional
type PartialUser = Partial<User>;
// Equivalent to:
// { name?: string; age?: number; email?: string }

// Useful for UPDATE operations:
function updateUser(id: number, updates: Partial<User>): void {
  // You can pass just the fields you want to update
}

updateUser(1, { name: "Alice" });         // ✅ Only updating name
updateUser(1, { age: 26, email: "new" }); // ✅ Updating age and email
```

### `Required<T>` — Makes All Properties Required

```typescript
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
// All properties are now required

const config: RequiredConfig = {
  host: "localhost",
  port: 3000,
  debug: true,
  // Missing any property would cause an error
};
```

### `Readonly<T>` — Makes All Properties Read-Only

```typescript
interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = { name: "Alice", age: 25 };
// user.name = "Bob"; // ❌ ERROR: Cannot assign to 'name' because it is read-only
```

### `Pick<T, Keys>` — Select Specific Properties

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

// Only pick id, name, and email
type PublicUser = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string }

const publicUser: PublicUser = {
  id: 1,
  name: "Alice",
  email: "alice@mail.com",
};
```

### `Omit<T, Keys>` — Remove Specific Properties

```typescript
// Remove password from User
type SafeUser = Omit<User, "password">;
// { id: number; name: string; email: string; age: number }

// Remove multiple properties
type BasicUser = Omit<User, "password" | "email">;
// { id: number; name: string; age: number }
```

### `Record<Keys, Type>` — Create an Object Type with Specific Keys

```typescript
// Object where keys are strings and values are numbers
type Scores = Record<string, number>;

const studentScores: Scores = {
  math: 95,
  science: 88,
  english: 92,
};

// Object with specific keys
type UserRoles = Record<"admin" | "user" | "moderator", boolean>;

const roles: UserRoles = {
  admin: true,
  user: true,
  moderator: false,
};
```

### `Exclude<Union, ExcludedMembers>` — Remove Types from a Union

```typescript
type AllColors = "red" | "green" | "blue" | "yellow";
type WarmColors = Exclude<AllColors, "blue" | "green">;
// "red" | "yellow"
```

### `Extract<Union, ExtractedMembers>` — Keep Only Specific Types from a Union

```typescript
type AllColors = "red" | "green" | "blue" | "yellow";
type CoolColors = Extract<AllColors, "blue" | "green">;
// "blue" | "green"
```

### `NonNullable<T>` — Remove null and undefined

```typescript
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string
```

### `ReturnType<T>` — Get the Return Type of a Function

```typescript
function getUser() {
  return { id: 1, name: "Alice", age: 25 };
}

type UserReturnType = ReturnType<typeof getUser>;
// { id: number; name: string; age: number }
```

### `Parameters<T>` — Get the Parameter Types of a Function

```typescript
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]
```

### Quick Reference Table:

| Utility | What it does |
|---|---|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Readonly<T>` | All properties read-only |
| `Pick<T, K>` | Keep only specified properties |
| `Omit<T, K>` | Remove specified properties |
| `Record<K, V>` | Object type with specific keys and value type |
| `Exclude<U, E>` | Remove types from union |
| `Extract<U, E>` | Keep types from union |
| `NonNullable<T>` | Remove null and undefined |
| `ReturnType<F>` | Get return type of function |
| `Parameters<F>` | Get parameter types of function |

---

## 22. Classes in TypeScript

### Theory

TypeScript adds strong typing and additional features to JavaScript classes. If you've used ES6 classes, TypeScript classes will feel familiar but with **type safety** and **access modifiers**.

### Basic Class:

```typescript
class User {
  // You must declare properties with types
  name: string;
  age: number;
  email: string;

  // Constructor
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  // Method
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

const user = new User("Alice", 25, "alice@mail.com");
console.log(user.greet());
```

### Access Modifiers:

TypeScript has three access modifiers that control where properties/methods can be accessed:

```typescript
class Employee {
  public name: string;        // Accessible everywhere (default)
  private salary: number;     // Accessible ONLY inside this class
  protected department: string; // Accessible inside this class AND subclasses

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  // Public method — accessible everywhere
  public getInfo(): string {
    return `${this.name} works in ${this.department}`;
  }

  // Private method — only accessible inside this class
  private calculateBonus(): number {
    return this.salary * 0.1;
  }

  // Public method that uses private data
  public getBonus(): number {
    return this.calculateBonus();
  }
}

const emp = new Employee("Alice", 100000, "Engineering");
console.log(emp.name);       // ✅ Public — works
// console.log(emp.salary);  // ❌ ERROR: 'salary' is private
// console.log(emp.department); // ❌ ERROR: 'department' is protected
console.log(emp.getBonus()); // ✅ Public method works
```

### Shorthand Constructor (Parameter Properties):

Instead of declaring properties AND assigning them in the constructor, you can do both at once:

```typescript
class Product {
  // TypeScript shorthand — declare and assign in one step
  constructor(
    public name: string,
    public price: number,
    private category: string,
    readonly id: number    // readonly = can't be changed after creation
  ) {
    // No need for this.name = name, etc. — TypeScript does it automatically!
  }

  getDetails(): string {
    return `${this.name} - $${this.price} [${this.category}]`;
  }
}

const laptop = new Product("MacBook", 2000, "Electronics", 1);
console.log(laptop.name);   // ✅
// laptop.id = 2;           // ❌ ERROR: readonly
```

### Inheritance:

```typescript
class Animal {
  constructor(
    public name: string,
    protected sound: string
  ) {}

  makeSound(): string {
    return `${this.name} says ${this.sound}`;
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name, "Woof!"); // Call parent constructor
  }

  // Additional method
  fetch(): string {
    return `${this.name} fetches the ball!`;
  }

  // Override parent method
  makeSound(): string {
    return `${this.name} barks: ${this.sound}`; // Can access 'sound' because it's protected
  }
}

const dog = new Dog("Buddy");
console.log(dog.makeSound()); // "Buddy barks: Woof!"
console.log(dog.fetch());     // "Buddy fetches the ball!"
```

### Implementing Interfaces:

Classes can **implement** interfaces — meaning they promise to follow the interface's structure.

```typescript
interface Printable {
  print(): void;
}

interface Saveable {
  save(): boolean;
}

class Document implements Printable, Saveable {
  constructor(public title: string, public content: string) {}

  print(): void {
    console.log(`Printing: ${this.title}`);
  }

  save(): boolean {
    console.log(`Saving: ${this.title}`);
    return true;
  }
}
```

### Abstract Classes:

An abstract class is a **base class that cannot be instantiated directly**. It can have abstract methods (methods without implementation) that subclasses MUST implement.

```typescript
abstract class Shape {
  constructor(public color: string) {}

  // Abstract method — subclass MUST implement this
  abstract getArea(): number;

  // Regular method — subclass inherits this
  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

// const shape = new Shape("red"); // ❌ ERROR: Cannot create an instance of an abstract class

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle("red", 10);
console.log(circle.describe()); // "A red shape with area 314.159..."
```

### Static Members:

Properties and methods that belong to the **class itself**, not to instances.

```typescript
class MathHelper {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathHelper.PI * radius ** 2;
  }
}

// Access without creating an instance:
console.log(MathHelper.PI);              // 3.14159
console.log(MathHelper.circleArea(10));  // 314.159
```

---

## 23. Modules and Imports/Exports

### Theory

TypeScript uses the same module system as modern JavaScript (ES Modules). You can split your code into separate files and use `import`/`export` to share code between them.

### Named Exports:

```typescript
// ===== utils.ts =====
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export interface User {
  id: number;
  name: string;
}

export type ID = string | number;

// ===== app.ts =====
import { add, subtract, User, ID } from "./utils";

console.log(add(5, 3));       // 8
const user: User = { id: 1, name: "Alice" };
```

### Default Exports:

```typescript
// ===== Logger.ts =====
export default class Logger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

// ===== app.ts =====
import Logger from "./Logger";   // No curly braces for default export

const logger = new Logger();
logger.log("Hello!");
```

### Re-exports:

```typescript
// ===== index.ts (barrel file) =====
export { add, subtract } from "./math";
export { User, Product } from "./models";
export { default as Logger } from "./Logger";

// ===== app.ts =====
// Now import everything from one place
import { add, User, Logger } from "./index";
```

### Type-only Imports:

When you only need a type (not a value), you can use `import type`:

```typescript
// This import is ONLY for types — it gets completely removed from compiled JS
import type { User, Product } from "./models";

// Useful to make clear that you're only importing types
```

---

## 24. TypeScript with React (Frontend)

### Theory

React and TypeScript work incredibly well together. TypeScript helps you:
- Define prop types for components
- Type event handlers
- Type state variables
- Type context and hooks

### Setting Up React with TypeScript:

```bash
# Create new React + TypeScript project
npx create-react-app my-app --template typescript

# Or with Vite (recommended — faster)
npm create vite@latest my-app -- --template react-ts
```

### Functional Component with Props:

```typescript
// ===== UserCard.tsx =====

// Define the shape of props
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isAdmin?: boolean;        // optional prop
  onDelete: (id: number) => void;  // function prop
}

// Method 1: Type props directly in the parameter
const UserCard = ({ name, age, email, isAdmin = false, onDelete }: UserCardProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {isAdmin && <span>👑 Admin</span>}
      <button onClick={() => onDelete(1)}>Delete</button>
    </div>
  );
};

export default UserCard;

// Method 2: Using React.FC (Functional Component) — less recommended now
const UserCard2: React.FC<UserCardProps> = ({ name, age, email }) => {
  return <div>{name}</div>;
};
```

### Props with Children:

```typescript
// When your component accepts children
interface CardProps {
  title: string;
  children: React.ReactNode;  // Accepts any valid JSX as children
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

// Usage:
// <Card title="Hello">
//   <p>This is child content</p>
// </Card>
```

### useState with TypeScript:

```typescript
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  // TypeScript infers the type from the initial value
  const [count, setCount] = useState(0);           // type: number
  const [name, setName] = useState("");             // type: string
  const [isLoading, setIsLoading] = useState(false); // type: boolean

  // For complex types, explicitly specify the generic:
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Now TypeScript knows exactly what shape the data should have
  setUser({ id: 1, name: "Alice", email: "alice@mail.com" }); // ✅
  // setUser({ id: 1, name: "Alice" }); // ❌ Missing 'email'

  return <div>{user?.name}</div>;
};
```

### useEffect — No Special Typing Needed:

```typescript
import { useState, useEffect } from "react";

const DataFetcher = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const result: string[] = await response.json();
      setData(result);
    };

    fetchData();
  }, []); // dependency array

  return <ul>{data.map((item, i) => <li key={i}>{item}</li>)}</ul>;
};
```

### useRef:

```typescript
import { useRef, useEffect } from "react";

const InputFocus = () => {
  // For DOM elements, specify the element type and initialize with null
  const inputRef = useRef<HTMLInputElement>(null);

  // For mutable values (like storing a timer ID)
  const timerRef = useRef<number>(0);

  useEffect(() => {
    inputRef.current?.focus();  // Auto-focus on mount
  }, []);

  return <input ref={inputRef} type="text" />;
};
```

### Event Handling:

```typescript
import { useState, ChangeEvent, FormEvent } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ChangeEvent for input changes
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // FormEvent for form submissions
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  // MouseEvent for button clicks
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleEmailChange} />
      <input
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>Login</button>
    </form>
  );
};
```

### useContext with TypeScript:

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context shape
interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Usage in a component:
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Please log in</span>
      )}
    </nav>
  );
};
```

### useReducer with TypeScript:

```typescript
import { useReducer } from "react";

// State type
interface CounterState {
  count: number;
}

// Action types using discriminated union
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

// Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>Set to 100</button>
    </div>
  );
};
```

### Common React Types Reference:

| Type | Use For |
|---|---|
| `React.ReactNode` | Anything that can be rendered (string, number, JSX, null, etc.) |
| `React.ReactElement` | Specifically a JSX element |
| `React.FC<Props>` | Functional component type (less used now) |
| `React.ChangeEvent<HTMLInputElement>` | onChange events on inputs |
| `React.FormEvent<HTMLFormElement>` | onSubmit events on forms |
| `React.MouseEvent<HTMLButtonElement>` | onClick events |
| `React.KeyboardEvent<HTMLInputElement>` | onKeyDown/onKeyUp events |
| `React.CSSProperties` | Inline style objects |

---

## 25. TypeScript with Node.js and Express (Backend)

### Theory

On the backend of a MERN stack, you use Node.js with Express. TypeScript adds type safety to your routes, middleware, request/response objects, and more.

### Setting Up:

```bash
# Initialize project
mkdir my-api && cd my-api
npm init -y

# Install dependencies
npm install express cors dotenv

# Install TypeScript and type definitions
npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/cors

# Initialize TypeScript config
npx tsc --init
```

### tsconfig.json for Node.js:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### package.json scripts:

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### Basic Express Server:

```typescript
// ===== src/index.ts =====

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

const app: Application = express();
const PORT: number = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Typed Request and Response:

```typescript
// Define interfaces for your data
interface User {
  id: number;
  name: string;
  email: string;
}

// In-memory database for example
let users: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

// GET all users
app.get("/api/users", (req: Request, res: Response) => {
  res.json({ success: true, data: users });
});

// GET user by ID
app.get("/api/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  res.json({ success: true, data: user });
});

// POST create user
app.post("/api/users", (req: Request, res: Response) => {
  const { name, email } = req.body as { name: string; email: string };

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});
```

### Typed Request with Generics:

Express's `Request` type accepts generic parameters for more specific typing:

```typescript
// Request<Params, ResponseBody, RequestBody, QueryString>

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

interface UserParams {
  id: string;
}

interface UserQuery {
  page?: string;
  limit?: string;
}

// Fully typed route handler
app.post(
  "/api/users",
  (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    const { name, email, password } = req.body; // Fully typed!
    // TypeScript knows req.body has name, email, password
    res.json({ message: `Created user ${name}` });
  }
);

app.get(
  "/api/users/:id",
  (req: Request<UserParams, {}, {}, UserQuery>, res: Response) => {
    const { id } = req.params;      // TypeScript knows id is string
    const { page, limit } = req.query; // TypeScript knows these are optional strings
    res.json({ id, page, limit });
  }
);
```

### Custom Middleware:

```typescript
// Logger middleware
const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

app.use(logger);

// Auth middleware
interface AuthRequest extends Request {
  userId?: string;
}

const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Verify token (simplified)
  req.userId = "user123"; // Attach user ID to request
  next();
};

// Use the middleware on specific routes
app.get("/api/profile", authenticate, (req: AuthRequest, res: Response) => {
  res.json({ userId: req.userId });
});
```

### Error Handling Middleware:

```typescript
// Custom error class
class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handling middleware (must have 4 parameters)
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

// Use it after all routes
app.use(errorHandler);
```

### Organizing Routes with Router:

```typescript
// ===== src/routes/userRoutes.ts =====
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Get all users" });
});

router.post("/", (req: Request, res: Response) => {
  res.json({ message: "Create user" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ message: `Get user ${req.params.id}` });
});

export default router;

// ===== src/index.ts =====
import userRoutes from "./routes/userRoutes";

app.use("/api/users", userRoutes);
```

### Environment Variables:

```typescript
// ===== src/config.ts =====

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
}

const config: EnvConfig = {
  PORT: parseInt(process.env.PORT || "3000"),
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mydb",
  JWT_SECRET: process.env.JWT_SECRET || "default-secret",
  NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
};

export default config;
```

---

## 26. TypeScript with MongoDB/Mongoose

### Theory

Mongoose is the most popular MongoDB library for Node.js. TypeScript makes Mongoose much safer by ensuring your documents match the expected schema.

### Setting Up:

```bash
npm install mongoose
npm install --save-dev @types/mongoose
# Note: Recent versions of mongoose include their own types
```

### Defining a Mongoose Model with TypeScript:

```typescript
// ===== src/models/User.ts =====

import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the TypeScript interface for the document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  role: "admin" | "user" | "moderator";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    age: {
      type: Number,
      min: 0,
      max: 150,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// 3. Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
export { IUser };
```

### Using the Model in Controllers:

```typescript
// ===== src/controllers/userController.ts =====

import { Request, Response } from "express";
import User, { IUser } from "../models/User";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find().select("-password"); // Exclude password
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, age, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already registered" });
      return;
    }

    const user: IUser = await User.create({
      name,
      email,
      password,
      age,
      role,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
```

### Connecting to MongoDB:

```typescript
// ===== src/db.ts =====

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/myapp"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
```

### Instance Methods and Static Methods:

```typescript
import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for instance methods
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  getFullName(): string;
}

// Interface for the document
interface IUser extends Document, IUserMethods {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Interface for static methods
interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Instance method
userSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // In reality, you'd use bcrypt here
  return this.password === candidatePassword;
};

// Static method
userSchema.statics.findByEmail = function (email: string): Promise<IUser | null> {
  return this.findOne({ email });
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
```

---

## 27. Declaration Files and @types

### Theory

When you use a JavaScript library (like Express, Lodash, jQuery) in TypeScript, TypeScript doesn't know what types that library uses. This is where **declaration files** come in.

A declaration file (`.d.ts`) tells TypeScript about the **types** of a JavaScript library without containing any actual code.

### How it works:

```
JavaScript Library (express.js)
     ↓
Has no types
     ↓
Declaration file (@types/express) provides types
     ↓
TypeScript now knows the types!
```

### Installing Type Declarations:

Most popular libraries have type declarations on npm under the `@types` scope:

```bash
# Install type declarations for popular libraries
npm install --save-dev @types/node       # Node.js types
npm install --save-dev @types/express    # Express types
npm install --save-dev @types/cors       # CORS middleware types
npm install --save-dev @types/jsonwebtoken # JWT types
npm install --save-dev @types/bcryptjs   # Bcrypt types
npm install --save-dev @types/lodash     # Lodash types
```

### Some libraries include their own types:

```bash
# These libraries have BUILT-IN TypeScript types — no @types needed:
npm install axios          # ✅ Types included
npm install mongoose       # ✅ Types included (recent versions)
npm install zod            # ✅ Types included
```

### How to check if types are available:

1. Check on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
2. Or search npm for `@types/library-name`
3. Or just try installing — if @types doesn't exist, check if the library has built-in types

### Creating Your Own Declaration File:

If a library has no types and no @types package, you can create your own:

```typescript
// ===== src/types/my-library.d.ts =====

// Tell TypeScript: "this module exists and exports these things"
declare module "my-library" {
  export function doSomething(input: string): number;
  export interface MyConfig {
    debug: boolean;
    verbose: boolean;
  }
}
```

### Global Type Declarations:

```typescript
// ===== src/types/global.d.ts =====

// Add custom properties to Express Request
declare namespace Express {
  interface Request {
    userId?: string;
    role?: string;
  }
}

// Declare global variables
declare const API_URL: string;

// Declare modules for non-TypeScript files
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}
```

---

## 28. tsconfig.json Explained

### Theory

The `tsconfig.json` file is the **configuration file for TypeScript**. It tells the TypeScript compiler how to compile your code — what features to use, where to find files, where to output compiled files, and how strict to be.

### Creating tsconfig.json:

```bash
tsc --init
```

### Most Important Options Explained:

```jsonc
{
  "compilerOptions": {
    
    // ===== TARGET & MODULE =====
    
    // What version of JavaScript to compile TO
    // "ES5" = older browsers, "ES2020" = modern, "ESNext" = latest
    "target": "ES2020",
    
    // Module system to use
    // "commonjs" for Node.js, "ESNext" for React/Vite
    "module": "commonjs",
    
    // ===== DIRECTORIES =====
    
    // Where your TypeScript source files are
    "rootDir": "./src",
    
    // Where compiled JavaScript files go
    "outDir": "./dist",
    
    // ===== STRICT MODE =====
    
    // Enable ALL strict checks (RECOMMENDED — set to true)
    "strict": true,
    
    // Individual strict options (all enabled by "strict": true):
    // "noImplicitAny": true,       // Error if TypeScript can't infer type (becomes 'any')
    // "strictNullChecks": true,     // null and undefined are separate types
    // "strictFunctionTypes": true,  // Stricter function type checking
    // "strictBindCallApply": true,  // Check bind, call, apply arguments
    
    // ===== INTEROP =====
    
    // Allow default imports from modules with no default export
    "esModuleInterop": true,
    
    // Allow importing .json files
    "resolveJsonModule": true,
    
    // ===== OUTPUT =====
    
    // Generate .d.ts declaration files
    "declaration": true,
    
    // Generate source maps (helpful for debugging)
    "sourceMap": true,
    
    // ===== CHECKS =====
    
    // Error on unused local variables
    "noUnusedLocals": true,
    
    // Error on unused function parameters
    "noUnusedParameters": true,
    
    // Error if not all code paths return a value
    "noImplicitReturns": true,
    
    // Error on fallthrough cases in switch statements
    "noFallthroughCasesInSwitch": true,
    
    // Skip type checking of declaration files (faster compilation)
    "skipLibCheck": true,
    
    // Ensure file names are consistently cased
    "forceConsistentCasingInFileNames": true,
    
    // ===== JSX (for React) =====
    // "jsx": "react-jsx",  // For React 17+ with new JSX transform

    // ===== PATH ALIASES =====
    // "baseUrl": "./src",
    // "paths": {
    //   "@/*": ["./*"],
    //   "@components/*": ["./components/*"],
    //   "@utils/*": ["./utils/*"]
    // }
  },
  
  // Which files to include
  "include": ["src/**/*"],
  
  // Which files to exclude
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Recommended Configs:

**For Node.js/Express Backend:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**For React Frontend (with Vite — usually auto-generated):**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 29. Common Mistakes and Tips

### Mistake 1: Using `any` everywhere

```typescript
// ❌ Bad — defeats the purpose of TypeScript
function processData(data: any): any {
  return data.something;
}

// ✅ Good — use proper types or unknown
function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return String(data);
}
```

### Mistake 2: Not handling null/undefined

```typescript
// ❌ Bad — might crash
const element = document.getElementById("app");
element.style.color = "red"; // element could be null!

// ✅ Good — handle null case
const element = document.getElementById("app");
if (element) {
  element.style.color = "red";
}

// ✅ Also good — non-null assertion (only if you're SURE)
const element = document.getElementById("app")!;
element.style.color = "red";
```

### Mistake 3: Forgetting async function return types

```typescript
// ❌ Confusing — what does this return?
async function getUser(id: string) {
  const user = await fetch(`/api/users/${id}`);
  return user.json();
}

// ✅ Clear — return type is explicit
interface User {
  id: string;
  name: string;
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const user: User = await response.json();
  return user;
}
```

### Mistake 4: Overcomplicating types

```typescript
// ❌ Over-engineered
type MaybeNullableOptionalString = string | null | undefined | void;

// ✅ Simple and clear
type Name = string | null;
```

### Mistake 5: Not using interfaces for API responses

```typescript
// ❌ Bad — using inline types everywhere
app.get("/api/users", async (req, res) => {
  const users = await User.find(); // What shape is this?
  res.json(users);
});

// ✅ Good — defined interfaces
interface IUserResponse {
  success: boolean;
  data: IUser[];
  count: number;
}

app.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find();
  const response: IUserResponse = {
    success: true,
    data: users,
    count: users.length,
  };
  res.json(response);
});
```

### Tips:

1. **Start with `strict: true`** in tsconfig.json. It catches more errors.
2. **Let TypeScript infer** when it can. Don't over-annotate obvious types.
3. **Use interfaces for objects**, `type` for unions and complex types.
4. **Use `unknown` instead of `any`** whenever possible.
5. **Install `@types/` packages** for JavaScript libraries.
6. **Use VS Code** — it has the best TypeScript support with IntelliSense.
7. **Enable ESLint with TypeScript** for even more error catching:
   ```bash
   npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```
8. **Use Zod or Joi** for runtime validation alongside TypeScript's compile-time checking.

---

## 30. Cheat Sheet

### Quick Type Reference:

```typescript
// ===== PRIMITIVES =====
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let nul: null = null;
let undef: undefined = undefined;

// ===== ARRAYS =====
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ["a", "b"];
let tuple: [string, number] = ["hello", 42];

// ===== OBJECTS =====
let obj: { name: string; age: number } = { name: "Alice", age: 25 };

// ===== FUNCTIONS =====
function fn(a: number, b: number): number { return a + b; }
const arrow = (x: string): string => x.toUpperCase();
const noReturn = (msg: string): void => { console.log(msg); };

// ===== UNION & INTERSECTION =====
let union: string | number = "hello";
type Combined = TypeA & TypeB;

// ===== TYPE ALIAS =====
type ID = string | number;
type User = { name: string; age: number };

// ===== INTERFACE =====
interface IUser { name: string; age: number; }
interface IEmployee extends IUser { company: string; }

// ===== ENUM =====
enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }

// ===== GENERIC =====
function identity<T>(val: T): T { return val; }
interface Response<T> { data: T; success: boolean; }

// ===== UTILITY TYPES =====
type Partial1 = Partial<User>;           // all optional
type Required1 = Required<User>;         // all required
type Readonly1 = Readonly<User>;         // all readonly
type Picked = Pick<User, "name">;        // only name
type Omitted = Omit<User, "age">;        // everything except age
type Recorded = Record<string, number>;  // { [key: string]: number }

// ===== TYPE ASSERTION =====
const el = document.getElementById("app") as HTMLDivElement;
const el2 = document.getElementById("app")!; // Non-null assertion

// ===== TYPE GUARD =====
if (typeof x === "string") { /* x is string here */ }
if ("bark" in animal) { /* animal has bark */ }
if (x instanceof Date) { /* x is Date here */ }
```

### React + TypeScript Quick Reference:

```typescript
// Props
interface Props { name: string; onClick: () => void; children?: React.ReactNode; }
const MyComp = ({ name, onClick, children }: Props) => <div>{name}</div>;

// State
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// Ref
const inputRef = useRef<HTMLInputElement>(null);

// Events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// Context
const MyContext = createContext<MyType | undefined>(undefined);
```

### Express + TypeScript Quick Reference:

```typescript
import { Request, Response, NextFunction, Router } from "express";

// Route handler
app.get("/", (req: Request, res: Response) => { res.json({}); });

// Middleware
const auth = (req: Request, res: Response, next: NextFunction): void => { next(); };

// Typed request body
app.post("/", (req: Request<{}, {}, { name: string }>, res: Response) => {
  const { name } = req.body;
});
```

### Mongoose + TypeScript Quick Reference:

```typescript
import { Schema, Document, Model, model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
}

const schema = new Schema<IUser>({ name: String, email: String });
const User: Model<IUser> = model<IUser>("User", schema);
```

---

## 🎉 Congratulations!

You now have a solid foundation of TypeScript for MERN development. Here's what to do next:

1. **Practice** — Convert an existing JavaScript project to TypeScript
2. **Build** — Create a full MERN app with TypeScript from scratch
3. **Read errors** — TypeScript errors seem scary at first but become your best friend
4. **Explore** — Look into advanced topics like mapped types, conditional types, and template literal types when you're ready

> **Remember:** TypeScript is not about writing perfect types on day one. It's about gradually adding safety to your code. Start simple, and add complexity as you learn!

---

*Made with ❤️ for MERN developers transitioning to TypeScript*