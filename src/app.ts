class Department {
  private employees: string[] = []

  constructor(private readonly id: string, public name: string) {}

  describe() {
    console.log(`Department (${this.id}: ${this.name})`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

const accounting = new Department('d1', 'Accounting')

accounting.addEmployee('Joelito')
accounting.addEmployee('Yesenia')

accounting.describe()
accounting.printEmployeeInformation()