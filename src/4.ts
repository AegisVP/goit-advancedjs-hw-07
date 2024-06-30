class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random() * 1000;
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey() {
    return this.key;
  }
}

abstract class House {
  protected tenants: Person[] = [];
  public door: boolean = false;

  constructor(protected key: Key) {}

  comeIn(person: Person) {
    if (this.door) {
      this.tenants.push(person);
      console.log('Welcome home. There are now ' + this.tenants.length + ' tenants');
      return;
    }
    console.log("Door closed, can't come in");
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  openDoor(key: Key) {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('Door opened');
      return;
    }
    console.log('Wrong key');
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
