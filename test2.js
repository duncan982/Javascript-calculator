// a function to make input to be -X if preceded by - sign after /X+-
const correctFormatNegativeNumbers = (input) => {
  const regex1 = /[0-9],[\/|X|+|-],-,[0-9]/g; // test if input has negative number and is preceded with /X+-
  const regex2 = /^(-,[0-9],[\/|X|+|-],[0-9])/g; // test if input has negative number and is followed with /X+-
  const regex3 = /^(-,[0-9],[\/|X|+|-](.*?))/g; // test if input has a starting negative number and is followed with /X+- then anything
  const regex4 = /((.*?)[\/|X|+|-],-,[0-9](.*?))/g; // test if input has negative number that is preceded with anyhting and /X+- and is followed with /X+-
  const regex5 = /[0-9]\/\*-\+|\/-\+|\/-\*|\*-\+|\/\*\+|\/\+|\/\*|\*\+[0-9]/g; // test f 2 or more operators are entered consecutively

  if (regex5.test(input.replace(/\s/g, ""))) {
    const input2 = itemsToProcess.replace(/\s/g, "");
    const input3 = input2.replace(regex5, input2[input2.length - 2]);
    // console.log(input2);
    return input3;
  } else if (regex3.test(input) || regex4.test(input)) {
    const unWanted1 = "-,";
    const wanted1 = "-";
    const unWanted2 = ",-,";
    const wanted2 = ",-";

    const input2 = input
      .slice()
      .toString()
      .replace(unWanted1, wanted1)
      .replace(unWanted2, wanted2);

    return input2;

    // change -, input to -input
  } else if (regex1.test(input)) {
    console.log("Regex is regex1");
    const unWanted = ",-,";
    const wanted = ",-";

    const input2 = input.slice().toString().replace(unWanted, wanted);
    return input2;

    // change -, input to -input
  } else if (regex2.test(input)) {
    console.log("Regex is regex2");
    const unWanted = "-,";
    const wanted = "-";

    const input2 = input.slice().toString().replace(unWanted, wanted);
    return input2;

    // change -, input to -input
  } else if (
    regex1.test(input) == false ||
    regex2.test(input) == false ||
    regex3.test(input) == false ||
    regex4.test(input) == false
  ) {
    // console.log("Has no regex");
    // console.log(input);
    const input2 = [input.toString().split(",")];
    return input2;
  }
};
// const itemsToProcess = "5*-+5"; // = should produce an output of "10"
const itemsToProcess = "5 * - + 5"; // = should produce an output of "10"
const processedInputs = correctFormatNegativeNumbers(itemsToProcess);

console.log(processedInputs);

//test if number has more than one operationProduct
// const manyOperations =
//   /[0-9]\/\*-\+|\/-\+|\/-\*|\*-\+|\/\*\+|\/\+|\/\*|\*\+[0-9]/g;
// //   /[0-9]\/\*-\+|\*-\+|[0-9]/g;
// // console.log(manyOperations.test(itemsToProcess.replace(/\s/g, "")));
// // if the last operation isn't -, reset input to the last opearation
// if (manyOperations.test(itemsToProcess.replace(/\s/g, ""))) {
//   const input = itemsToProcess.replace(/\s/g, "");
//   const input2 = input.replace(manyOperations, input[input.length - 2]);
//   console.log(input2);
// }
// else determine if the last operation is -, therefore set the input to be negative number as above
// else return input as it is
