// Intersection types
type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Joel',
  privileges: ['create-server'],
  startDate: new Date(),
}

// This could have been a series of interfaces since they are very similar

type Combinable = string | number
type Numeric = number | boolean

// becomes number type because that is the only intersection
type Universal = Combinable & Numeric

/////// Type Guards ///////
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { // <-- type guard with `typeof` keyword
    return a.toString() + b.toString()
  }
  return a + b
}

type UnknownEmployee = Employee| Admin

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name)
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges)
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate)
  }
}

printEmployeeInformation(e1)
printEmployeeInformation({name: 'Yesenia', startDate: new Date()})

class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  if (vehicle instanceof Truck) { // Because this is a class this will work, but not for Interfaces
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1)
useVehicle(v2)

////// Discriminated Unions //////
interface Bird {
  type: 'bird'
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  let speed
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break
    case 'horse':
      speed = animal.runningSpeed
      break
  }
  console.log('Moving at speed: ' + speed)
}

moveAnimal({type: 'horse', runningSpeed: 10}) // interpreter knows that `runningSpeed` is not an available property on type `Bird`

////// Type Casting //////
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')! // needs `!` at the end to ensure the compiler that this will never return null
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement // alertnative to <HTMLInputElement>
const userInputElement = document.getElementById('user-input') // otherwise, this must be declared and issues clarified in if conditional below

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!'
}

////// Index Properties //////
interface ErrorContainer { // { email 'Not a valid email', username: 'Must start with a character!'}
  [prop: string]: string
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
}

////// Function Overloads //////
function addAgain(a: number, b: number): number;
function addAgain(a: string, b: string): string;
function addAgain(a: string, b: number): string;
function addAgain(a: number, b: string): string;
// function overloads (the 4 lines above) clarify what potential types you expect when the code is converted to JS
function addAgain(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { // <-- type guard with `typeof` keyword
    return a.toString() + b.toString()
  }
  return a + b
}

const result = addAgain('Joel', 'Grissom')
result.split(' ') // doesn't work, because it is of Combinable type, which doesn't have a .split() method

////// Optional Chaining //////
const fetchedUserData = {
  id: 'u1',
  name: 'Joel',
  job: { title: 'CEO', description: 'My own company' }
}

console.log(fetchedUserData?.job?.title);

////// Nullish Coalescing //////
const userInput = undefined

const storedData = userInput ?? 'DEFAULT'

console.log(storedData);


