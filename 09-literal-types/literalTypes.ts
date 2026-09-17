// Literal types let you specify exact values a variable can hold, not just general types like string or number. Instead of "any string," you say "only these specific strings."

// Regular type — any string is allowed
let color: string = "anything goes here";

// Literal type — ONLY these specific values are allowed
let direction: "up" | "down" | "left" | "right";
direction = "up";
direction = "down";
direction = "diagonal"; // ERROR: not one of the allowed values

// Number literals
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3; //
diceRoll = 7; // ERROR

// Boolean literal (less common but possible)
let alwaysTrue: true = true;
alwaysTrue = false; // ERROR



//==> Literal Types with Type Aliases:
type Theme = "light" | "dark" | "system";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Role = "admin" | "user" | "moderator";

let currentTheme: Theme = "dark";
let method: HttpMethod = "GET";
let userRole: Role = "superadmin"; // ERROR



//==> Practical Example — API Status:
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



//==> as const for Literal Inference:
// Without 'as const' — TypeScript infers "string"
let method = "GET"; // type: string

// With 'as const' — TypeScript infers the literal "GET"
let method2 = "GET" as const; // type: "GET"

// Useful with objects:
const config = {
  url: "/api/users",
  method: "GET",
} as const;
// config.method is type "GET", not just string
// config.url is type "/api/users", not just string
