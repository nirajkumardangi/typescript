// A tuple is a fixed-length array where each position has a specific type.

// Tuple: exactly 2 elements — first is string, second is number
let user: [string, number] = ["Alice", 25];

// ✅ Correct
user = ["Bob", 30];

// ❌ ERROR: wrong order
user = [30, "Bob"];

// ❌ ERROR: wrong number of elements
user = ["Charlie"];

// ❌ ERROR: wrong number of elements
user = ["Niraj", 23, false]


// Accessing tuple elements
console.log(user[0]); // "Alice" — TypeScript knows this is a string
console.log(user[1]); // 25 — TypeScript knows this is a number


// Practical Example: function that returns multiple values
function getUser(): [string, number] {
  return ["Alice", 25];
}

const [username, age] = getUser(); // Destructuring works!
console.log(username, age); // Alice 25


// Tuple with Optional Elements:
let data: [string, number, boolean?] = ["hello", 42];
// The third element (boolean) is optional


// Read-only Tuple:
const point: readonly [number, number] = [10, 20];
console.log(point[0]); // 10
// point[0] = 30; // ❌ ERROR: Cannot assign to '0' because it is a read-only property

const greet: [number?, string] = [23, "niraj"] // ❌ ERROR: can not add required element after optional element