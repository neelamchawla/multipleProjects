import React from 'react'
import { useState } from 'react';

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
    <div className='Calc'>
        <h1>BMI Calculator</h1>
        <form onSubmit={calculate}>
            <div>
                <label>Height</label>
                <input value={height} onChange={(e) => setHeight(e.target.value)}/> in Inches
            </div>
            <div>
                <label>Weight</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)}/> in kgs
            </div>
            <button className='btn' type='submit'>Calculate</button>
        </form>
        <p>BMI: {bmi}</p>
        <strong>
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