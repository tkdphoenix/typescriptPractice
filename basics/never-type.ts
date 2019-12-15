let userInput: unknown
let userName: string

userInput = 5
userInput = 'Joel'
if (typeof userInput === 'string') {
  userName = userInput
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code }
  // while(true) {} // this will also never return and essentially crashes your script
}

generateError('An error occurred!', 500)