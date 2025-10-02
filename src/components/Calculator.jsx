import { useState } from 'react'
import Display from './Display'
import Button from './Button'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      if (newValue === 'Error') {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        if (secondValue === 0) {
          return 'Error'
        }
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation)
      
      if (result === 'Error') {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const buttons = [
    { label: 'C', type: 'function', action: clear, span: 2 },
    { label: '/', type: 'operator', action: () => performOperation('/') },
    { label: '*', type: 'operator', action: () => performOperation('*') },
    { label: '7', type: 'digit', action: () => inputDigit(7) },
    { label: '8', type: 'digit', action: () => inputDigit(8) },
    { label: '9', type: 'digit', action: () => inputDigit(9) },
    { label: '-', type: 'operator', action: () => performOperation('-') },
    { label: '4', type: 'digit', action: () => inputDigit(4) },
    { label: '5', type: 'digit', action: () => inputDigit(5) },
    { label: '6', type: 'digit', action: () => inputDigit(6) },
    { label: '+', type: 'operator', action: () => performOperation('+') },
    { label: '1', type: 'digit', action: () => inputDigit(1) },
    { label: '2', type: 'digit', action: () => inputDigit(2) },
    { label: '3', type: 'digit', action: () => inputDigit(3) },
    { label: '=', type: 'equals', action: handleEquals, span: 1, rowSpan: 2 },
    { label: '0', type: 'digit', action: () => inputDigit(0), span: 2 },
    { label: '.', type: 'digit', action: inputDecimal },
  ]

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn.label}
            type={btn.type}
            onClick={btn.action}
            span={btn.span}
            rowSpan={btn.rowSpan}
          />
        ))}
      </div>
    </div>
  )
}

export default Calculator