//     getpreviousAndNextNumbers of an operation
const getpreviousAndNextNumbers = (currentMethod, bodmasNumber) => {
  const currentMethodPosition = bodmasNumber.indexOf(currentMethod);
  // console.log("currentMethodPosition is " + currentMethodPosition);

  if (
    bodmasNumber.length == 5 &&
    bodmasNumber.includes("+") &&
    bodmasNumber.includes("-") &&
    bodmasNumber.indexOf("+") > bodmasNumber.indexOf("-")
  ) {
    const previousNumber = bodmasNumber[0];
    const nextNumber = bodmasNumber.slice(
      currentMethodPosition + 1,
      bodmasNumber.length
    );
    const CollectedNumbers = previousNumber + "," + nextNumber;
    return CollectedNumbers;
    //   }
  } else {
    // otherwise obtain index as usual
    // console.log(bodmasNumber + " has no regex");
    // get index for previous number
    const previousNumberIndex = currentMethodPosition - 1;
    // get previous number
    const previousNumber = bodmasNumber[previousNumberIndex];
    // get index for next number
    const nextNumberIndex = currentMethodPosition + 1;
    // get next number
    const nextNumber = bodmasNumber[nextNumberIndex];
    // const nextNumber = '';

    // combine previous and next numbers
    const CollectedNumbers = previousNumber + "," + nextNumber;
    return CollectedNumbers;
  }
};

let inputtPreviousAndNextNumbers;
let inputmethod;
let inputFirstNumber;
let inputSecondNumber;
let collectedMethods;

//     perform /, *, + or - operation
const performOperation = (inputmethod, inputFirstNumber, inputSecondNumber) => {
  if ("/".valueOf() == inputmethod.valueOf()) {
    const product = Number(inputFirstNumber) / Number(inputSecondNumber);
    return product;
  } else if ("X".valueOf() == inputmethod.valueOf()) {
    const product = Number(inputFirstNumber) * Number(inputSecondNumber);
    return product;
  } else if ("+".valueOf() == inputmethod.valueOf()) {
    const product = Number(inputFirstNumber) + Number(inputSecondNumber);
    return product;
  } else if ("-".valueOf() == inputmethod.valueOf()) {
    const product = Number(inputFirstNumber) - Number(inputSecondNumber);
    return product;
  }
};

//  get previous and next items in the input after bodmas
let currentOperation;
let itemsInOperation;

const getRemainingItems = (currentOperation, itemsInOperation) => {
  const currentOperationPosition = itemsInOperation.indexOf(currentOperation);

  if (currentOperationPosition == 1 && inputMethods.length <= 3) {
    const previousItems = "";
    const nextItems = "";
    const remainingItems = previousItems + nextItems;
    return remainingItems;
  } else if (inputMethods.length > 3) {
    if (currentOperationPosition == 1) {
      const previousItems = "";
      const nextItems = itemsInOperation.slice(
        itemsInOperation.indexOf(currentOperation) + 2
      );
      const remainingItems = previousItems + "," + nextItems;
      return remainingItems;
    } else if (currentOperationPosition == itemsInOperation.length - 2) {
      const previousItems = itemsInOperation.slice(
        0,
        itemsInOperation.length - 3
      );
      const nextItems = "";
      const remainingItems = previousItems + "," + nextItems;
      return remainingItems;
    } else {
      const previousmethodPosition = currentOperationPosition - 2;
      const nextMethodPosition = currentOperationPosition + 2;
      const previousItems = itemsInOperation.slice(
        0,
        previousmethodPosition + 1
      );
      const nextItems = itemsInOperation.slice(nextMethodPosition);
      const remainingItems = previousItems + "," + nextItems;
      return remainingItems;
    }
  }
};

let remainingItems;
let operationProduct;

//     join product and remaining items
const addProductToRemainingItems = (
  currentOperation,
  itemsInOperation,
  remainingItems,
  operationProduct
) => {
  const currentOperationPosition = itemsInOperation.indexOf(currentOperation);
  if (currentOperationPosition == 1) {
    const regeneratedItems = operationProduct + remainingItems;
    return regeneratedItems;
  } else if (currentOperationPosition == itemsInOperation.length - 2) {
    const regeneratedItems = remainingItems + operationProduct;
    return regeneratedItems;
  } else {
    const previousmethodPosition = currentOperationPosition - 1;
    const nextMethodPosition = currentOperationPosition + 2;
    const previousItems = itemsInOperation.slice(0, previousmethodPosition);
    const nextItems = itemsInOperation.slice(nextMethodPosition);
    const regeneratedItems =
      previousItems + "," + operationProduct + "," + nextItems;
    return regeneratedItems;
  }
};

