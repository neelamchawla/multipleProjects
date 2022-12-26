import React, { Component } from 'react';
import PointTarget from 'react-point';
import './Calculator.css'
import Back from '../Img/back.png';
import {Link} from "react-router-dom";

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
}

class CalcDisplay extends React.Component {
render() {
    const { value, ...props } = this.props
    
    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
    })
    
    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\.\d*?(0*)$/)
    
    if (match)
    formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
    
    return (
    <div {...props} className="calculator-display">
        <AutoScaleText>{formattedValue}</AutoScaleText>
    </div>
    )
}
}

class AutoScaleText extends React.Component {
    state = {
      scale: 1
    };
    
    componentDidUpdate() {
      const { scale } = this.state
      
      const node = this.node
      const parentNode = node.parentNode
      
      const availableWidth = parentNode.offsetWidth
      const actualWidth = node.offsetWidth
      const actualScale = availableWidth / actualWidth
      
      if (scale === actualScale)
        return
      
      if (actualScale < 1) {
        this.setState({ scale: actualScale })
      } else if (scale < 1) {
        this.setState({ scale: 1 })
      }
    }
    
    render() {
      const { scale } = this.state
      
      return (
        <div
          className="auto-scaling-text"
          style={{ transform: `scale(${scale},${scale})` }}
          ref={node => this.node = node}
        >{this.props.children}</div>
      )
    }
}

class CalcKey extends React.Component {
    render() {
      const { onPress, className, ...props } = this.props
      
      return (
        <PointTarget onPoint={onPress}>
          <button className={`buttonCls calculator-key ${className}`} {...props}/>
        </PointTarget>
      )
    }
}

class Calculator extends Component {

    state = {
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
      };

      clearAll() {
        this.setState({
          value: null,
          displayValue: '0',
          operator: null,
          waitingForOperand: false
        })
      }

      clearLastChar() {
        const { displayValue } = this.state
        
        this.setState({
          displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
        })
      }

      clearDisplay() {
        this.setState({
          displayValue: '0'
        })
      }

      toggleSign() {
        const { displayValue } = this.state
        const newValue = parseFloat(displayValue) * -1
        
        this.setState({
          displayValue: String(newValue)
        })
      }

      inputDot() {
        const { displayValue } = this.state
        
        if (!(/\./).test(displayValue)) {
          this.setState({
            displayValue: displayValue + '.',
            waitingForOperand: false
          })
        }
      }

      inputPercent() {
        const { displayValue } = this.state
        const currentValue = parseFloat(displayValue)
        
        if (currentValue === 0)
          return
        
        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
        const newValue = parseFloat(displayValue) / 100
        
        this.setState({
          displayValue: String(newValue.toFixed(fixedDigits.length + 2))
        })
      }

      inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state
        
        if (waitingForOperand) {
          this.setState({
            displayValue: String(digit),
            waitingForOperand: false
          })
        } else {
          this.setState({
            displayValue: displayValue === '0' ? String(digit) : displayValue + digit
          })
        }
      }

      performOper(nextOperator) {
        const { value, displayValue, operator } = this.state
        const inputValue = parseFloat(displayValue)
        
        if (value == null) {
          this.setState({
            value: inputValue
          })
        } else if (operator) {
          const currentValue = value || 0
          const newValue = CalculatorOperations[operator](currentValue, inputValue)
          
          this.setState({
            value: newValue,
            displayValue: String(newValue)
          })
        }
        
        this.setState({
          waitingForOperand: true,
          operator: nextOperator
        })
      }

      handleKeyDown = (event) => {
        let { key } = event
        
        if (key === 'Enter')
          key = '='
        
        if ((/\d/).test(key)) {
          event.preventDefault()
          this.inputDigit(parseInt(key, 10))
        } else if (key in CalculatorOperations) {
          event.preventDefault()
          this.performOper(key)
        } else if (key === '.') {
          event.preventDefault()
          this.inputDot()
        } else if (key === '%') {
          event.preventDefault()
          this.inputPercent()
        } else if (key === 'Backspace') {
          event.preventDefault()
          this.clearLastChar()
        } else if (key === 'Clear') {
          event.preventDefault()
          
          if (this.state.displayValue !== '0') {
            this.clearDisplay()
          } else {
            this.clearAll()
          }
        }
      };

      componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
      }

      componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
      }

      render() {
        const { displayValue } = this.state
        
        const clearDisplay = displayValue !== '0'
        const clearText = clearDisplay ? 'C' : 'AC'
        
        return (
          <div className="calculator" style={{ height: "100vh" }}>

        <h1 className='pageHeader'>Calculator</h1>
        <Link to="/">
            <img title='Back To Home Page' className='backBtn' src={Back} />
        </Link>

            <CalcDisplay value={displayValue}/>
            <div className="calculator-keypad">
              <div className="input-keys">
                <div className="function-keys">
                  <CalcKey className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalcKey>
                  <CalcKey className="key-sign" onPress={() => this.toggleSign()}>±</CalcKey>
                  <CalcKey className="key-percent" onPress={() => this.inputPercent()}>%</CalcKey>
                </div>
                <div className="digit-keys">
                  <CalcKey className="key-0" onPress={() => this.inputDigit(0)}>0</CalcKey>
                  <CalcKey className="key-dot" onPress={() => this.inputDot()}>●</CalcKey>
                  <CalcKey className="key-1" onPress={() => this.inputDigit(1)}>1</CalcKey>
                  <CalcKey className="key-2" onPress={() => this.inputDigit(2)}>2</CalcKey>
                  <CalcKey className="key-3" onPress={() => this.inputDigit(3)}>3</CalcKey>
                  <CalcKey className="key-4" onPress={() => this.inputDigit(4)}>4</CalcKey>
                  <CalcKey className="key-5" onPress={() => this.inputDigit(5)}>5</CalcKey>
                  <CalcKey className="key-6" onPress={() => this.inputDigit(6)}>6</CalcKey>
                  <CalcKey className="key-7" onPress={() => this.inputDigit(7)}>7</CalcKey>
                  <CalcKey className="key-8" onPress={() => this.inputDigit(8)}>8</CalcKey>
                  <CalcKey className="key-9" onPress={() => this.inputDigit(9)}>9</CalcKey>
                </div>
              </div>
              <div className="operator-keys">
                <CalcKey className="key-divide" onPress={() => this.performOper('/')}>÷</CalcKey>
                <CalcKey className="key-multiply" onPress={() => this.performOper('*')}>×</CalcKey>
                <CalcKey className="key-subtract" onPress={() => this.performOper('-')}>−</CalcKey>
                <CalcKey className="key-add" onPress={() => this.performOper('+')}>+</CalcKey>
                <CalcKey className="key-equals" onPress={() => this.performOper('=')}>=</CalcKey>
              </div>
            </div>
          </div>
        )
      }
}

export default Calculator;