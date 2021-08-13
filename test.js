// const itemsToProcess = "6,-,1,+,3"; // before the splitting;
const itemsToProcess = "6,+,1,-,3"; // before the splitting;
// console.log(itemsToProcess)
const itemsToProcessSplitted = itemsToProcess.split(","); //after splitting;
console.log(itemsToProcessSplitted);

// const regex = /^\d,-,\d,\+,\d$/g; // what works
const regex = /^(?=\d,-,)\d,\+,\d$/g; // what works
// const regex = /(\d,)-{1},(\d,)\+{1},\d/g; // what works
// const regex = /\d,-{1},(?=\d,\+{1},\d)/g; // what works
// const regex1 = /\d,-{1},(?!\d,\+{1},\d)/g; // what works
// const regex2 = /(?=\d,-{1},)\d,\+{1},\d/g; // what works
// const regex = /^(\d(?=-)\d(?=\+)\d)$/;
// const regex = /^(\d(?!-)\d(?!\+)\d)$/;
// const regex = /^(\d(?!,\+),-,\d(?!,-),\+,\d)$/g;
// const regex = /^(\d,-),\d,(\+,\d)$/g;
const bodmasNumber = itemsToProcessSplitted;
const currentMethod = "+";
const currentMethodPosition = bodmasNumber.indexOf(currentMethod);

console.log(regex.test(bodmasNumber) != -1);
// console.log(regex1.test(bodmasNumber) != -1 && regex2.test(bodmasNumber) != -1);

// // if (regex.test(bodmasNumber) != -1) {
// if (regex.testExact(bodmasNumber) != -1) {
//   // get index of + and - if available
//   console.log(bodmasNumber + " has regex");
//   const plusSignIndex = bodmasNumber.indexOf("+");
//   const minusSignIndex = bodmasNumber.indexOf("-");
//   if (plusSignIndex > minusSignIndex && currentMethod == "+") {
//     const previousNumber = bodmasNumber[0];
//     const nextNumber = bodmasNumber.slice(
//       currentMethodPosition + 1,
//       bodmasNumber.length
//     );
//     const CollectedNumbers = previousNumber + "," + nextNumber;
//     // return CollectedNumbers;
//     console.log(CollectedNumbers);
//   }
// } else {
//   // otherwise obtain index as usual
//   console.log(bodmasNumber + " has no regex");
//   // get index for previous number
//   const previousNumberIndex = currentMethodPosition - 1;
//   // get previous number
//   const previousNumber = bodmasNumber[previousNumberIndex];
//   // get index for next number
//   const nextNumberIndex = currentMethodPosition + 1;
//   // get next number
//   const nextNumber = bodmasNumber[nextNumberIndex];
//   // const nextNumber = '';

//   // combine previous and next numbers
//   const CollectedNumbers = previousNumber + "," + nextNumber;
//   // return CollectedNumbers;
//   console.log(CollectedNumbers);
// }
