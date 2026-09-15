# TypeScript Notes for MERN Developers

> Simple English notes made from a full TypeScript course. Every topic has **theory (why/what)** first, then **code** (how).

---

## 1. Why Learn TypeScript?

**Theory:**
- TypeScript (TS) is **not a separate language**. It is JavaScript (JS) **+ types**. Think of it as JS wearing a "safety suit."
- **Rule:** Learn TypeScript only *after* you are comfortable with JavaScript (loops, functions, variables). Don't start with TS as your first language — same as you shouldn't learn React before JS.
- Diagram to remember: **TypeScript is the big outer circle, JavaScript is inside it.** Every JS code is valid TS code, but TS adds extra rules (types) on top.

**Problems with plain JavaScript (why TS was created):**
1. **Too much freedom** – you can pass any data type anywhere, no restriction. This freedom causes bugs.
2. **Loose documentation** – JS doesn't force you to describe what a function expects/returns. Tools like JSDoc help a little but are not enforced.
3. **Weak developer tooling** – Bugs like "function prints `42` instead of `hitesh`" are not real errors, but wrong app *behavior*. TS reduces such surprises.
4. **AI/Autocomplete works better with TS** because the AI has more "context" (the types) to understand your code, so fewer mistakes.

**Example — the classic problem:**
```js
// JavaScript
function greet(name) {
  return "Hello " + name;
}
greet("Hitesh"); // fine
greet(42);        // no error, but wrong behavior!
```
With TypeScript, you declare that `name` must be a string, so passing `42` becomes an error **before running the code**.

---

## 2. What Extra Does TypeScript Add?

**Theory:**
- TypeScript is only an **add-on**. It runs on top of JavaScript. It cannot run by itself (no standalone runtime).
- **Very important rule: TypeScript code NEVER actually runs directly.** It always goes through a **compilation process** and gets converted into plain JavaScript. In the end, only JS executes in the browser/Node.
- The only "special power" TS adds is: **Type Checking**.
- Type checking gives you: **consistency** in your code + catches bugs early + better autocomplete/suggestions.

```ts
// basic.ts
function greet(name: string): string {
  return `Hello ${name}`;
}
console.log(greet("Hitesh")); // ok
console.log(greet(32));        // TypeScript ERROR here itself
```
- Modern editors (VS Code) already understand `.ts` files out of the box — no install needed just to get red squiggly lines/suggestions.
- Node.js today can strip out the types directly and run TS files without you manually compiling (but this is different from actually "running TypeScript").

---

## 3. How TypeScript Works Internally (Compiler Pipeline)

**Theory (this is "behind the scenes" – good to know, not required to memorize deeply):**

Your `.ts` file goes through these stages before becoming `.js`:

