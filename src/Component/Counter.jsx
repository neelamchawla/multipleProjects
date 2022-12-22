import React, { useState } from 'react';

function Counter() {

    let [counterNumber, setCounterNumber] = useState(0);

    let increaseVal = () => {
        setCounterNumber((counterNumber += 1));
        // console.log(counterNumber+=1)
    }
    let decreaseVal = () => {
        if (counterNumber === 0) {
            return
        } else {
            setCounterNumber((counterNumber -= 1));
        }
        // console.log(counterNumber-=1)
    }
    let resetVal = () => {
        setCounterNumber(0);
    }

  return (
    <div>
        <h1>Counter</h1>
        <h3>{counterNumber}</h3>
        <hr/>
        <button onClick={increaseVal}>+</button>
        <button onClick={decreaseVal}>-</button>
        <button onClick={resetVal}>Reset</button>
    </div>
  )
}

export default Counter