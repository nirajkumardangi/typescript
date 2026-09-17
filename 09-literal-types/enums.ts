// Enums (short for "enumerations"): let you define a set of named constants. They're similar to literal types but with some extra features.

//==> Numeric Enums: By default, enum values start at 0 and auto-increment.

enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

let myDirection: Direction = Direction.Up;
console.log(myDirection); // 0
console.log(Direction.Left); // 2

// You can set custom starting number:
enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

console.log(StatusCode.NotFound); // 404



//==> String Enums: Each value is a string. More readable and easier to debug.

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

let favoriteColor: Color = Color.Red;
console.log(favoriteColor); // "RED"



//==> Practical Example:
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

checkAccess(UserRole.Admin); // "Full access granted"
checkAccess(UserRole.User); // "Limited access"
checkAccess("ADMIN"); // ERROR: string is not assignable to UserRole



//==> const enum (Better Performance):
const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L",
}

let tshirtSize = Size.Medium; // At compile time, this becomes just "M"
// const enums are completely removed from the compiled JavaScript