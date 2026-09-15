// Type annotation means you explicitly tell TypeScript what type a variable, parameter, or return value should have. You write the type after a colon :

// Syntax: let variableName: type = value;
let movieName: string = "Inception";
let releaseYear: number = 2010;
let isBlockbuster: boolean = true;



// Annotation on Function Parameters and Return:

// Parameters: name is string, age is number
// Return type: string (after the parentheses)
function introduce(name: string, age: number): string {
  return `I am ${name}, and I am ${age} years old.`;
}

introduce("Alice", 30); // ✅ Works
introduce("Alice", "30"); // ❌ ERROR: Argument of type 'string' is not assignable to parameter of type 'number'



// Annotation on Variables Declared Without a Value:
let email: string; // declared, not initialized
email = "a@b.com"; // ✅ works
email = 123; // ❌ ERROR

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 20));
