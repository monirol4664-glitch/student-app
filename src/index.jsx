import React from 'react';
import ReactDOM from 'react-dom/client';
import { IonApp, IonContent, IonTitle } from '@ionic/react';

import '@ionic/react/css/core.css';

function App() {
  return (
    <IonApp>
      <IonContent>
        <IonTitle>Hello World!</IonTitle>
      </IonContent>
    </IonApp>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
