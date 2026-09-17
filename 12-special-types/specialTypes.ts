//==> any — The Escape Hatch
// any completely disables type checking for that variable. It's like going back to JavaScript.

let data: any = 42;
data = "hello"; // ✅ No error
data = true; // ✅ No error
data = [1, 2, 3]; // ✅ No error
data.foo.bar.baz; // ✅ No error (but will crash at runtime!)

// any is contagious — it infects other variables
let num: number = data; // ✅ No error, even if data is actually a string!

// Avoid any as much as possible. It defeats the purpose of TypeScript. Use it only as a last resort when migrating from JavaScript or dealing with truly dynamic data.



//==> unknown — The Safe Version of any
// unknown also accepts any value, but you can't use it until you narrow/check its type. It's like any but with safety.

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

// Rule: Use unknown instead of any when you don't know the type. Then narrow it.



//==> void — No Return Value, void means a function does not return anything.

function logMessage(message: string): void {
  console.log(message);
  // No return statement (or return without a value)
}

// A function that returns void:
function showAlert(): void {
  alert("Hello!");
  return; // ✅ OK — returning nothing
  return 42; // ❌ ERROR: number is not assignable to void
}



//==> never — This Should NEVER Happen, never represents values that never occur. It's used for:

// Functions that always throw errors
// Functions with infinite loops
// Exhaustive checks (making sure all cases are handled)

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