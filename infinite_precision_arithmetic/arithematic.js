/*task is to create a function that will perform addition on two array and return an array with the result
 * @author Sagar
 */


/** checkArrayElement will check for the value inside the array
 * @param {[]} arrayInput array you want to check 
 * @param {Number} length length of the array
 * @throws {Error} Value is not integer
 * @throws {Error} value is not a number 
 */
function checkArrayElement(arrayInput, length) {
    // loop through array and check if each element is number and less then 9
    for (let i = 0; i < length; i++) {
        if (typeof arrayInput[i] != "number") {
            throw new Error("Value should be a number ")
        }
        else if (arrayInput[i] % 1 != 0) {
            throw new Error("Only integer should be passed")
        }
        else if (arrayInput[i] > 9) {
            throw new Error("Number cannot be greater then 9")
        }
    }

}

/** takeInput will take input of 2 arrays and will check if input is correct or not
 * @param {[]} firstNumberArray represents the first array 
 * @param {[]} secondNumberArray represent the second array
 * @throws {Error} no value passed (undefined)
 */
function takeInput(firstNumberArray, secondNumberArray, maxArray, minArray) {
    // throw error when number input is not a number
    if (firstNumberArray == undefined || secondNumberArray == undefined) {
        throw new Error("Array not passed")

    }
    else {
        // for checking the first number array
        checkArrayElement(firstNumberArray, firstNumberArray.length)
        // for checking the second number array
        checkArrayElement(secondNumberArray, secondNumberArray.length)
    }
    // optional argument will return sign to indicate maximum between two array
    if (maxArray && minArray) {
        if (firstNumberArray.length > secondNumberArray.length) {
            maxArray.length = 0
            minArray.length = 0
            maxArray.push(...firstNumberArray)
            minArray.push(...secondNumberArray)
            return 1


        }
        else if (firstNumberArray.length == secondNumberArray.length) {
            let lengthOfArray = 0
            let numberFromArrayOne = 0
            let numberFromArrayTwo = 0
            while (lengthOfArray != (firstNumberArray.length)) {
                numberFromArrayOne = numberFromArrayOne * 10 + firstNumberArray[lengthOfArray]
                numberFromArrayTwo = numberFromArrayTwo * 10 + secondNumberArray[lengthOfArray]
                lengthOfArray++

            }
            if (numberFromArrayOne > numberFromArrayTwo) {
                maxArray.length = 0
                minArray.length = 0
                maxArray.push(...firstNumberArray)
                minArray.push(...secondNumberArray)
                return 1
            }
            else {
                maxArray.length = 0
                minArray.length = 0
                minArray.push(...firstNumberArray)
                maxArray.push(...secondNumberArray)
                return -1


            }

        }
        else {

            maxArray.length = 0
            minArray.length = 0
            maxArray.push(...secondNumberArray)
            minArray.push(...firstNumberArray)
            return -1

        }
    }



}

/** add the array and return the resultant array
 * 
 * @param {[]} firstArray array you want to add 
 * @param {[]} secondArray array you want to add with
 * @returns {[]} resultant array
 * @throws {Error} Value is not integer
 * @throws {Error} value is not a number 
 * @throws {Error} no value passed (undefined)
 */
