// Implementing Interfaces: Classes can implement interfaces — meaning they promise to follow the interface's structure.

interface Printable {
  print(): void;
}

interface Saveable {
  save(): boolean;
}

class Docs implements Printable, Saveable {
  constructor(
    public title: string,
    public content: string,
  ) {}

  print(): void {
    console.log(`Printing: ${this.title}`);
  }

  save(): boolean {
    console.log(`Saving: ${this.title}`);
    return true;
  }
}

let documnet = new Docs(
  "Rich Dad Poop Dad",
  "This book is about to business mindset",
);

console.log("TITLE: ", documnet.title);
console.log("CONTENT: ", documnet.content);
