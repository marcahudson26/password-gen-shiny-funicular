const generateBtn = document.querySelector("#generate")

// Array of special characters to be included in password
const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Array of lowercase characters to be included in password
const lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// Array of uppercase characters to be included in password
const upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function getRandom(arr) {
  const index = Math.floor(Math.random() * arr.length);
  const character = arr[index]
  return character
}
//This function will check the users input and generate a password from the prompts, alerts and confirms
function generatePassword () {
  let password = "";

  // get prompts
  const passwordLength = Number(prompt("How many characters? (At least 10 characters but no more than 64)", 10))
  // this check's that if the user input is NaN to display the message then return 
  if (isNaN(passwordLength)) {
    alert("Need to specify a number for character count")
    return
  }
  //This checks if the number inputted has a decimal the message is displayed then return
  if (Math.floor(passwordLength) !== passwordLength) {
    alert("Need to specify an integer for character count")
    return;
  }
  //This checks if the input is less than 10 to display message then return 
  if (passwordLength < 10) {
    alert("Need to specify a character count greater than or equal to 10")
    return
  }
  //This checks if the input is more tha 64 to display message then return 
  if (passwordLength > 64) {
    alert("Need to specify a character count fewer than or equal to 64")
    return
  }

  const hasLowercase = confirm("use lowercase characters")
  const hasUppercase = confirm("use uppercase characters")
  const hasNumeric = confirm("use numerical characters")
  const hasSpecial = confirm("use a special characters")
  //This checks if all confirms are not selected then to display the message then return
  if (!hasLowercase && !hasUppercase && !hasNumeric && !hasSpecial) {
    alert("Need to specify at least one character set")
    return
  }

  // This makes sure at least one types exist in string
  if (hasSpecial) {
    password = password + getRandom(specialCharacters)
  }
  if (hasNumeric) {
    password = password + getRandom(numericCharacters)
  }
  if (hasLowercase) {
    password = password + getRandom(lowerCasedCharacters)
  }
  if (hasUppercase) {
    password = password + getRandom(upperCasedCharacters)
  }
  const howManyCharactersSoFar = password.length

  // This generates  a password
  for (let i = 0; i < passwordLength - howManyCharactersSoFar; i++) {
    let allowedCharacters = [];
    if (hasSpecial) {
      allowedCharacters = allowedCharacters.concat(specialCharacters)
    }
    if (hasNumeric) {
      allowedCharacters = allowedCharacters.concat(numericCharacters)
    }
    if (hasLowercase) {
      allowedCharacters = allowedCharacters.concat(lowerCasedCharacters)
    }
    if (hasUppercase) {
      allowedCharacters = allowedCharacters.concat(upperCasedCharacters)
    }
    const allowed = getRandom(allowedCharacters);
    password = password + allowed
  }
  

  // shuffle password to make sure beginning characters are not predictable
  password = password.split("").sort(() => 0.5 - Math.random()).join("")

  return password
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword()
  if (!password) {
    return
  }

  let passwordText = document.querySelector('#password');
  passwordText.value = password;
}

generateBtn.addEventListener('click', writePassword)
