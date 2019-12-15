// const person: {
//   name: string
//   age: number
//   hobies: string[]
//   role: [number, string]
// } = {
//   name: 'Joel',
//   age: 49,
//   hobies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// }

// const ADMIN = 0
// const READ_ONLY = 1
// const AUTHOR = 2

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
} 
// can be any basic type, but default is to increment from 0 
// or you can set value of one and the rest increment, 
// or you can set the value of each one as you see fit.

const person = {
  name: 'Joel',
  age: 49,
  hobies: ['Sports', 'Cooking'],
  role: Role.ADMIN
}

// person.role.push('admin')
// person.role[1] = 10

// person.role = [0, 'admin']

let favoriteActivities: string[]
favoriteActivities = ['Sports']

console.log(person.name)

for (const hobby of person.hobies) {
  console.log(hobby)
}

if (person.role === Role.AUTHOR) {
  console.log('is author')
}
