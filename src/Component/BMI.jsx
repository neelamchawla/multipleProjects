import React from 'react'
import { useState } from 'react';
import Back from '../Img/back.png';
import {Link} from "react-router-dom";

function BMI() {

    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBmi] = useState(0);

    const calculate = (e) => {
        e.preventDefault();
        // console.log(height, weight)
        const dataValid = +height > 0 && +weight > 0;
        if(!dataValid) {
            return;
        }
        const calcBMI = (+weight / (+height) ** 2) * 10000;
        // console.log(calcBMI);
        setBmi(calcBMI);
    }

  return (
    <div className='BMI' style={{ height: "100vh" }}>
        <h1 className='pageHeader'>BMI Calculator</h1>

        <Link to="/">
            <img title='Back To Home Page' className='backBtn' src={Back} />
        </Link>

        <form onSubmit={calculate}>
            {/* <div className='bmiInput'>
                <label>Height</label>
                <input value={height} onChange={(e) => setHeight(e.target.value)}/> in Inches
            </div>
            <div style={{ marginLeft: "-24px !important" }} className='bmiInput'>
                <label>Weight</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)}/> in kgs
            </div> */}
            <div className="text-input bmiInput">
                <input type="text" id="input1" placeholder="Enter Height in Inches" onChange={(e) => setHeight(e.target.value)} />
                <label for="input1">Height</label>
            </div>
            <div className="text-input bmiInput">
                <input type="text" id="input1" placeholder="Enter Weight in kgs" onChange={(e) => setWeight(e.target.value)} />
                <label for="input1">Weight</label>
            </div>
            <button className='bmiBtn' type='submit'>Calculate</button>
        </form>
        <p className='bmiInput' >BMI: {bmi}</p>
        <strong className='bmiInput'>
        {
            bmi < 18.5
            ? "Underweight"
            : bmi === 18.5 || bmi <= 24.9
            ? "Normal weight"
            : bmi === 25 || bmi <= 29.9
            ? "Overweight"
            : bmi > 30
            ? "Obesity"
            : "Please Enter proper digits"
        }
        </strong>
        {/* <pre>
            BMI Categories:
            Underweight = less than 18.5
            Normal weight = 18.5–24.9
            Overweight = 25–29.9
            Obesity = BMI of 30 or greater
        </pre> */}
    </div>
  )
}

export default BMI;