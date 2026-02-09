import { useState, useEffect } from 'react';
import CalculatorButtons from './CalculatorButtons';
import Display from './Display';
import { calculate, isOperator, formatDisplay } from '../utils/calculatorLogic';

function Calculator() {
  // Calculator state
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [error, setError] = useState(false);

  // Handle button click
  const handleButtonClick = (value) => {
    // Clear error state if there was one
    if (error) {
      setDisplay('0');
      setError(false);
    }

    // Handle numbers (0-9)
    if (!isNaN(value)) {
      if (display === '0' || waitingForNewValue) {
        setDisplay(value);
        setWaitingForNewValue(false);
      } else {
        setDisplay(display + value);
      }
      return;
    }

    // Handle decimal point
    if (value === '.') {
      if (waitingForNewValue) {
        setDisplay('0.');
        setWaitingForNewValue(false);
      } else if (!display.includes('.')) {
        setDisplay(display + '.');
      }
      return;
    }

    // Handle clear
    if (value === 'C') {
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      setError(false);
      return;
    }

    // Handle equals
    if (value === '=') {
      if (operation && previousValue !== null) {
        const result = calculate(parseFloat(previousValue), parseFloat(display), operation);
        
        if (result === 'Error') {
          setError(true);
          setDisplay('Error');
          setPreviousValue(null);
          setOperation(null);
        } else {
          setDisplay(result);
          setPreviousValue(null);
          setOperation(null);
        }
        setWaitingForNewValue(true);
      }
      return;
    }

    // Handle operations (+, -, *, /)
    if (isOperator(value)) {
      // If there's already an ongoing operation, calculate it first
      if (operation && previousValue !== null) {
        const result = calculate(parseFloat(previousValue), parseFloat(display), operation);
        
        if (result === 'Error') {
          setError(true);
          setDisplay('Error');
          setPreviousValue(null);
          setOperation(value);
          setWaitingForNewValue(true);
          return;
        }
        
        setDisplay(result);
        setPreviousValue(result);
      } else {
        setPreviousValue(display);
      }
      
      setOperation(value);
      setWaitingForNewValue(true);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      // Allow numbers 0-9
      if (key >= '0' && key <= '9') {
        handleButtonClick(key);
        return;
      }
      
      // Handle operators
      switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
          handleButtonClick(key);
          break;
        case 'Enter':
        case '=':
          handleButtonClick('=');
          break;
        case 'Escape':
        case 'c':
        case 'C':
          handleButtonClick('C');
          break;
        case '.':
          handleButtonClick('.');
          break;
        case 'Backspace':
          if (display.length > 1 && display !== 'Error') {
            setDisplay(display.slice(0, -1));
          } else if (display.length === 1 || display === 'Error') {
            setDisplay('0');
            setError(false);
          }
          break;
        default:
          return;
      }
      
      // Prevent default behavior for calculator keys
      if ([
        '0','1','2','3','4','5','6','7','8','9',
        '+','-','*','/','=','Enter','Escape','c','C','.',
        'Backspace'
      ].includes(key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, previousValue, operation, waitingForNewValue, error]);

  // Format display for better readability
  const formattedDisplay = error ? display : formatDisplay(display);

  return (
    <div className="calculator" style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <Display value={formattedDisplay} />
      <CalculatorButtons onButtonClick={handleButtonClick} />
    </div>
  );
}

export default Calculator;
