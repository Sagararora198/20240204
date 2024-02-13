/* Class-based implementation of an infinite precision Integer. */
//equals function and all other function to integrate here
class InfiniteNumber {

	/** An internal member Array to contain the digits of the Infinite Integer.
	 * @private
	 * @type {Array<Number>}
	 */
	_internalArray = []

	constructor(inputObject) {

		if (typeof inputObject === "number") {
			if (inputObject === NaN) {
				return new Error("Not a valid number")
			}
			if (inputObject % 1 != 0) {
				return new Error("Only integers are allowed")
			}
			else if (inputObject < 0) {
				return new Error("Cannot handel negative data")
			}
			let tempArray = []
			if (inputObject == 0) {
				tempArray = [0]
			}
			else {
				while (inputObject != 0) {
					tempArray.unshift((inputObject % 10))
					inputObject = inputObject / 10
				}
			}

			// deep copy 
			// initialize the member array
			this._internalArray = [...tempArray]


		} else if (typeof inputObject === "string") {
			// console.log("You sent a String")

			// TODO validate the String and only then initialize the _internalArray
			let tempArray = []

			let numberPattern = /^[0-9]+$/
			if (numberPattern.test(inputObject) == false) {
				return new Error("Value other then integer are not allowed")
			}
			if ((parseFloat(inputObject)) % 1 != 0) {
				return new Error("Only integer are allowed")
			}
			else {
				if (parseInt(inputObject) == 0) {
					tempArray = [0]
				}
				else {
					inputObject = parseInt(inputObject)

					while (inputObject != 0) {
						tempArray.push((inputObject % 10))
						inputObject = inputObject / 10
					}
				}
			}


			// initialize the member array
			this._internalArray = [...tempArray]




		} else if (typeof inputObject === "object") {
			if (Array.isArray(inputObject)) {
				for (let i = 0; i < inputObject.length; i++) {
					if (typeof inputObject[i] != 'number') {
						return new Error("Only number in array are allowed")

					}


					else if (inputObject[i] % 1 != 0) {
						return new Error("Only integers array are allowed")
					}
					else if (inputObject[i] < 0) {
						return new Error("Only positive integers are allowed")
					}

				}
				this._internalArray = [...inputObject]
			}
			else {
				if (inputObject == null) {
					return new Error("Null passed")
				}
				let tempArray = []
				for (const key in inputObject) {
					if (Object.hasOwnProperty.call(object, key)) {
						const element = object[key];
						if (typeof element != 'number') {
							return new Error("Only number in array are allowed")
						}
						else if (element % 1 != 0) {
							return new Error("Only integers array are allowed")
						}
						else if (element < 0) {
							return new Error("Only positive integers are allowed")
						}
						tempArray.unshift(element)

					}
				}
				this._internalArray = [...tempArray]
			}



			// TODO check if this object has getInternalArray() and make a deep copy
			// and assign it to local _internalArray




		} else {


			throw new Error(`Constuctor of IniniteNumber does not support this data`
				+ ` type ${typeof inputObject}`)
		}

	}

	/** Helper method to return the _internalArray variable which contains the
	 * Inifnite precision Integer.
	 * @returns {Array<Number>} the internal array representing individual digits
	 */
	getInternalArray() {

		return this._internalArray
	}

	/** Helper method to return the representation of this Infinite Precision
	 * 
	 * 
	 */
	getNumberAsString() {


		return this._internalArray.join('')
	}