const itemsToProcess = "3,+,5,X,6,-,2"; // before the splitting;
const inputMethods = ",+,,X,,-,".split(",");
// console.log(inputMethods);
// console.log(inputMethods.length);

// console.log(itemsToProcess)
const itemsToProcessSplitted = itemsToProcess.split(","); //after splitting;
// console.log(itemsToProcessSplitted);

const InpuItemsToProcess = itemsToProcessSplitted;
console.log("InpuItemsToProcess " + InpuItemsToProcess);
// console.log(bodmasNumber.length);
// const currentMethod = "X";
// const currentMethodPosition = bodmasNumber.indexOf(currentMethod);

if (
  inputMethods.includes("X") &&
  inputMethods.includes("+") &&
  inputMethods.includes("-") &&
  inputMethods.length == 7
) {
  //  multiplication
  const multiplicationPreviousAndNextNumbers = getpreviousAndNextNumbers(
    "X",
    InpuItemsToProcess
  );
  console.log(
    "multiplicationPreviousAndNextNumbers " +
      multiplicationPreviousAndNextNumbers
  );
  const multiplicationFirstNumber =
    multiplicationPreviousAndNextNumbers.split(",")[0];
  const multiplicationSecondNumber =
    multiplicationPreviousAndNextNumbers.split(",")[1];
  const multiplicationProduct = performOperation(
    "X",
    multiplicationFirstNumber,
    multiplicationSecondNumber
  );
  console.log("multiplicationProduct " + multiplicationProduct);

  // addition
  const multiplicationOtherRemainingItems = getRemainingItems(
    "X",
    InpuItemsToProcess
  );

  console.log(
    "multiplicationOtherRemainingItems " + multiplicationOtherRemainingItems
  );

  const multiplicationProductAddedToItems = addProductToRemainingItems(
    "X",
    InpuItemsToProcess,
    multiplicationOtherRemainingItems,
    multiplicationProduct
  );

  console.log(
    "multiplicationProductAddedToItems " + multiplicationProductAddedToItems
  );

  const addittionPreviousAndNextNumbers = getpreviousAndNextNumbers(
    "+",
    multiplicationProductAddedToItems.split(",")
  );

  console.log(
    "addittionPreviousAndNextNumbers " + addittionPreviousAndNextNumbers
  );
  // setAnswer((answer) => answer + addittionPreviousAndNextNumbers);

  const additionFirstNumber = addittionPreviousAndNextNumbers.split(",")[0];
  const additionSecondNumber = addittionPreviousAndNextNumbers.split(",")[1];
  // setAnswer(
  //   (answer) => answer + additionFirstNumber + "," + additionSecondNumber
  // );
  const additionProduct = performOperation(
    "+",
    additionFirstNumber,
    additionSecondNumber
  );

  console.log("additionProduct " + additionProduct);

  // subtraction
  const additionOtherRemainingItems = getRemainingItems(
    "+",
    multiplicationProductAddedToItems.split(",")
  );

  console.log("additionOtherRemainingItems  " + additionOtherRemainingItems);

  const additionProductAddedToItems = addProductToRemainingItems(
    "+",
    multiplicationProductAddedToItems.split(","),
    additionOtherRemainingItems,
    additionProduct
  );

  console.log("additionProductAddedToItems " + additionProductAddedToItems);
  const subtractionPreviousAndNextNumbers = getpreviousAndNextNumbers(
    "-",
    additionProductAddedToItems.split(",")
  );

  console.log(
    "subtractionPreviousAndNextNumbers " + subtractionPreviousAndNextNumbers
  );

  const subtractionFirstNumber =
    subtractionPreviousAndNextNumbers.split(",")[0];
  const subtractionSecondNumber =
    subtractionPreviousAndNextNumbers.split(",")[1];
  const subtractionProduct = performOperation(
    "-",
    subtractionFirstNumber,
    subtractionSecondNumber
  );

  console.log("subtractionProduct " + subtractionProduct);
  // // setAnswer(answer => answer + '=' + subtractionProduct);
  // setAnswer((answer) => answer + subtractionProduct);
}

// const itemsToProcess = "6,-,1,+,3"; // before the splitting;
