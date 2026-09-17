// Basic Class

class User {
  // You must declare properties with types
  name: string;
  age: number;
  email: string;

  // Constructor
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  // Method
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

const user = new User("Alice", 25, "alice@mail.com");
console.log(user.greet());



//==> Access Modifiers: TypeScript has three access modifiers that control where properties/methods can be accessed:

class Employee {
  public name: string; // Accessible everywhere (default)
  private salary: number; // Accessible ONLY inside this class
  protected department: string; // Accessible inside this class AND subclasses

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  // Public method — accessible everywhere
  public getInfo(): string {
    return `${this.name} works in ${this.department}`;
  }

  // Private method — only accessible inside this class
  private calculateBonus(): number {
    return this.salary * 0.1;
  }

  // Public method that uses private data
  public getBonus(): number {
    return this.calculateBonus();
  }
}

const emp = new Employee("Alice", 100000, "Engineering");
console.log(emp.name); // ✅ Public — works
console.log(emp.salary); // ❌ ERROR: 'salary' is private
console.log(emp.department); // ❌ ERROR: 'department' is protected
console.log(emp.getBonus()); // ✅ Public method works



//==> Shorthand Constructor (Parameter Properties): Instead of declaring properties AND assigning them in the constructor, you can do both at once:

class Product {
  // TypeScript shorthand — declare and assign in one step
  constructor(
    public name: string,
    public price: number,
    private category: string,
    readonly id: number, // readonly = can't be changed after creation
  ) {
    // No need for this.name = name, etc. — TypeScript does it automatically!
  }

  getDetails(): string {
    return `${this.name} - $${this.price} [${this.category}]`;
  }
}

const laptop = new Product("MacBook", 2000, "Electronics", 1);
console.log(laptop.name); // ✅
laptop.id = 2; // ❌ ERROR: readonly
