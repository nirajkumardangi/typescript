// A type alias is a custom name for a type. Instead of writing long, complex types inline, you create a reusable name for them. It's like creating a variable, but for types.
// Use the type keyword to create type aliases.

//==> Without type alias (messy for complex types)
let user1: { name: string; age: number; email: string } = {
   name: "Alice",
   age: 25,
   email: "alice@mail.com",
};
let user2: { name: string; age: number; email: string } = {
   name: "Bob",
   age: 30,
   email: "bob@mail.com",
};
// You're repeating the same type definition!

//==> With type alias (clean and reusable)
type User = {
   name: string;
   age: number;
   email: string;
};

let user3: User = { name: "Alice", age: 25, email: "alice@mail.com" };
let user4: User = { name: "Bob", age: 30, email: "bob@mail.com" };

//==> Type Aliases for Primitives and Unions:
type ID = string | number;
type Status = "active" | "inactive" | "banned";
type Coordinate = [number, number]; // Tuple

let userId: ID = "abc123";
let userStatus: Status = "active";
let location1: Coordinate = [28.6139, 77.209];



//==> Type Aliases for Functions:
type MathFunction = (a: number, b: number) => number;

const add: MathFunction = (a, b) => a + b;
const subtract: MathFunction = (a, b) => a - b;



// Type Aliases with Generics (Preview — covered in detail later):
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