1. **Lexer (Scanner)** — Breaks your whole code into small pieces called **tokens** (like `const`, `function`, `return`, brackets etc.). Catches very obvious mistakes (missing semicolon, missing quote).
2. **Parser** — Takes tokens and builds a tree structure called **AST (Abstract Syntax Tree)**. This tree represents how your code's grammar/structure looks (similar to how compilers work in Computer Science).
3. **Binder** (TypeScript-specific step, most languages don't have this) — Builds:
   - **Symbol Tables** — keeps info about your custom types, interfaces, structs etc.
   - **Parent Pointers** — so the compiler can go up the tree (like going back to parent folder).
   - **Flow Nodes** — tracks `if/else` type logic flow in your code.
4. **Checker** (also TS-specific, missing in plain JS) — This is the **real type-checking engine**. It goes through your code (often twice) and checks:
   - Does the assigned data type match the declared type?
   - Are you changing a variable's data type incorrectly?
   - This is why editors show you red-squiggly-line warnings — they extract just this "checker" part.
5. **Emitter (a.k.a Generator)** — Final step. It **strips out all the TypeScript-only syntax** (colons, type annotations) and produces plain `.js` file + a `.d.ts` (declaration file) + `.js.map` (source map file, used for debugging).

**Simple summary:**
```
.ts file → Lexer (tokens) → Parser (AST tree) → Binder (symbol tables) 
→ Checker (type validation) → Emitter (strip types) → plain .js file
```

> Node.js's built-in TS support basically only does the **Emitter step** — it just strips types and runs the JS. It does NOT do full type checking. That's why Node lets buggy-typed code run with just a warning.

---

## 4. Project Setup (Traditional Way)

**Theory:** You can install TypeScript in 2 ways:
- **Globally** (`-g` flag) — available everywhere on your system.
- **Project-wise** (recommended) — because different projects may need different TS versions.

**Steps:**
```bash
npm init -y              # creates package.json
npm install -D typescript # installs TS as a dev dependency
npx tsc --init            # creates tsconfig.json with default settings
```

- `npx` = Node Package Executor — runs a package's binary without installing it globally.
- `tsc` = TypeScript Compiler (comes bundled inside the typescript package).
- `tsconfig.json` — This is your **configuration file**. It controls things like:
  - `rootDir` — where your TS source files live (usually `src`)
  - `outDir` — where compiled JS files should go (usually `dist`)
  - `target` — which JS version to compile down to (ES2017, ESNext, etc.)
  - `strict` — turns on strict type checking (recommended: `true`)
  - Many boolean flags — you can explore them at the **TypeScript Playground** website.

**Running your code:**
```bash
npx tsc            # compiles all .ts files based on tsconfig.json
npx tsc --init     # only for setup, generates tsconfig
node dist/index.js # run compiled JS
```
For dev mode (auto compile + run), people install `ts-node`:
```bash
npm install -D ts-node
npx ts-node src/index.ts
```

---

## 5. Type Annotation vs. Type Inference

**Theory — the heart of TypeScript, this is what you'll use everywhere:**

- **Type Inference** = TypeScript automatically figures out the type by itself (you don't tell it).
- **Type Annotation** = You explicitly tell TypeScript what type something is, using a colon `:`.

```ts
let drink = "chai";        // inference: TS knows this is a string automatically
let flavor: string = "ginger"; // annotation: you explicitly told it
```

**Rule:** Once a variable's type is fixed (by inference or annotation), you **cannot** later assign a different type to it.
```ts
let cups = 5;
cups = "five"; // ❌ Error — Type 'string' is not assignable to type 'number'
```

**Two most common error types in TypeScript:**
1. **Syntax Error** — plain coding mistakes (e.g., `let let x = 5`).
2. **Type Error** — you assigned/passed the wrong data type. This is the error you'll see the MOST. Example error message:
   `Type 'number' is not assignable to type 'string'`

---

## 6. Basic Data Types

**Theory:** JavaScript already has `string`, `number`, `boolean`, `null`, `undefined` etc. TypeScript just lets you **label** them explicitly using lowercase keywords.

```ts
let teaOrder: number;
teaOrder = 5;

let isHot: boolean = true;
let flavorName: string = "masala";
```

- Basic types are always **lowercase**: `string`, `number`, `boolean` (NOT `String`, `Number`).
- You mostly won't need to write these because TS **infers** them automatically. Use annotation mainly for:
  - Function parameters (input can't always be inferred)
  - Function return types
  - When declaring an empty variable with no initial value

---

## 7. Union Types (`|`)

**Theory:** Sometimes one variable can legally hold **more than one** possible type. That's when we use a **Union Type** with the pipe symbol `|`. It means "this OR that."

```ts
let subs: number | string;
subs = 10;      // ✅ ok, it's a number
subs = "1M";    // ✅ ok, it's a string
```

**Real world use — API status example:**
```ts
let apiRequestStatus: "pending" | "success" | "error";
apiRequestStatus = "pending"; // ✅
apiRequestStatus = "done";    // ❌ Error, "done" is not one of the allowed values
```
This is super useful — it **restricts** the set of allowed values, unlike plain JS where you can type anything and only find the typo bug at runtime.

**Another real example — seat types:**
```ts
type AirlineSeat = "aisle" | "window" | "middle";
let seat: AirlineSeat = "window"; // only these 3 values are ever valid
```

---

## 8. The `any` Type (Avoid it!)

**Theory:** `any` means "I don't care what type this is / I don't know the type." It **completely disables type checking** for that variable. It's basically an escape hatch back to plain JavaScript — you lose all the safety TS gives you.

```ts
let currentOrder: any;
for (const order of orders) {
  if (order === 28) {
    currentOrder = order;
    break;
  }
}
currentOrder = 42; // TypeScript allows this silently — BAD, this defeats the purpose of TS
```

**Rule of thumb:** Always try to avoid `any`. Use it only when:
- You are learning fast and want to skip a detail temporarily.
- Data comes from an unpredictable external API and you genuinely don't know the shape yet (though `unknown` is usually a better choice here — see below).

---

## 9. Type Narrowing & Type Guards

**Theory:** "Type Narrowing" means: figuring out the *exact* data type of a variable at a particular point in code, usually using an `if` check, so TypeScript can give you accurate suggestions after that point. This is NOT a TypeScript-only concept — it's a **good coding practice** that also applies in plain JavaScript, but TS *forces* you to think about it.

```ts
function getTea(kind: string | number) {
  if (typeof kind === "string") {
    return `Making ${kind} tea...`;   // TS knows `kind` is a string HERE
  } else {
    return `Order number: ${kind}`;   // TS knows `kind` is a number HERE
  }
}
```

**Truthiness narrowing:**
```ts
function serveTea(message?: string) {
  if (message) {
    return `Serving with message: ${message}`; // TS guarantees `message` exists here
  }
  return `Serving default masala chai`;
}
```

**Exhaustive checks (checking every possible case):**
```ts
function orderTea(size: "small" | "medium" | "large" | number) {
  if (size === "medium") return "Medium tea";
  else if (size === "large") return "Extra tea";
  else return size; // remaining possible case handled
}
```

**`instanceof` check (works with classes):**
```ts
class CutingChai { serve() { return "Serving cutting chai"; } }
class KulharChai { serve() { return "Serving kulhar chai"; } }

function serve(tea: CutingChai | KulharChai) {
  if (tea instanceof KulharChai) {
    return tea.serve(); // guaranteed it's the KulharChai method
  }
}
```

**Custom Type Predicate (`is` keyword) — very powerful:**
```ts
type TeaOrder = { type: string; sugar: number };

function isTeaOrder(obj: any): obj is TeaOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string"
  );
}

function serveOrder(item: unknown) {
  if (isTeaOrder(item)) {
    console.log(item.sugar); // TS knows the shape now, no error
  } else {
    console.log("Custom item:", item);
  }
}
```
`isTeaOrder` is a function whose return type is `obj is TeaOrder`. This literally tells TypeScript: "if this function returns `true`, treat `obj` as a `TeaOrder` from now on."

---

## 10. `unknown` vs `any`

**Theory:** `unknown` is the **safer sibling of `any`**. Both mean "I don't know the type yet," BUT:
- `any` → You can do ANYTHING with it immediately (call it, access properties, no checks needed). Dangerous.
- `unknown` → TypeScript **forces you to check/narrow the type first** before you're allowed to use it.

```ts
let value: unknown;
value = "chai";
value = 123; // fine, still unknown

let newValue: unknown = value;
newValue.toUpperCase(); // ❌ ERROR — must narrow first

if (typeof newValue === "string") {
  newValue.toUpperCase(); // ✅ now it's safe
}
```

**Where to use `unknown`:** whenever data is coming from an external source (API response, `JSON.parse()`, form input) and you're not 100% sure of its shape yet.

---

## 11. Type Assertion (the `as` keyword)

**Theory:** Sometimes YOU know more about a value's type than TypeScript can automatically figure out. In such cases you can "force" TypeScript to trust you, using `as`. This does **not convert** the value — it's just telling the compiler "trust me, treat this as X type."

```ts
let response: any = "42"; // pretend this came from an API

let str = (response as string).length; // forcing TS to treat response as string
```

**Common real-world use — reading environment variables or DOM elements:**
```ts
const input = document.getElementById("username") as HTMLInputElement;
input.value = "hello"; // now TS knows this element has a `.value` property
```

**Parsing JSON (very common pattern):**
```ts
type Book = { name: string };
const bookString = '{"name":"Who Moved My Cheese"}';
const book = JSON.parse(bookString) as Book;
console.log(book.name); // TS now trusts the shape
```

⚠️ **Important:** `as` is NOT a runtime conversion. `Number("42") as number` does NOT actually convert a string to a number — it just changes what TypeScript *thinks* the type is. Real conversion still needs functions like `Number()`, `parseInt()`, etc.

---

## 12. The `never` Type

**Theory:** `never` means "this should logically never happen" or "this function never successfully returns anything at all."

**Use case 1 — Exhaustive checks (catching missed cases):**
```ts
type Role = "admin" | "user";

function redirect(role: Role): void {
  if (role === "admin") {
    console.log("Redirecting to admin dashboard");
    return;
  }
  if (role === "user") {
    console.log("Redirecting to user dashboard");
    return;
  }
  role; // TypeScript infers this as type `never` here
  // If someone LATER adds a new role like "superAdmin" to the Role type,
  // TypeScript will immediately flag this spot as an error — helping catch missed cases!
}
```

**Use case 2 — Functions that never return (infinite loops, servers):**
```ts
function runServer(): never {
  while (true) {
    // keeps running forever, like a real web server listening for requests
  }
}
```

---

## 13. `type` vs `interface`

**Theory:** Both `type` (Type Alias) and `interface` are used to describe the **shape/structure of data** (mostly objects). They are about **70-80% interchangeable**. Some differences exist, but for daily MERN work, you can mostly pick either.

```ts
// Using `type`
type ChaiOrder = {
  name: string;
  price: number;
};

// Using `interface`
interface ChaiOrder2 {
  name: string;
  price: number;
}
```

**Key differences:**
| Feature | `type` | `interface` |
|---|---|---|
| Can describe unions (`A | B`) | ✅ Yes | ❌ No |
| Can describe primitives directly | ✅ Yes | ❌ No |
| Can be re-opened & merged (declaration merging) | ❌ No | ✅ Yes |
| Extending | via `&` (intersection) | via `extends` |
| Used for class contracts | Sometimes works | ✅ Preferred |

**Interface Merging (unique to interfaces):**
```ts
interface User {
  name: string;
}
interface User {
  age: number; // gets automatically merged with the User above!
}
const u: User = { name: "Hitesh", age: 42 }; // needs BOTH properties now
```

**Extending interfaces:**
```ts
interface A { a: string; }
interface B { p: string; }
interface C extends A, B {} // C now requires both `a` and `p`
```

**Rule of thumb:** For plain objects → either works. For **classes** → prefer `interface`. For **unions/intersections** → must use `type`.

---

## 14. Intersection Types (`&`)

**Theory:** While Union (`|`) means "either this OR that," **Intersection (`&`)** means "BOTH combined together" — like adding two shapes into one bigger shape.

```ts
type BaseChai = { teaLeaves: number };
type Extra = { masala?: number };

type MasalaChai = BaseChai & Extra;

const cup: MasalaChai = { teaLeaves: 2, masala: 1 }; // has properties from BOTH types
```

---

## 15. Optional (`?`) and Readonly Properties

**Theory:**
- `?` after a property name = this property is **optional** (may or may not exist).
- `readonly` before a property = once set, it **cannot be changed later**.

```ts
type User = {
  username: string;
  bio?: string; // optional, may be missing
};

const u1: User = { username: "hitesh" };            // ✅ ok, bio missing is fine
const u2: User = { username: "hitesh", bio: "dev" }; // ✅ also fine

type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = { appName: "ChaiCode", version: 1 };
cfg.appName = "Something else"; // ❌ Error — cannot assign to readonly property
```

---

## 16. Objects in TypeScript

**Theory:** Objects work the same way as JS objects, but TypeScript automatically **infers a "shape"** for them based on the values you assign, unless you explicitly define an interface/type for them.

```ts
const tea = {
  name: "Masala Chai",   // inferred as string
  price: 20,             // inferred as number
  isHot: true,           // inferred as boolean
};
```

**Declaring an object type explicitly (recommended for reusability):**
```ts
type Tea = {
  name: string;
  price: number;
  isHot: boolean;
};

const t: Tea = { name: "Ginger Tea", price: 25, isHot: true };
```

**Index Signatures** (when property names are dynamic/unknown ahead of time):
```ts
type TeaRatings = {
  [flavor: string]: number; // any string key is allowed, value must be a number
};

const ratings: TeaRatings = {
  masala: 4.5,
  ginger: 5.0,
};
```

---

## 17. Duck Typing / Structural Typing

**Theory:** TypeScript follows a famous programming principle:
> "If it looks like a duck, and quacks like a duck, it's probably a duck."

This means TypeScript checks the **shape** of data, not the exact name of the type. As long as an object has *at least* the required properties, it's considered valid — **extra properties are OK.**

```ts
type Cup = { size: string };

const smallCup: Cup = { size: "200ml" };

const bigCup = { size: "500ml", material: "steel" }; // has an extra property

const anotherCup: Cup = bigCup; // ✅ totally fine!
// Because bigCup satisfies the minimum shape required by Cup.
```
**Important:** Extra properties are fine when *assigning an existing variable*. But if you write an object *literal* directly where a type is expected, TS is stricter and won't allow unknown extra properties. This behavior is called **structural typing**.

---

## 18. Utility Types

**Theory:** TypeScript ships with built-in helper types that let you transform an existing type instead of writing a brand-new one from scratch. Very common in real projects.

### `Partial<T>` — makes ALL properties optional
```ts
type Tea = { name: string; price: number; isHot: boolean };

function updateTea(updates: Partial<Tea>) {
  console.log("Updating tea with:", updates);
}
updateTea({ price: 25 }); // ✅ only one property needed, rest are optional
```

### `Required<T>` — makes ALL properties compulsory (opposite of Partial)
```ts
type Order = { name?: string; quantity?: number };

function placeOrder(order: Required<Order>) {
  console.log(order);
}
placeOrder({ name: "Masala", quantity: 2 }); // ❌ if you skip any field, it errors
```

### `Pick<T, Keys>` — select only SOME properties from a type
```ts
type Tea = { name: string; price: number; ingredients: string[] };

type BasicTeaInfo = Pick<Tea, "name" | "price">;

const info: BasicTeaInfo = { name: "Lemon Tea", price: 30 };
```

### `Omit<T, Keys>` — remove SOME properties from a type
```ts
type Tea = { name: string; price: number; secretIngredient: string };

type PublicTea = Omit<Tea, "secretIngredient">;

const pt: PublicTea = { name: "Masala Chai", price: 20 };
// secretIngredient is not needed/allowed here
```

---

## 19. Functions in TypeScript

**Theory:** A function in TS just needs two things typed:
1. What data comes **IN** (parameters).
2. What data goes **OUT** (return type).

```ts
function makeChai(type: string, cups: number): string {
  return `Making ${cups} cups of ${type} chai`;
}
```

**`void` return type** — means the function returns nothing:
```ts
function logChai(): void {
  console.log("Chai is ready");
}
```

**Optional parameters (`?`) and default values:**
```ts
function orderChai(type?: string) { /* type may be undefined */ }

function orderChai2(type: string = "masala") { /* default value used if not passed */ }
```
**Rule:** Optional or default parameters must always come **last** in the parameter list.

**Complex parameter (object) types:**
```ts
function createChai(order: {
  type: string;
  sugar: number;
  size: "small" | "large";
}): number {
  return order.sugar;
}
```
This may look scary but it's just: "the parameter is an object, and here's its exact shape."

---

## 20. Arrays, Tuples & Enums

### Arrays
**Theory:** Same as JS arrays, but you tell TS what type of items are allowed inside.

```ts
let flavors: string[] = ["masala", "ginger"];
let prices: Array<number> = [10, 20]; // alternate syntax, same meaning
let ratings: Array<number> = [4.5, 5.0];

// Array of objects
type Tea = { name: string; price: number };
const menu: Tea[] = [
  { name: "masala", price: 15 },
  { name: "ginger", price: 20 },
];
```

**Readonly Array** — cannot be modified after creation (no `.push()`, `.pop()` etc.):
```ts
const cities: readonly string[] = ["Delhi", "Jaipur"];
cities.push("Pune"); // ❌ Error
```

### Tuples
**Theory:** A tuple is like an array, but with a **FIXED number of items** and each position must have a **specific type**, in a specific order.

```ts
type ChaiTuple = [string, number]; // first item MUST be string, second MUST be number
const item: ChaiTuple = ["masala", 20]; // ✅
const wrong: ChaiTuple = [20, "masala"]; // ❌ wrong order
```

**Named Tuples** (helps readability):
```ts
type ChaiItem = [name: string, price: number];
const item2: ChaiItem = ["ginger", 25]; // now editor shows you which is which
```
⚠️ Careful: tuples are still arrays underneath, so `.push()` still technically works and can silently add extra items — a common "gotcha."

### Enums
**Theory:** An `enum` (short for "enumeration") lets you define a **fixed set of named constant values**. It's great for restricting user choice to only a few valid options.

```ts
enum CupSize {
  Small,
  Medium,
  Large,
}

let mySize: CupSize = CupSize.Large;
```

**String enums (more predictable, recommended over auto-incrementing number enums):**
```ts
enum ChaiType {
  MASALA = "masala",
  GINGER = "ginger",
}

function makeChai(type: ChaiType) {
  console.log(`Making ${type} tea`);
}
makeChai(ChaiType.MASALA); // ✅
makeChai("masala" as any); // ❌ TS won't accept raw strings, must use enum reference
```
⚠️ **Gotcha:** If you don't assign explicit values to a numeric enum, TS auto-assigns `0, 1, 2...`. This can cause silent bugs if you change the order later. **Prefer string enums** or explicit numbers for safety.

---

## 21. Object-Oriented Programming (OOP) in TypeScript

**Theory:** All OOP concepts (classes, inheritance, polymorphism) work exactly like JavaScript classes — TypeScript just adds **type safety and access control keywords** on top.

### Basic Class + Constructor
```ts
class Chai {
  flavor: string;
  price: number;

  constructor(flavor: string, price: number) {
    this.flavor = flavor;
    this.price = price;
  }
}

const myChai = new Chai("ginger", 20);
```

### Access Modifiers
**Theory:** These control WHO can access a class property/method.
- `public` (default) — accessible from anywhere.
- `private` — accessible ONLY inside the same class.
- `protected` — accessible inside the same class AND classes that extend/inherit it.

```ts
class Chai {
  public flavor: string = "masala chai";
  private secretIngredient: string = "cardamom";

  revealSecret() {
    return this.secretIngredient; // ✅ allowed, we're inside the class
  }
}

const c = new Chai();
c.flavor;          // ✅ public, accessible
c.secretIngredient; // ❌ Error, private
c.revealSecret();  // ✅ use the public method instead
```

```ts
class Shop {
  protected shopName: string = "Chai Corner";
}
class Branch extends Shop {
  getName() {
    return this.shopName; // ✅ allowed, Branch extends Shop
  }
}
const b = new Branch();
b.shopName;  // ❌ Error, not accessible from outside
b.getName(); // ✅
```

### Readonly properties (in classes)
```ts
class Cup {
  readonly capacity: number;
  constructor(capacity: number) {
    this.capacity = capacity; // can set only once, here in the constructor
  }
}
```

### Getters & Setters (controlled access)
```ts
class ModernChai {
  private _sugar: number = 0;

  get sugar() {
    return this._sugar;
  }
  set sugar(value: number) {
    if (value > 5) throw new Error("Too sweet!");
    this._sugar = value;
  }
}

const mc = new ModernChai();
mc.sugar = 2;      // uses the setter
console.log(mc.sugar); // uses the getter
```

### Static Members
**Theory:** `static` properties/methods belong to the **class itself**, not to individual objects.
```ts
class Chai {
  static shopName = "ChaiCode Cafe";
}
console.log(Chai.shopName); // accessed directly on the class, not on an instance
```

### Abstract Classes
**Theory:** An abstract class is a **blueprint** — you cannot create objects directly from it. It forces any class that extends it to implement certain methods.
```ts
abstract class Drink {
  abstract make(): void; // must be implemented by child classes
}

class MyChai extends Drink {
  make() {
    console.log("Brewing chai...");
  }
}
```

### Composition (an alternative to inheritance)
**Theory:** Instead of `extends`-ing a class, you can just **use another class as a property inside your class**. This is called "composition" — often preferred over deep inheritance chains.
```ts
class Heater {
  heat() { return "Heating..."; }
}
class ChaiMaker {
  constructor(private heater: Heater) {}
  make() {
    return this.heater.heat();
  }
}
```

---

## 22. Interfaces & Generics (Most Used Topic!)

### Interfaces for object shape
```ts
interface Chai {
  flavor: string;
  price: number;
  milk?: boolean; // optional property
}
```

### Interfaces for Functions
```ts
interface DiscountCalculator {
  (price: number): number; // describes a function signature: input & output type
}

const apply50: DiscountCalculator = (price) => price * 0.5;
```

### Interfaces for defining a "contract" (must-have methods)
```ts
interface TeaMachine {
  start(): void;
  stop(): void;
}

class NewMachine implements TeaMachine {
  start() { console.log("Starting..."); }
  stop() { console.log("Stopping..."); }
}
```
If `NewMachine` forgets to implement `start` or `stop`, TypeScript throws an error.

### Index Signatures in Interfaces
```ts
interface ChaiRating {
  [flavor: string]: number; // must always be number values
}
```

### Interface Merging
```ts
interface User { name: string; }
interface User { age: number; } // automatically merges into one User type
```

### Generics — Making Reusable Templates

**Theory:** Generics let you write a function/type that works with **any data type**, while still keeping full type safety. Think of `<T>` as a "placeholder" for whatever type you decide to use when calling the function.

```ts
function wrapInArray<T>(item: T): T[] {
  return [item];
}

wrapInArray("masala");  // returns string[]
wrapInArray(42);         // returns number[]
wrapInArray({ flavor: "ginger" }); // returns object[]
```
The function doesn't need to know ahead of time whether you'll give it a string, number, or object — `T` adapts automatically, and the return type STAYS CONSISTENT with the input type.

**Multiple generic types:**
```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
pair("masala", 20); // returns [string, number]
```

**Generic Interfaces:**
```ts
interface Box<T> {
  content: T;
}
const numberBox: Box<number> = { content: 10 };
const stringBox: Box<string> = { content: "hello" };
```

**Real-world use — API responses (VERY common in MERN projects):**
```ts
interface ApiResponse<T> {
  status: number;
  data: T;
}

const response: ApiResponse<{ flavor: string }> = {
  status: 200,
  data: { flavor: "masala" },
};
```
This pattern (`ApiResponse<T>`) is exactly how libraries like Axios, React Query etc. work internally — a generic "envelope" type wrapping your actual data type.

**Note:** Utility types like `Partial`, `Pick`, `Omit`, `Required` are actually built using generics internally, and they work fine WITH your own generics too.

---

## 23. Type Declaration Files (`.d.ts`)

**Theory:**
- `.d.ts` files contain **only type information** — NO actual running code/logic.
- These files are what give you all the auto-suggestions and error-checking in your editor for both TypeScript's own built-in features (arrays, strings, DOM) and any library you install.
- Location: found inside `node_modules/typescript/lib/*.d.ts` for TS's own built-ins.

**When installing a library, 3 possible scenarios:**
1. The library **ships its own types** (most modern libraries, e.g., Axios) — nothing extra needed.
2. The library **doesn't ship types**, but the community maintains them separately via **DefinitelyTyped**:
   ```bash
   npm install -D @types/some-library
   ```
3. Neither exists — you write your own custom `.d.ts` declaration file for that library manually.

**`import type` syntax:**
```ts
import type { AxiosResponse } from "axios"; // imports ONLY the type, not runtime code
import axios from "axios";                   // imports the actual functionality
```
This is useful because TypeScript can now be 100% sure you're not accidentally bundling unnecessary runtime code just for a type.

---

## 24. Making API Calls with Types (Axios & Fetch)

**Theory:** When your MERN app talks to a backend/API, you should always define an **interface** describing the shape of the expected data. This gives you autocomplete and catches bugs before runtime.

### Using Axios
```ts
import axios from "axios";
import type { AxiosResponse } from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchData() {
  try {
    const response: AxiosResponse<Todo> = await axios.get<Todo>(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response.data); // data is typed as `Todo`, fully autocompleted
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      if (error.response) {
        console.log(error.response.status);
      }
    }
  }
}
```

### Using native `fetch`
```ts
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  const data: Todo = await response.json();
  console.log(data);
}
```
**Key takeaway:** Axios gives you extra built-in types (`AxiosResponse`, `AxiosError`) making error handling more type-safe. Native `fetch` needs more manual type-casting since it doesn't come with as many types out-of-the-box.

---

## 25. TypeScript with React (What You Actually Need for MERN)

**Great news:** If you already know React (in JS), almost NOTHING changes syntax-wise. TypeScript just adds type safety for props, state, and events.

### Typing Component Props
```tsx
interface ChaiCardProps {
  name: string;
  price: number;
  isSpecial?: boolean; // optional
}

function ChaiCard({ name, price, isSpecial = false }: ChaiCardProps) {
  return (
    <article>
      <h2>{name} {isSpecial && <span>⭐</span>}</h2>
      <p>{price}</p>
    </article>
  );
}
```

### Typing Arrays of Props (Lists)
```tsx
// types.ts
export interface Tea {
  id: number;
  name: string;
  price: number;
}

// ChaiList.tsx
import type { Tea } from "./types";
import { ChaiCard } from "./ChaiCard";

interface ChaiListProps {
  items: Tea[];
}

export function ChaiList({ items }: ChaiListProps) {
  return (
    <div>
      {items.map((tea) => (
        <ChaiCard key={tea.id} name={tea.name} price={tea.price} />
      ))}
    </div>
  );
}
```

### Typing `useState`
```tsx
const [count, setCount] = useState<number>(0);
// TS infers this automatically most of the time, but you can be explicit for clarity
```

### Typing Forms & Events
```tsx
interface Order {
  name: string;
  cups: number;
}

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

function OrderForm({ onSubmit }: OrderFormProps) {
  const [name, setName] = useState<string>("masala");
  const [cups, setCups] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, cups });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <input
        type="number"
        value={cups}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCups(Number(e.target.value))}
      />
      <button type="submit">Place Order</button>
    </form>
  );
}
```
**Note:** User input from `<input>` fields is ALWAYS a `string` by default — even for number inputs — so you must convert it using `Number(e.target.value)`.

### `children` Prop (for wrapper/layout components)
```tsx
import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  footer?: ReactNode; // ReactNode = anything React can render (string, JSX, number...)
}

function Card({ title, children, footer }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

// usage
<Card title="Chai and TypeScript" footer={<p>Jitesh</p>}>
  <p>Some content here</p>
</Card>
```

### Custom Hooks with Generics
```ts
import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // make fetch request here and update state
  }, [url]);

  return state;
}

// usage
interface Todo { id: number; title: string; }
const { data, loading, error } = useFetch<Todo>("/api/todos/1");
```
This is the **standard template** used for building reusable data-fetching hooks in real MERN/React projects.

---

## Quick Summary Cheat Sheet

| Concept | Keyword/Syntax | When to Use |
|---|---|---|
| Basic type | `string`, `number`, `boolean` | Simple values |
| Union | `A \| B` | Value can be one of a few types |
| Intersection | `A & B` | Combine two shapes into one |
| Optional | `prop?: type` | Property may not exist |
| Readonly | `readonly prop` | Value should never change |
| Unsafe any-type | `any` | Avoid — disables type checking |
| Safe unknown-type | `unknown` | Use when type is unclear, forces checking |
| Type Assertion | `value as Type` | You know better than TS, force a type |
| Never happens | `never` | Function never returns / unreachable code |
| Object shape | `type` or `interface` | Describe data structure |
| Function contract | `interface { (): type }` | Function signatures |
| Reusable template | `<T>` Generics | Same logic, different data types |
| Partial fields | `Partial<T>` | Make all props optional |
| All fields required | `Required<T>` | Make all props compulsory |
| Select fields | `Pick<T, "a" \| "b">` | Choose only some properties |
| Remove fields | `Omit<T, "a">` | Remove some properties |
| Class access | `public`, `private`, `protected` | Control property visibility |
| Type-only import | `import type {...}` | Import just for typing, no runtime code |

---

**Final tip from the course:** You don't need extra "React + TypeScript" or "Next.js + TypeScript" courses. If you understand everything above, you already know how to apply TypeScript anywhere — React, Node/Express, Next.js — because the underlying JavaScript logic never changes; only the type annotations are added on top.
