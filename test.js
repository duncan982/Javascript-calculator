// html
<div id='root' class='container'></div>

// css
.container{
  position: 'relative'
}


//js/react
import React, {useState, useEffect, useReducer} from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {evaluate, round} from "https://cdn.skypack.dev/mathjs";

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
      method: '*',
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
      }
    } else {
      processedInput.push(item);
    }
  }
  return processedInput;
};

let regex1;
let regex2;
let unWanted;
let wanted;
  
// a function to make input to be -X if preceded by - sign after /X+- or if 2 or more operators are entered consecutively selects the last one
const correctFormatNegativeNumbers = (input) => {
  const regex1 = /[0-9],[\/|X|+|-],-,[0-9]/g; // test if input has negative number and is preceded with /X+-
  const regex2 = /^(-,[0-9],[\/|X|+|-],[0-9])/g; // test if input has negative number and is followed with /X+-
  const regex3 = /^(-,[0-9],[\/|X|+|-](.*?))/g; // test if input has a starting negative number and is followed with /X+- then anything
  const regex4 = /((.*?)[\/|X|+|-],-,[0-9](.*?))/g; // test if input has negative number that is preceded with anyhting and /X+- and is followed with /X+-
  const regex5 = /[0-9]\/\*-\+|\/-\+|\/-\*|\*-\+|\/\*\+|\/\+|\/\*|\*\+[0-9]/g; // test if 2 or more operators are entered consecutively

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
    setItems(items => items + inputMethod);
    setItemsToProcess(itemsToProcess => itemsToProcess + inputMethod);
    setMethod(method => method  + inputMethod) 
  }else{ //if there is previous input items and product, reset items and add product to operation
    const previousProduct = answer;
    setItems('');
    setItemsToProcess('');
    setMethod('');
    setInputMethods('');
    setItems(items => items + previousProduct + inputMethod);
    setItemsToProcess(itemsToProcess => itemsToProcess + previousProduct + inputMethod);  
      setMethod(method => method + inputMethod);
  };
   
  };
  

  
  const equals = () => {
    event.preventDefault();
    
    setItems('');
    
    // execute the opeation(s)
 const processedInputs = correctFormatNegativeNumbers(itemsToProcess);
        setAnswer(answer => answer + evaluate(processedInputs))
        
      };
   
  
  const clear = () => {
    event.preventDefault();
    
    setInputNumber('');
    setMethod('');
    setInputMethods('');
    setItems('');
    setItemsToProcess('');
    setAnswer(0);
    

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

ReactDOM.render(<Calculator />, document.getElementById('root'));