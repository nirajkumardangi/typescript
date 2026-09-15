// Basic Object Typing: Inline type annotation
let user: { name: string; age: number; isAdmin: boolean } = {
   name: "Niraj",
   age: 26,
   isAdmin: true,
};

// Accessing properties
console.log(user.name); // ✅ "Alice"
console.log(user.salary); // ❌ ERROR: Property 'salary' does not exist



// Optional Properties: Sometimes a property may or may not exist. Use ? to mark it optional.

let product: {
   name: string;
   price: number;
   discount?: number; // optional — may or may not be there
} = {
   name: "Laptop",
   price: 50000,
   // discount is not provided — that's fine because it's optional
};



// Readonly Properties: Properties that should never be changed after creation.

let config: {
   readonly apiUrl: string;
   readonly port: number;
   age: number;
} = {
   apiUrl: "https://api.example.com",
   port: 3000,
   age: 25,
};

config.apiUrl = "https://other.com"; // ❌ ERROR: Cannot assign to 'apiUrl' because it is read-only



// Nested Objects:
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



// Index Signatures (Dynamic Keys): When you don't know the exact property names ahead of time:

let dictionary: { [key: string]: string } = {};
dictionary["hello"] = "नमस्ते";
dictionary["bye"] = "अलविदा";
dictionary["count"] = 42; // ❌ ERROR: number not assignable to string

console.log(dictionary);
