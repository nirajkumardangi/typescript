//==> Named Exports:
// ===== utils.ts =====
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export interface User {
  id: number;
  name: string;
}

export type ID = string | number;

// ===== app.ts =====
import { add, subtract, User, ID } from "./utils";

console.log(add(5, 3)); // 8
const user: User = { id: 1, name: "Alice" };



//==> Default Exports:
// ===== Logger.ts =====
export default class Logger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

// ===== app.ts =====
import Logger from "./Logger"; // No curly braces for default export

const logger = new Logger();
logger.log("Hello!");



//==> Re-exports:
// ===== index.ts (barrel file) =====
export { add, subtract } from "./math";
export { User, Product } from "./models";
export { default as Logger } from "./Logger";

// ===== app.ts =====
// Now import everything from one place
import { add, User, Logger } from "./index";



// Type-only Imports: When you only need a type (not a value), you can use import type:

// This import is ONLY for types — it gets completely removed from compiled JS
import type { User, Product } from "./models";

// Useful to make clear that you're only importing types