	// add two arrays
	/** add two infinite numbers and returns a infinite number
	 * 
	 * @param {InfiniteNumber} infiniteNumber a infinite number type of data
	 * @returns {InfiniteNumber} resultent infinite number after addition
	 */
	addInfiniteNumber(infiniteNumber) {
		let firstInfiniteArray = this.getInternalArray()
		let secondInfiniteArray = infiniteNumber.getInternalArray()

		// output infinite number

		// make a while loop that will add the last element of array and update the position of arrays index using 2 pointers
		let firstPointer = firstInfiniteArray.length - 1
		let secondPointer = secondInfiniteArray.length - 1

		let resultant = []
		let carry = 0


		while (firstPointer >= 0 && secondPointer >= 0) {
			let sum = firstInfiniteArray[firstPointer] + secondInfiniteArray[secondPointer] + carry
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


		let remainingArray = firstPointer >= 0 ? firstInfiniteArray : secondInfiniteArray
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
		let resultantInfiniteArray = new InfiniteNumber(resultant)



		return resultantInfiniteArray
	}
	/**subtract two infinite numbers
	 * 
	 * @param {InfiniteNumber} infiniteNumber input infinite number
	 * @returns {InfiniteNumber} resltant infinite number
	 */
	subtractInfiniteArray(infiniteNumber) {
		let firstInfiniteArray = this.getInternalArray()
		let secondInfiniteArray = infiniteNumber.getInternalArray()

		
		if(this.compareTwoInfiniteNumber(infiniteNumber)){

			//resultant for storing the the result of operation
			let resultant = []
	
			// to store the carry value after subtraction 
			let carry = 0
			//using 2 pointer approch
			let maxArrayPointer = firstInfiniteArray.length - 1
			let minArrayPointer = secondInfiniteArray.length - 1
			// taking a carry which will add to the next number 
			// if number is smaller then it will add 10 to it so subtraction
			while (minArrayPointer >= 0) {
				if (secondInfiniteArray[minArrayPointer] > (firstInfiniteArray[maxArrayPointer] + carry)) {
					firstInfiniteArray[maxArrayPointer] = 10 + (firstInfiniteArray[maxArrayPointer] + carry)
					carry = -1
					resultant.unshift(firstInfiniteArray[maxArrayPointer] - secondInfiniteArray[minArrayPointer])
	
	
	
				}
				else {
					resultant.unshift(((firstInfiniteArray[maxArrayPointer] + carry) - secondInfiniteArray[minArrayPointer]))
					carry = 0
				}
				minArrayPointer--
				maxArrayPointer--
			}
			// for remaining element
			for (let i = maxArrayPointer; i >= 0; i--) {
				if (carry + firstInfiniteArray[i] >= 0) {
					resultant.unshift(carry + firstInfiniteArray[i])
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
			let resultantInfiniteArray = new InfiniteNumber(resultant)
			return resultantInfiniteArray
		}
		else{
			return new Error("The second number cannot be greater then first")
		}

	}

	/** multiply two infinite numbers
	 
	 * @param {InfiniteNumber} infiniteNumber input infinite number 
	 * @returns {InfiniteNumber} resultant infinite number 
	 */
	multiplyInfiniteNumber(infiniteNumber) {
		let firstInfiniteNumber = this.getInternalArray()
		let secondInfiniteNumber = infiniteNumber.getInternalArray()

		
		
		// //find the integer number from second array
		let lengthOfArray = 0
		let numberFromArray = 0
		if (secondInfiniteNumber.length > 7) {
			throw new Error("Number too large cannot perform such long operation." +
				"Optimised function in progress")
		}
		while (lengthOfArray != (secondInfiniteNumber.length)) {
			numberFromArray = numberFromArray * 10 + secondInfiniteNumber[lengthOfArray]
			lengthOfArray++

		}
		// // multiply by continuously calling the addArray function and adding

		// let resultantInfiniteArray = new InfiniteNumber(firstInfiniteNumber)
		// console.log(numberFromArray);
		let resultantInfiniteArray = new InfiniteNumber(firstInfiniteNumber)
		for (let i = 0; i < numberFromArray-1; i++) {

			resultantInfiniteArray = this.addInfiniteNumber(resultantInfiniteArray)
			//  resultant = addArray(resultant, firstInfiniteNumber)
		}


		return resultantInfiniteArray
	}
	/** compare the two infinite numbers 
	 * 
	 * @param {InfiniteNumber} infiniteNumber input infinite number
	 * @returns {Boolean} true if the calling infinite number is greater flase if not
	 */
	compareTwoInfiniteNumber(infiniteNumber){
		// get arrays from both object
		let firstInfiniteArray = this.getInternalArray()
		let secondInfiniteArray = infiniteNumber.getInternalArray()

		//compare
		if (firstInfiniteArray.length > secondInfiniteArray.length) {
			 return true



		}
		else if (firstInfiniteArray.length == secondInfiniteArray.length) {
			let lengthOfArray = 0
			let numberFromArrayOne = 0
			let numberFromArrayTwo = 0
			while (lengthOfArray != (firstInfiniteArray.length)) {
				numberFromArrayOne = numberFromArrayOne * 10 + firstInfiniteArray[lengthOfArray]
				numberFromArrayTwo = numberFromArrayTwo * 10 + secondInfiniteArray[lengthOfArray]
				lengthOfArray++

			}
			if (numberFromArrayOne >= numberFromArrayTwo) {

				return true
			}
			else  {

				return false


			}

		}
		else {

			return false

		}

	}
	/** divide two infinite numbers
	 * 
	 * @param {InfiniteNumber} infiniteNumber input infinite number to divide
	 * @returns {InfiniteNumber} resultant of  
	 */
	divideInfiniteNumber(infiniteNumber){
		// getting array out of object
		let firstInfiniteArray = this.getInternalArray()
		let secondInfiniteArray = infiniteNumber.getInternalArray()

		//we will perform division by repeted subtraction
		// declare a variable for that
		let divisionCount = 0
		let resultantInfiniteNumber = new InfiniteNumber(this._internalArray)
		// console.log(resultantInfiniteNumber._internalArray);
		while(resultantInfiniteNumber.compareTwoInfiniteNumber(infiniteNumber)==true){
			resultantInfiniteNumber = resultantInfiniteNumber.subtractInfiniteArray(infiniteNumber)

			divisionCount++
			
			

		}
		// again make this as an array
		let resultant = []
		while(divisionCount!=0){
			resultant.unshift(divisionCount%10)
			divisionCount = Math.floor(divisionCount/10)
		}
		let resultInfiniteNumber = new InfiniteNumber(resultant)
		return resultInfiniteNumber
	}
}





let firstObj = new InfiniteNumber([1,2,0])
let secondObj = new InfiniteNumber([3])
// let addition = firstObj.addInfiniteNumber(secondObj)
// console.log(addition.getNumberAsString())
// let subtraction = firstObj.subtractInfiniteArray(secondObj)
// console.log(subtraction.getNumberAsString())


// let multiply = firstObj.multiplyInfiniteNumber(secondObj)
// console.log(multiply.getNumberAsString());


// let division = firstObj.divideInfiniteNumber(secondObj)
// console.log(division.getNumberAsString());