abstract class Department {
  static fiscalYear = 2020
  protected employees: string[] = []

  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name: name }
  }

  abstract describe(this:Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT')
    this.admins = admins
  }

  describe() {
    console.log('IT Department - ID: ' + this.id )
  }
}

class AccountingDepartment extends Department {
  private lastReport: string
  private static instance: AccountingDepartment // to create a signleton in the `getInstance()` method

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(value)
  }

  // constructor is private because AccountingDepartment is a Singleton class
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  // Singleton pattern
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('d3', [])
    return this.instance
  }

  describe() {
    console.log('Accounting Department - ID: ', this.id)
  }

  addEmployee(name: string) { // Overrides the addEmployee method from the Department class.
    if (name === 'Max') {
      return
    }
    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

const it = new ITDepartment('d1', ['Bill'])

const employee1 = Department.createEmployee('Joel')
console.log('new employee: ', employee1, Department.fiscalYear) // don't have to instantiate the class with the `new` keyword since it is a static method

it.addEmployee('Mike')
it.addEmployee('Lisa')

it.describe()
it.printEmployeeInformation()

console.log(it)

// const accounting = new AccountingDepartment('d2', []) // this became a Singleton instance, so isn't necessary anymore
const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance() // this is exactly the same as the line above. Only one instance

console.log(accounting, accounting2)

accounting.mostRecentReport = 'Year End Report'
accounting.addReport('Something went wrong...')
console.log(accounting.mostRecentReport)

accounting.addEmployee('Max')
accounting.addEmployee('Manny')

// accounting.printReports()
// accounting.printEmployeeInformation()
accounting.describe()


