//==> typeof Narrowing:
function processValue(value: string | number): string {
  // At this point, value could be string or number

  if (typeof value === "string") {
    // TypeScript KNOWS value is a string here
    return value.toUpperCase(); // String method works
  } else {
    // TypeScript KNOWS value is a number here
    return value.toFixed(2); // Number method works
  }
}



//==> Truthiness Narrowing:
function printName(name: string | null | undefined): void {
  if (name) {
    // name is definitely a string here (not null, not undefined, not empty string)
    console.log(name.toUpperCase());
  } else {
    console.log("No name provided");
  }
}



//==> Equality Narrowing:
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // The only way a === b is if both are strings
    // TypeScript narrows both to string
    console.log(a.toUpperCase());
    console.log(b.toUpperCase());
  }
}



//==> in Operator Narrowing: Check if a property exists in an object.

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



//==> instanceof Narrowing: Check if something is an instance of a class.

function formatDate(date: string | Date): string {
  if (date instanceof Date) {
    // TypeScript knows it's a Date object
    return date.toISOString();
  } else {
    // TypeScript knows it's a string
    return new Date(date).toISOString();
  }
}



//==> Custom Type Guards (Type Predicates): You can create your own narrowing functions.

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



//==> Discriminated Unions: A powerful pattern where each type in a union has a common property with literal values to distinguish them.

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