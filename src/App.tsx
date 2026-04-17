import React, { useState } from 'react';
import { IonApp, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

const App: React.FC = () => {
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
    '--border-radius': '12px'
  };

  return (
    <IonApp>
      <IonContent className="ion-padding" style={{ backgroundColor: '#1c1c1c' }}>
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
            ['0', '.', '=']
          ].map((row, i) => (
            <IonRow key={i}>
              {row.map((btn) => (
                <IonCol key={btn}>
                  <IonButton
                    expand="block"
                    style={buttonStyle}
                    color={btn === '=' ? 'success' : ['÷', '×', '-', '+'].includes(btn) ? 'warning' : 'secondary'}
                    onClick={() => {
                      if (btn === '=') evaluate();
                      else if (btn === '.') inputDecimal();
                      else if (['÷', '×', '-', '+'].includes(btn)) performOperation(btn);
                      else inputDigit(btn);
                    }}
                  >
                    {btn}
                  </IonButton>
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
