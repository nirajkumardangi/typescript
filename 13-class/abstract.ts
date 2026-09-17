// Abstract Classes: An abstract class is a base class that cannot be instantiated directly. It can have abstract methods (methods without implementation) that subclasses MUST implement.

abstract class Shape {
  constructor(public color: string) {}

  // Abstract method — subclass MUST implement this
  abstract getArea(): number;

  // Regular method — subclass inherits this
  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

// const shape = new Shape("red"); // ❌ ERROR: Cannot create an instance of an abstract class

class Circle extends Shape {
  constructor(
    color: string,
    public radius: number,
  ) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public width: number,
    public height: number,
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle("red", 10);
console.log(circle.describe()); // "A red shape with area 314.159..."


// Static Members: Properties and methods that belong to the class itself, not to instances.

class MathHelper {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathHelper.PI * radius ** 2;
  }
}

// Access without creating an instance:
console.log(MathHelper.PI);              // 3.14159
console.log(MathHelper.circleArea(10));  // 314.159