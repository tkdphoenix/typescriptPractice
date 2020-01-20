////// Generic Functions and Contraints //////

// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB)
// }

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Joel', hobbies: ['Hiking']}, {age: 49})

mergedObj.name
console.log(mergedObj)

/* prior to this, we could not get name or age, because these properties don't exist on type Object. 
 * Now that it uses generics to make the intersection of T & U we can utilize all the properties of the mergedObj
 */
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));

////// "keyof" Constraint //////
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key]
}

console.log(extractAndConvert({name: 'Joel'}, 'name'))

////// Generic Classes //////
class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Joel')
textStorage.addItem('Yesenia')
textStorage.removeItem('Joel')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()

// const objStorage = new DataStorage<object>()
// objStorage.addItem({name: 'Joel'})
// objStorage.addItem({name: 'Yesenia'})
// objStorage.removeItem({name: 'Joel'})
// console.log(objStorage.getItems());
/* The above won't work, unless you create a constant to hold the specific object for a person's name, 
 * otherwise JS thinks it is a regular object, and returns -1, which gives unexpected results 
 * with objects. It will remove the last person, because -1 means it starts at the end of the Array.
 * This is why we are explicit in the top of the DataStorage class to only allow certain types.
 */

////// Generic Utility Types (Partial and Readonly) //////
interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
  ): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Joel', 'Yesenia']
// names.push('Faith') // Not allowed with Readonly type
// names.pop()
