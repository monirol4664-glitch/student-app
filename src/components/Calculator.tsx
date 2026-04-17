import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecond) {
      setDisplay(digit);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecond(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return first / second;
      default: return second;
    }
  };

  const evaluate = () => {
    if (firstOperand !== null && operator !== null && !waitingForSecond) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const buttonStyle = {
    height: '80px',
    fontSize: '24px',
    margin: '4px',
    borderRadius: '12px'
  };

  return (
    <>
      <div style={{
        backgroundColor: '#000',
        padding: '20px',
        borderRadius: '20px',
        marginBottom: '20px',
        textAlign: 'right'
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: '48px',
          margin: 0,
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {display}
        </h1>
      </div>

      <IonGrid>
        <IonRow>
          <IonCol><IonButton expand="block" style={buttonStyle} color="danger" onClick={clear}>C</IonButton></IonCol>
          <IonCol><IonButton expand="block" style={buttonStyle} color="light" onClick={() => performOperation('÷')}>÷</IonButton></IonCol>
        </IonRow>

        {[
          ['7', '8', '9', '×'],
          ['4', '5', '6', '-'],
          ['1', '2', '3', '+'],
        ].map((row, i) => (
          <IonRow key={i}>
            {row.map((btn) => (
              <IonCol key={btn}>
                <IonButton
                  expand="block"
                  style={buttonStyle}
                  color={['×', '-', '+'].includes(btn) ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (['×', '-', '+'].includes(btn)) performOperation(btn);
                    else inputDigit(btn);
                  }}
                >
                  {btn}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        ))}

        <IonRow>
          <IonCol><IonButton expand="block" style={buttonStyle} color="secondary" onClick={() => inputDigit('0')}>0</IonButton></IonCol>
          <IonCol><IonButton expand="block" style={buttonStyle} color="secondary" onClick={inputDecimal}>.</IonButton></IonCol>
          <IonCol size="2">
            <IonButton expand="block" style={buttonStyle} color="success" onClick={evaluate}>=</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Calculator;