function addArray(firstArray, secondArray) {
    takeInput(firstArray, secondArray)

    // make a while loop that will add the last element of array and update the position of arrays index using 2 pointers
    let firstPointer = firstArray.length - 1
    let secondPointer = secondArray.length - 1

    let resultant = []
    let carry = 0


    while (firstPointer >= 0 && secondPointer >= 0) {
        let sum = firstArray[firstPointer] + secondArray[secondPointer] + carry
        // console.log(sum);

        if (sum > 9) {
            carry = Math.floor(sum / 10)
            resultant.unshift(sum % 10)

        }
        else {

            resultant.unshift(sum)
            carry = 0


        }
        firstPointer = firstPointer - 1
        secondPointer = secondPointer - 1


    }
    // find the remaining array from the two array by comparing the pointer length


    let remainingArray = firstPointer >= 0 ? firstArray : secondArray
    let remainingLength = firstPointer >= 0 ? firstPointer : secondPointer


    // pushing the remaining array to the resultant
    for (let i = remainingLength; i >= 0; i--) {
        if (carry + remainingArray[i] > 9) {
            carry = Math.floor((carry + remainingArray[i]) / 10)
            resultant.unshift((carry + remainingArray[i]) % 10)
        }
        else {
            resultant.unshift(carry + remainingArray[i])
            carry = 0
        }
    }
    // if carry is still remaining 
    if (carry > 0) {
        resultant.unshift(carry)
    }



    // resultant.pop()
    return resultant
}


// console.log(addArray([9,9,9],[1]))

/** subtract two array and return resultant array
 * 
 * @param {[]} firstArray enter the first array
 * @param {[]} secondArray enter the second array
 * @returns {[]} resultant array
 *  @throws {Error} Value is not integer
 * @throws {Error} value is not a number 
 * @throws {Error} no value passed (undefined)
 */
function subtractArray(firstArray, secondArray) {
    // maxArray will store the maximum number of two array
    // minArray will store the minimum number of two array

    let maxArray = []
    let minArray = []

    //resultant for storing the the result of operation
    let resultant = []

    //check for input and also which array is maximum or minimum
    // sign represent if we are subtracting a larger number from smaller number
    let sign = takeInput(firstArray, secondArray, maxArray, minArray)


    // to store the carry value after subtraction 
    let carry = 0
    //using 2 pointer approch
    let maxArrayPointer = maxArray.length - 1
    let minArrayPointer = minArray.length - 1
    // taking a carry which will add to the next number 
    // if number is smaller then it will add 10 to it so subtraction
    while (minArrayPointer >= 0) {
        if (minArray[minArrayPointer] > (maxArray[maxArrayPointer] + carry)) {
            maxArray[maxArrayPointer] = 10 + (maxArray[maxArrayPointer] + carry)
            carry = -1
            resultant.unshift(maxArray[maxArrayPointer] - minArray[minArrayPointer])



        }
        else {
            resultant.unshift(((maxArray[maxArrayPointer] + carry) - minArray[minArrayPointer]))
            carry = 0
        }
        minArrayPointer--
        maxArrayPointer--
    }
    // for remaining element
    for (let i = maxArrayPointer; i >= 0; i--) {
        if (carry + maxArray[i] >= 0) {
            resultant.unshift(carry + maxArray[i])
            carry = 0

        }
        else {
            resultant.unshift(9)
        }
    }
    // for removing leading zeros

    while (resultant[0] == 0) {
        resultant.shift()
    }
    // if we are subtracting larger number from smaller then add a -ve sign 
    if (sign == -1) {
        resultant.unshift("-")
    }

    return resultant




}



/** multiply two array and return resultant array
 * @param {[]} firstArray array to multiply
 * @param {[]} secondArray array to multiply with
 * @returns {[]} multiplication of two array
 *  @throws {Error} Value is not integer
 * @throws {Error} value is not a number 
 * @throws {Error} no value passed (undefined)
 */
function multiplication(firstArray, secondArray) {
    // create a resultant array which will store the result of operations
    let resultant = []
    // call takeInput to validate the arrays
    takeInput(firstArray, secondArray)
    //find the integer number from second array
    let lengthOfArray = 0
    let numberFromArray = 0
    if (secondArray.length > 7) {
        throw new Error("Number too large cannot perform such long operation." +
            "Optimised function in progress")
    }
    while (lengthOfArray != (secondArray.length)) {
        numberFromArray = numberFromArray * 10 + secondArray[lengthOfArray]
        lengthOfArray++

    }
    // multiply by continuously calling the addArray function and adding

    for (let i = 0; i < numberFromArray; i++) {

        resultant = addArray(resultant, firstArray)
    }


    return resultant
}



