class Animal {
  constructor(
    public name: string,
    protected sound: string,
  ) {}

  makeSound(): string {
    return `${this.name} says ${this.sound}`;
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name, "Woof!"); // Call parent constructor
  }

  // Additional method
  fetch(): string {
    return `${this.name} fetches the ball!`;
  }

  // Override parent method
  makeSound(): string {
    return `${this.name} barks: ${this.sound}`; // Can access 'sound' because it's protected
  }
}

const dog = new Dog("Buddy");
console.log(dog.makeSound()); // "Buddy barks: Woof!"
console.log(dog.fetch()); // "Buddy fetches the ball!"
