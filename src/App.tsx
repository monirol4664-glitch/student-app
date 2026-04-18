import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useState } from 'react';

/* Core CSS */
import '@ionic/react/css/core.css';

const App: React.FC = () => {
  const [message, setMessage] = useState('Tap button');

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My APK Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <h2>Working on Phone!</h2>
        <p>{message}</p>
        <IonButton onClick={() => setMessage('APK built successfully! 🎉')}>
          Test Me
        </IonButton>
      </IonContent>
    </IonApp>
  );
};

export default App;
