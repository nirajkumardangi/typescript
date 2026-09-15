type Person = {
   name: string;
   age: number;
};

type Employee = {
   company: string;
   role: string;
};

// Intersection: must have ALL properties from BOTH types
type WorkingPerson = Person & Employee;

const worker: WorkingPerson = {
   name: "Alice",
   age: 30,
   company: "Google",
   role: "Developer",
};

console.log(worker); // { name: 'Alice', age: 30, company: 'Google', role: 'Developer' }

// Missing any property would cause an error:
const worker2: WorkingPerson = { name: "Bob", age: 25 }; // ❌ Missing company and role
