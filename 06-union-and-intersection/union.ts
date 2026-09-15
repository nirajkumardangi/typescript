// id can be string OR number
let id: string | number;
id = "abc123"; // ✅
id = 42; // ✅
id = true; // ❌ ERROR: boolean is not assignable to string | number

// Function that accepts union type
function printId(id: string | number): void {
   console.log(`Your ID is: ${id}`);
}

printId(101); // ✅
printId("abc123"); // ✅

// Narrowing with Union Types: When you have a union type, you need to narrow (check) the type before using type-specific methods.

function formatId(id: string | number): string {
   if (typeof id === "string") {
      // TypeScript now KNOWS id is a string here
      return id.toUpperCase();
   } else {
      // TypeScript now KNOWS id is a number here
      return id.toFixed(2);
   }
}

console.log(formatId("abc")); // ABC
console.log(formatId(42)); // 42.00
console.log(formatId("abc123xyz")); // ABC123XYZ