/** Utility function, let you perform all arithmetic operation and log the output
 * 
 * @param {[]} firstArray First array to input 
 * @param {*} secondArray Second array to input
 * @param {String} arithmeticOperation  Operation you want to perform
 * 
 */
function doArithmeticOperation(firstArray, secondArray, arithmeticOperation) {
    // create a resultant array which will store the resultant
    // of the arithmetic operations
    let resultantArray = []

    // check for the given input of arithmetic operator and perform operation
    switch (arithmeticOperation) {
        // handel the case for negative number array and call function accordingly
        // remove the '-' sign from the array and perform specified operation 
        // add sign at last accordingly
        case '-':
            if (firstArray[0] == '-' && secondArray[0] == '-') {
                firstArray.shift()
                secondArray.shift()
                resultantArray = subtractArray(secondArray, firstArray)
                console.log(resultantArray);
            }
            else if (firstArray[0] == '-') {
                firstArray.shift()
                resultantArray = addArray(firstArray, secondArray)
                resultantArray.unshift('-')
                console.log(resultantArray);


            }
            else if (secondArray[0] == '-') {
                secondArray.shift()
                resultantArray = addArray(firstArray, secondArray)
                console.log(resultantArray);
            }
            else {
                resultantArray = subtractArray(firstArray, secondArray)
                console.log(resultantArray);

            }

            break;
        case '+':
            if (firstArray[0] == '-' && secondArray[0] == '-') {
                firstArray.shift()
                secondArray.shift()
                resultantArray = addArray(firstArray, secondArray)
                resultantArray.unshift('-')
                console.log(resultantArray);
            }
            else if (firstArray[0] == '-') {
                firstArray.shift()
                resultantArray = subtractArray(secondArray, firstArray)
                console.log(resultantArray);

            }
            else if (secondArray[0] == '-') {
                secondArray.shift()
                resultantArray = subtractArray(firstArray, secondArray)
                console.log(resultantArray);
            }
            else {
                resultantArray = addArray(firstArray, secondArray)
                console.log(resultantArray);
            }
            break
        case '*':
            if (firstArray[0] == '-' && secondArray[0] == '-') {
                firstArray.shift()
                secondArray.shift()
                resultantArray = multiplication(firstArray, secondArray)
                console.log(resultantArray);
            }
            else if (firstArray[0] == '-') {
                firstArray.shift()
                resultantArray = multiplication(firstArray, secondArray)
                resultantArray.unshift('-')
                console.log(resultantArray);
            }
            else if (secondArray[0] == '-') {
                secondArray.shift()
                resultantArray = multiplication(firstArray, secondArray)
                resultantArray.unshift('-')
                console.log(resultantArray);
            }
            else {
                resultantArray = multiplication(firstArray, secondArray)
                console.log(resultantArray);
            }
            break
        case '/':
            console.log("Work in Progress");
            break
        // if any other operator is getting input then throw error    
        default:
            throw new Error("Arithmatic operation not correct " +
                "give appropriate input('+' , '-' , '*', '/')")
            break;
    }
}

/**
 * 
 * @param {[]} firstArray input array 1 
 * @param {[]} secondArray input array 2
 * @returns {[]} resultant array after division
 */
function division(firstArray, secondArray) {

    return []
}

try {

    doArithmeticOperation([1, 9, 2, 4], [4, 5, 6], '+')

    doArithmeticOperation([1, 2, 3, 4], [1, 2, 3], '-')

    doArithmeticOperation([1, 0, 0, 0], [1], '-')

    doArithmeticOperation(['-', 1, 2, 3, 4], ['-', 1, 2, 3], '-')

    doArithmeticOperation([1, 2, 3, 4], [1, 2, 3], '*')

    doArithmeticOperation([1, 2, 3, 4], [1, 2, 3], '+')
} catch (error) {
    console.log(error);

}
finally {
    console.log("Done with the program");
}