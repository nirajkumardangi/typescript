// Type inference means TypeScript automatically guesses the type of a variable based on the value you assign to it. 

// You DON'T write the type, but TypeScript figures it out:
let city = "Mumbai";        // TypeScript infers: string
let count = 42;             // TypeScript infers: number
let isActive = true;        // TypeScript infers: boolean

// Now if you try to change the type, it will still show an error:
city = 100; // ❌ ERROR: Type 'number' is not assignable to type 'string'
count = "hey";