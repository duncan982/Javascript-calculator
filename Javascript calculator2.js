//html
<div id='root' class='container'></div>

//css
.container{
  position: 'relative'
}

//js
import React, {useState, useEffect, useReducer} from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const mainStyles = {
  position: 'absolute',
  border: '1px solid black',
  width: '250px',
  height: '209px',
  top: '50%',
  left: '50%',
  margin: '-25px 0 0 -25px'
};

const displayStyle={
  border: '1px solid black',
  width: '250px',
  height: '100px',
  textAlign: 'center',
};

const inputNumberStyle = {
  display: 'grid',
  gridTemplateColumns:  'auto auto auto',
};

const inputMethodStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto auto auto'
};


const Calculator = () => {
  
    return(
      <div style={mainStyles}>
        
          <NumberInput 
            />
        
      </div>
    );
};


const NumberInput = () => {
  
  const [inputNumber, setInputNumber]=useState('')
  const [items, setItems]=useState('');
  const [itemsToProcess, setItemsToProcess]=useState('');
  const [method, setMethod]=useState('')
  const [inputMethods, setInputMethods] = useState('');
  const [answer, setAnswer]=useState(0);
  
  const numbers = [
    {
      digit: 0,
      id: 'zero',  
    },
      {
      digit: 1,
      id: 'one',  
    },
      {
      digit: 2,
      id: 'two',  
    },
        {
      digit: 3,
      id: 'three',  
    },
        {
      digit: 4,
      id: 'four',  
    },
        {
      digit: 5,
      id: 'five',  
    },
        {
      digit: 6,
      id: 'six',  
    },
       {
      digit: 7,
      id: 'seven',  
    },
       {
      digit: 8,
      id: 'eight',  
    },
       {
      digit: 9,
      id: 'nine',  
    },
     {
      digit: '.',
      id: 'decimal',  
    },
        {
      digit: '-',
      id: 'negativeOrPositive',  
    }
  ];
  
  const methods = [
    {
      method: '+',
      id: 'add',
      name: 'addition'
    },
    
    {
      method: '-',
      id: 'subtract',
      name: 'subtraction'
    },
    
    {
      method: 'X',
      id: 'multiply',
      name: 'multiplication'
    },
    
    {
      method: '/',
      id: 'divide',
      name: 'division'
    },
    
  ];
  
// a funcion to reduce multiple 0s or decimals to one 0 or one decimal
const reduceMultipleZerosAndDecimalsToOne = (input) => {
  const processedInput = [];
  for (let i = 0; i < input.length; i++) {
    const item = input[i];

    if ((item.match(/[.]/g) || []).length > 1) {
      // if item has multiple decimals between numbers 5.5.5
      if (item.match(/^[0-9]\.[0-9]\.[0-9]$/)) {
        // console.log(item);
        // const item2 = item.replace(/[.]/g, " ").trim().replace(/\s+/, "."); // replace multiple ... with one .
        const item2 = item.replace(/[.]/g, " ").trim().replace(/\s+/, "."); // replace multiple ... with one .
        const item3 = item2.replace(/\s+/, ""); // replace remaning whitespace
        // console.log(item3);
        if (item3) {
          processedInput.push(item3);
        }
      } else {
        //if item has multiple decimals between numbers eg 5...55
        // console.log(item);
        const item2 = item.replace(/[.]/g, " ").trim().replace(/\s+/, "."); // replace multiple ... with one .
        // console.log(item2);
        if (item2) {
          processedInput.push(item2);
        }
      }
    } else if (item.match(/^0+/g)) {
      const item2 = item.replace(/^0+/g, 0); // replace multiple 0ss before a number to one zero
      if (item2) {
        processedInput.push(Number(item2));
        //   console.log(item2);
      }
    } else if (Number(item) == 0) {
      const item2 = Number(item); // convert multiple 0s to one 0
      if (item2) {
        processedInput.push(item2);
        //   console.log(item2);
      }
    } else {
      processedInput.push(item);
      // console.log(item);
    }
  }
  return processedInput;
};

let regex1;
let regex2;
let unWanted;
let wanted;

// a function to make input to be -X if preceded by - sign after /X+-
const correctFormatNegativeNumbers = (input, clickedMethods) => {
  // 3,+,5,X,6,-,2,/,4
  const regex1 = /[0-9],[\/|X|+|-],-,[0-9]/g; // test if input has negative number and is preceded with /X+-
  const regex2 = /^(-,[0-9],[\/|X|+|-],[0-9])/g; // test if input has negative number and is followed with /X+-
  // const regex2 = /-,[0-9],[\/|X|+|-],[0-9]/g; // test if input has negative number and is followed with /X+-
  const regex3 = /^(-,[0-9],[\/|X|+|-](.*?))/g; // test if input has a starting negative number and is followed with /X+- then anything
  const regex4 = /((.*?)[\/|X|+|-],-,[0-9](.*?))/g; // test if input has negative number theat is preceded with anyhting and /X+- and is followed with /X+-

  if (regex3.test(input) || regex4.test(input)) {
    console.log("Regex is regex3 || regex4");
    // console.log(input.split(","));
    const unWanted1 = "-,";
    const wanted1 = "-";
    const unWanted2 = ",-,";
    const wanted2 = ",-";

    const input2 = input
      .slice()
      .toString()
      .replace(unWanted1, wanted1)
      .replace(unWanted2, wanted2);

    //drop - from methods
    const newMethods = input2
      .replace(/[0-9]|-[0-9]/g, "")
      .replace(/,-,/g, ",")
      .replace(/-,/g, "");
    // console.log(newMethods);

    const processedItems = [input2.split(","), newMethods];
    // const processedItems = input2;
    return processedItems;

    // change -, input to -input
  } else if (regex1.test(input)) {
    console.log("Regex is regex1");
    // console.log(input.split(","));
    const unWanted = ",-,";
    const wanted = ",-";

    const input2 = input.slice().toString().replace(unWanted, wanted);
    console.log(input2);

    //drop - from methods
    const newMethods = input2
      .replace(/[0-9]|-[0-9]/g, "")
      .replace(/,-,/g, ",")
      .replace(/-,/g, "");
    // console.log(newMethods);

    const processedItems = [input2.toString().split(","), newMethods];
    // const processedItems = input2;
    return processedItems;

    // change -, input to -input
  } else if (regex2.test(input)) {
    console.log("Regex is regex2");
    const unWanted = "-,";
    const wanted = "-";

    const input2 = input.slice().toString().replace(unWanted, wanted);
    // console.log(input2);

    //drop - from methods
    const newMethods = input2
      .replace(/[0-9]|-[0-9]/g, "")
      .replace(/,-,/g, ",")
      .replace(/-,/g, "");
    // console.log(newMethods);

    const processedItems = [input2.split(","), newMethods];
    // const processedItems = input2;
    return processedItems;

    // change -, input to -input
  } else if (
    regex1.test(input) == false ||
    regex2.test(input) == false ||
    regex3.test(input) == false ||
    regex4.test(input) == false
  ) {
    console.log(input + " doesnt have regex");
    // console.log(input);
    const processedItems = [input.toString().split(","), clickedMethods];
    // const processedItems = input.split(",");
    return processedItems;
  }
};

//     getpreviousAndNextNumbers of an operation
const getpreviousAndNextNumbers = (currentMethod, bodmasNumber) => {
  const currentMethodPosition = bodmasNumber.indexOf(currentMethod);
  // console.log("currentMethodPosition is " + currentMethodPosition);
  if (currentMethodPosition == 1 && inputMethods.length <= 3) {
    const previousNumber = bodmasNumber[0];
    const nextNumber = bodmasNumber[2];
    const CollectedNumbers = previousNumber + "," + nextNumber;
    return CollectedNumbers;
  }
  else if (inputMethods.length > 3) {
    // if (bodmasNumber.length == 9) {
    //      const previousNumber = currentMethodPosition - 1;
    //      const nextNumber = currentMethodPosition + 1;
    //      const CollectedNumbers = previousNumber + "," + nextNumber;
    //      return CollectedNumbers;
    // }
    
    if (currentMethodPosition == 1 && bodmasNumber.length == 3) {
      const previousNumber = bodmasNumber[0];
      const nextNumber = bodmasNumber[2];
      const CollectedNumbers = previousNumber + "," + nextNumber;
      return CollectedNumbers;
    } else if (currentMethodPosition == 1 && bodmasNumber.length == 5) {
      const previousNumber = bodmasNumber[0];
      const nextNumber = bodmasNumber[2];
      const CollectedNumbers = previousNumber + "," + nextNumber;
      return CollectedNumbers;
    } else if (currentMethodPosition == 1 && bodmasNumber.length == 7) {
      const previousNumber = bodmasNumber[0];
      const nextNumber = bodmasNumber[2];
      const CollectedNumbers = previousNumber + "," + nextNumber;
      return CollectedNumbers;
    } else if (currentMethodPosition == 1 && bodmasNumber.length == 9) {
      const previousNumber = bodmasNumber[0];
      const nextNumber = bodmasNumber[2];
      const CollectedNumbers = previousNumber + "," + nextNumber;
      return CollectedNumbers;
    } else if (currentMethodPosition == 1) {
      const nextMethodPosition =
        currentMethodPosition +
        (bodmasNumber.indexOf("/") ||
          bodmasNumber.indexOf("X") ||
          bodmasNumber.indexOf("+") ||
          bodmasNumber.indexOf("-"));
      const previousNumber = bodmasNumber.slice(0, currentMethodPosition);
      const nextNumber = bodmasNumber.slice(
        currentMethodPosition + 1,
        nextMethodPosition - 1
      );
      const CollectedNumbers = previousNumber + "," + nextNumber;
      return CollectedNumbers;
    } 
  else if (currentMethodPosition == bodmasNumber.length - 2) {
      if (
        inputMethods.includes("", "-", "", " +", "") &&
        currentMethod == "+"
      ) {
        // console.log("it matches");
        const previousNumber = bodmasNumber[0];
        const nextNumber = bodmasNumber.slice(
          currentMethodPosition + 1,
          bodmasNumber.length
        );
        const CollectedNumbers = previousNumber + "," + nextNumber;
        return CollectedNumbers;
      } 
    else {
        const previousNumber = bodmasNumber.slice(
          currentMethodPosition - 1,
          currentMethodPosition
        );
        const nextNumber = bodmasNumber.slice(
          currentMethodPosition + 1,
          bodmasNumber.length
        );
        const CollectedNumbers = previousNumber + "," + nextNumber;
        return CollectedNumbers;
      }
    }
    else {
      const previousmethodPosition = currentMethodPosition - 1;
      const nextMethodPosition = currentMethodPosition + 2;
      const previousNumber = bodmasNumber.slice(
        previousmethodPosition,
        currentMethodPosition
      );
      const nextNumber = bodmasNumber.slice(
        currentMethodPosition + 1,
        nextMethodPosition
      );
      const CollectedNumbers = previousNumber + "," + nextNumber;
      return CollectedNumbers;
    }
  };
};
    
    let inputtPreviousAndNextNumbers;
    let inputmethod;
    let inputFirstNumber;
    let inputSecondNumber;
    let collectedMethods 
    
//     perform /, *, + or - operation
        const performOperation = (inputmethod, inputFirstNumber, inputSecondNumber) => {  
        
            if ( ('/').valueOf() == inputmethod.valueOf()){
                  const product = (Number(inputFirstNumber) / Number(inputSecondNumber));
              return product;
            }else if( ('X').valueOf() == inputmethod.valueOf()){
                  const product = (Number(inputFirstNumber) * Number(inputSecondNumber));
              return product;
            }else if( ('+').valueOf() == inputmethod.valueOf()){
                  const product = (Number(inputFirstNumber) + Number(inputSecondNumber));
              return product;
            }else if( ('-').valueOf() == inputmethod.valueOf()){
                  const product = (Number(inputFirstNumber) - Number(inputSecondNumber));
              return product;
            };
          };
    
             
        //  get previous and next items in the input after bodmas
      let currentOperation;
      let itemsInOperation;
      
      const getRemainingItems = (currentOperation, itemsInOperation) => {
        const currentOperationPosition = itemsInOperation.indexOf(currentOperation);
        
        if (currentOperationPosition == 1 && inputMethods.length <= 3){
            const previousItems = ''; 
            const nextItems = ''; 
            const remainingItems = previousItems + nextItems;
            return remainingItems;
        }else if (inputMethods.length > 3){
          if (currentOperationPosition == 1){
            const previousItems = ''; 
            const nextItems = itemsInOperation.slice(itemsInOperation.indexOf(currentOperation)+2);   
            const remainingItems = previousItems + ',' + nextItems;
            return remainingItems;
          } else if (currentOperationPosition == (itemsInOperation.length - 2)){
            const previousItems = itemsInOperation.slice(0, itemsInOperation.length - 3);
            const nextItems = '';          
            const remainingItems = previousItems + ',' + nextItems;
            return remainingItems;
          } else{
            const previousmethodPosition = currentOperationPosition - 2;
            const nextMethodPosition = currentOperationPosition + 2;
            const previousItems = itemsInOperation.slice(0, previousmethodPosition);
            const nextItems = itemsInOperation.slice(nextMethodPosition);
            const remainingItems = previousItems + ',' + nextItems;
            return remainingItems;
          };
        };
      };
  
      
      let remainingItems;
      let operationProduct;
     
//     join product and remaining items
      const addProductToRemainingItems =  (currentOperation, itemsInOperation, remainingItems, operationProduct) => {
        const currentOperationPosition = itemsInOperation.indexOf(currentOperation);
        if (currentOperationPosition == 1){ 
          const regeneratedItems = operationProduct + remainingItems;
          return regeneratedItems;
        } else if (currentOperationPosition == (itemsInOperation.length - 2)){
          const regeneratedItems = remainingItems + operationProduct;
          return regeneratedItems;
        } else{
          const previousmethodPosition = currentOperationPosition - 1;
          const nextMethodPosition = currentOperationPosition + 2;
          const previousItems = itemsInOperation.slice(0, previousmethodPosition);
          const nextItems = itemsInOperation.slice(nextMethodPosition);
          const regeneratedItems = previousItems + ',' + operationProduct  + ',' + nextItems;
          return regeneratedItems;
        };
      };
 

//   get the current number that was clicked
  const getCurrentNumber = (clickedNumber) => {
    event.preventDefault();
    setAnswer('');
    setItems(items => items + clickedNumber);   
    setItemsToProcess(itemsToProcess => itemsToProcess + clickedNumber);
  };
  

  //   get the current operartion that was clicked
  const getCurrentMethod = (inputMethod) => {
    event.preventDefault();
    
//     check if there is no previous input items and product
  if(answer == ''){ 
    setItems(items => items + ',' + inputMethod + ',');
    setItemsToProcess(itemsToProcess => itemsToProcess + ',' + inputMethod + ',');
    setMethod(method => method  + ',' + inputMethod + ',') 
  }else{ //if there is previous input items and product, reset items and add product to operation
    const previousProduct = answer;
    setItems('');
    setItemsToProcess('');
    setMethod('');
    setInputMethods('');
    setItems(items => items + ',' + previousProduct + ',' + inputMethod + ',');
    setItemsToProcess(itemsToProcess => itemsToProcess + ',' + previousProduct + ',' + inputMethod  + ',');  
      setMethod(method => method  + ',' + inputMethod + ',');
  };
   
  };
  

  
  const equals = () => {
    event.preventDefault();
    
    setItems('');
    
    // const inputMethods = method.split(',');
    // setAnswer(answer => answer + itemsToProcess);
    const itemsToProcessSplitted = itemsToProcess.split(',');
    // setAnswer(answer => answer + itemsToProcessSplitted);
    


//   reduce multiple 0s or . to one 0 or .   
 const processedInputs1 = reduceMultipleZerosAndDecimalsToOne(itemsToProcessSplitted);
 // setAnswer(answer => answer + itemsToProcessSplitted);
    
//  make input to be -input if preceded by - sign    
 const processedInputs2 = correctFormatNegativeNumbers(processedInputs1, method)[0];
 // setAnswer(answer => answer + processedInputs2);

// reformat the clicked method to get rid of the above - sign
 const processedMethods = correctFormatNegativeNumbers(processedInputs1, method)[1];
    // setAnswer(answer => answer + processedMethods);
    
//  reset input items 
const InpuItemsToProcess = processedInputs2;
// setAnswer(answer => answer + InpuItemsToProcess);
    
    
// reset clicked methods to mirror removed - sign
 setMethod(''); 
 setMethod(method => method + processedMethods); 
  
// splits clicked methods
 // setAnswer(answer => answer + method);
 const inputMethods = method.split(',');
 // setAnswer(answer => answer + inputMethods);
 
 
//     execute the above functions based on either division, multiplication, addition and subtraction only
        if ( (inputMethods.includes('/') || inputMethods.includes('X') || inputMethods.includes('+') || inputMethods.includes('-')) && inputMethods.length == 3){

          if(inputMethods.includes('/')){ 
               // setAnswer(answer => answer + '=' + possibleMethods[i]); 
              const previousAndNextNumbers = getpreviousAndNextNumbers('/', InpuItemsToProcess);
              const firstNumber = previousAndNextNumbers.split(',')[0];
              const secondNumber = previousAndNextNumbers.split(',')[1];
              const returnedProduct = performOperation('/', firstNumber, secondNumber);
              // setAnswer(answer => answer + '=' + returnedProduct); 
              setAnswer(answer => answer + returnedProduct)
              
            
            } else if(inputMethods.includes('X')){ 
              const previousAndNextNumbers = getpreviousAndNextNumbers('X', InpuItemsToProcess);
              const firstNumber = previousAndNextNumbers.split(',')[0];
              const secondNumber = previousAndNextNumbers.split(',')[1];
              const returnedProduct = performOperation('X', firstNumber, secondNumber);
              // setAnswer(answer => answer + '=' + returnedProduct); 
              setAnswer(answer => answer + returnedProduct); 
            } else if(inputMethods.includes('+')){ 
              const previousAndNextNumbers = getpreviousAndNextNumbers('+', InpuItemsToProcess);
              const firstNumber = previousAndNextNumbers.split(',')[0];
              const secondNumber = previousAndNextNumbers.split(',')[1];
              const returnedProduct = performOperation('+', firstNumber, secondNumber);
              // setAnswer(answer => answer + '=' + returnedProduct);
              setAnswer(answer => answer + returnedProduct);
            } else if(inputMethods.includes('-')){ 
              const previousAndNextNumbers = getpreviousAndNextNumbers('-', InpuItemsToProcess);
              const firstNumber = previousAndNextNumbers.split(',')[0];
              const secondNumber = previousAndNextNumbers.split(',')[1];
              const returnedProduct = performOperation('-', firstNumber, secondNumber);
              // setAnswer(answer => answer + '=' + returnedProduct);
              setAnswer(answer => answer + returnedProduct);
            };
        } else if((inputMethods.includes('+') && inputMethods.includes('-')) && inputMethods.length == 5){
 // bodmas on addition and subtraction
              const additionPreviousAndNextNumbers = getpreviousAndNextNumbers('+', InpuItemsToProcess);
              const additionFirstNumber = additionPreviousAndNextNumbers.split(',')[0];
              const additionSecondNumber = additionPreviousAndNextNumbers.split(',')[1];
              const additionProduct = performOperation('+', additionFirstNumber, additionSecondNumber);

              // subtraction
              const additionOtherRemainingItems = getRemainingItems('+', InpuItemsToProcess);
              const additionProductAddedToItems = addProductToRemainingItems('+', InpuItemsToProcess, additionOtherRemainingItems, additionProduct);
              const subtractionPreviousAndNextNumbers = getpreviousAndNextNumbers('-', additionProductAddedToItems.split(','));
              const subtractionFirstNumber = subtractionPreviousAndNextNumbers.split(',')[0];
              const subtractionSecondNumber = subtractionPreviousAndNextNumbers.split(',')[1];
              const subtractionProduct = performOperation('-', subtractionFirstNumber, subtractionSecondNumber); 
              // setAnswer(answer => answer + '=' + subtractionProduct); 
              setAnswer(answer => answer + subtractionProduct);            

        }

 
//     // bodmas on all operations except division 
    if ((inputMethods.includes('X') && inputMethods.includes('+') && inputMethods.includes('-')) && inputMethods.length == 7){
      
  //  multiplication
          const multiplicationPreviousAndNextNumbers = getpreviousAndNextNumbers('X', InpuItemsToProcess);
          const multiplicationFirstNumber = multiplicationPreviousAndNextNumbers.split(',')[0];
          const multiplicationSecondNumber = multiplicationPreviousAndNextNumbers.split(',')[1];
          const multiplicationProduct = performOperation('X', multiplicationFirstNumber, multiplicationSecondNumber);

    // addition
          const multiplicationOtherRemainingItems = getRemainingItems('X', InpuItemsToProcess);
          const multiplicationProductAddedToItems = addProductToRemainingItems('X', InpuItemsToProcess, multiplicationOtherRemainingItems, multiplicationProduct);
          const addittionPreviousAndNextNumbers = getpreviousAndNextNumbers('+', multiplicationProductAddedToItems.split(','));
          const additionFirstNumber = addittionPreviousAndNextNumbers.split(',')[0];
          const additionSecondNumber = addittionPreviousAndNextNumbers.split(',')[1];
          const additionProduct = performOperation('+', additionFirstNumber, additionSecondNumber);

   // subtraction
          const additionOtherRemainingItems = getRemainingItems('+', multiplicationProductAddedToItems.split(','));
          const additionProductAddedToItems = addProductToRemainingItems('+', multiplicationProductAddedToItems.split(','), additionOtherRemainingItems, additionProduct);
          const subtractionPreviousAndNextNumbers = getpreviousAndNextNumbers('-', additionProductAddedToItems.split(','));
          const subtractionFirstNumber = subtractionPreviousAndNextNumbers.split(',')[0];
          const subtractionSecondNumber = subtractionPreviousAndNextNumbers.split(',')[1];
          const subtractionProduct = performOperation('-', subtractionFirstNumber, subtractionSecondNumber); 
          // setAnswer(answer => answer + '=' + subtractionProduct); 
          setAnswer(answer => answer + subtractionProduct); 
      };
    
//   bodmas on all operations  
if ((inputMethods.includes('/') && inputMethods.includes('X') && inputMethods.includes('+') && inputMethods.includes('-')) && inputMethods.length == 9){
          const divisionPreviousAndNextNumbers = getpreviousAndNextNumbers('/', InpuItemsToProcess);
  setAnswer(answer => answer + divisionPreviousAndNextNumbers); 
          const divisionFirstNumber = divisionPreviousAndNextNumbers.split(',')[0];
          const divisionSecondNumber = divisionPreviousAndNextNumbers.split(',')[1];
          const divisionProduct = performOperation('/', divisionFirstNumber, divisionSecondNumber);
          const divisionOtherRemainingItems = getRemainingItems('/', InpuItemsToProcess);
          const divisionProductAddedToItems = addProductToRemainingItems('/', InpuItemsToProcess, divisionOtherRemainingItems, divisionProduct);
  // setAnswer(answer => answer + divisionProductAddedToItems); 
      
  //  multiplication
          const multiplicationPreviousAndNextNumbers = getpreviousAndNextNumbers('X', divisionProductAddedToItems.split(','));
          const multiplicationFirstNumber = multiplicationPreviousAndNextNumbers.split(',')[0];
          const multiplicationSecondNumber = multiplicationPreviousAndNextNumbers.split(',')[1];
          const multiplicationProduct = performOperation('X', multiplicationFirstNumber, multiplicationSecondNumber);
    // addition
          const multiplicationOtherRemainingItems = getRemainingItems('X', divisionProductAddedToItems.split(','));
          const multiplicationProductAddedToItems = addProductToRemainingItems('X', divisionProductAddedToItems.split(','), multiplicationOtherRemainingItems, multiplicationProduct);
          const addittionPreviousAndNextNumbers = getpreviousAndNextNumbers('+', multiplicationProductAddedToItems.split(','));
          const additionFirstNumber = addittionPreviousAndNextNumbers.split(',')[0];
          const additionSecondNumber = addittionPreviousAndNextNumbers.split(',')[1];
          const additionProduct = performOperation('+', additionFirstNumber, additionSecondNumber);

   // subtraction
          const additionOtherRemainingItems = getRemainingItems('+', multiplicationProductAddedToItems.split(','));
          const additionProductAddedToItems = addProductToRemainingItems('+', multiplicationProductAddedToItems.split(','), additionOtherRemainingItems, additionProduct);
          const subtractionPreviousAndNextNumbers = getpreviousAndNextNumbers('-', additionProductAddedToItems.split(','));
          const subtractionFirstNumber = subtractionPreviousAndNextNumbers.split(',')[0];
          const subtractionSecondNumber = subtractionPreviousAndNextNumbers.split(',')[1];
          const subtractionProduct = performOperation('-', subtractionFirstNumber, subtractionSecondNumber); 
          // setAnswer(answer => answer + '=' + subtractionProduct); 
          setAnswer(answer => answer + subtractionProduct); 
      };
    
//     pending operations
    // /X+-
    // /X+ | /X- | /+- | X+-
    // /X | /+ | /- | X+ | X- | +- |  
    // / | X | + | -
    // double, triplets and so on of each operation
        
      };
   
  
  const clear = () => {
    event.preventDefault();
    setAnswer(0);
    setMethod('');
    setInputMethods('');
    setItems('');
    setItemsToProcess('');
  }
  
  return (
    <div >
      <form>
        <div id='display' style={displayStyle}>
          {/*<div>{itemsToProcess}</div>*/}
          <div>{reduceMultipleZerosAndDecimalsToOne(items.split(','))}</div>
          {/*<div>{InpuItemsToProcess}</div>*/}
          <div>{answer}</div>
        </div>
      
         <div style={inputMethodStyle}>
           {
           methods.map((method) => (<button id={method.id} onClick={ () => getCurrentMethod(method.method)}>{method.method}</button>))
           }
          <button id='equals' onClick={() => equals()}>=</button>
          <button id='clear' onClick={() => clear()}>AC</button>
        </div>
        
         <div style={inputNumberStyle}>
            {
              numbers.map((number) => (
                <button id={number.id} onClick={()=> getCurrentNumber(number.digit)}>{number.digit}</button>))
            }
                  
        </div>
      
      </form>
    </div>
  );
};


console.log(hallo)

ReactDOM.render(<Calculator />, document.getElementById('root'));