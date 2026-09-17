// An interface is another way to define the shape of an object in TypeScript.
// Interfaces are mainly used for objects and classes.

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

console.log(user);



//==> Optional and Readonly in Interfaces:
interface Product {
  readonly id: number; // Can't be changed after creation
  name: string;
  price: number;
  discount?: number; // Optional
}

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 200000,
};

// laptop.id = 2; // ERROR: Cannot assign to 'id' because it is read-only



//==> Extending Interfaces (Inheritance): One interface can extend (inherit from) another.

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



//==> Extending Multiple Interfaces:
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

interface Document extends Printable, Loggable {
  title: string;
}



//==> Declaration Merging (Unique to Interfaces): If you declare the same interface twice, TypeScript merges them automatically. This is special — type aliases can't do this.

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



//==> Interface for Functions:
interface SearchFunction {
  (query: string, limit: number): string[];
}

const search: SearchFunction = (query, limit) => {
  return [`Result for "${query}"`, `Limit: ${limit}`];
};