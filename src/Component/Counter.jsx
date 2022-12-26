import React, { useState } from 'react';
import Back from '../Img/back.png';
import {Link} from "react-router-dom";

function Counter() {

    let [counterNumber, setCounterNumber] = useState(0);

    let increaseVal = () => {
        setCounterNumber((counterNumber += 1));
        // console.log(counterNumber+=1)
    }
    let decreaseVal = () => {
        if (counterNumber === 0) {
            alert("Sorry! You can't go below Zero")
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
    <div style={{ height: "100vh" }}>
        <h1 className='pageHeader'>Counter</h1>
        <Link to="/">
            <img title='Back To Home Page' className='backBtn' src={Back} />
        </Link>

        <h3 className='counterOutput'>{'{'} {counterNumber} {'}'}</h3>
        {/* <hr/> */}
        <button className='bmiBtn' style={{ display: "inline", left: '35%' }} onClick={increaseVal}>+</button>
        <button className='bmiBtn' style={{ display: "inline", left: '35%' }} onClick={decreaseVal}>-</button>
        <button className='bmiBtn' style={{ display: "inline", left: '35%' }} onClick={resetVal}>Reset</button>
    </div>
  )
}

export default Counter