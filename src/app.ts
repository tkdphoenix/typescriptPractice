// type AddFn = (a: number, b: number) => number
interface AddFn {
  (a: number, b: number): number
}

let add: AddFn

add = (n1: number, n2: number) => {
  return n1 + n2 
}
interface Named {
  readonly name?: string
  outputName?: string // optional parameter with `?`
}

interface Greetable extends Named {
  // because this is an interface, the `readonly` keyword is used because access modifiers like `private` or `public` are not allowed
  readonly name?: string
  
  greet(phrase: string): void
}

class Person  implements Greetable {
  name?: string // the interface makes `name` an optional parameter, so it must be optional here and in the constructor parameter
  age: number = 49

  constructor(n?: string) {
    if (n) {
      this.name = n
    }
  }

  greet(phrase: string) {
    if (this.name) { // `this.name` is optional, so that is handled here
    console.log(`${phrase} ${this.name}`)
    } else {
      console.log('Hi!')
    }
  }
}

let user1: Greetable


user1 = new Person()
// user1.name = 'Bill' // This is a readonly property, so produces an error

user1.greet('Hi there - I am')
console.log(user1)