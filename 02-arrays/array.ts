// Syntax 1: type[]
let fruits: string[] = ["apple", "banana", "mango"];
let scores: number[] = [10, 20, 30];
let flags: boolean[] = [true, false, true];


// Syntax 2: Array<type> (Generic syntax — same result)
let cities: Array<string> = ["Delhi", "Mumbai", "Pune"];
let prices: Array<number> = [100, 200, 300];


// Adding elements
fruits.push("orange"); // ✅ Works
fruits.push(42); // ❌ ERROR: number is not assignable to string


// Mixed type array (using union)
let mixed: (string | number)[] = ["hello", 42, "world", 100];
let student: (number | boolean)[] = [true, 23, [true]]; // ❌ ERROR: Type [true] is not assignable to type number | boolean
