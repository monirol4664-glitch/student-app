import React from 'react';
import { IonApp, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Ionic Demo App</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent style={{ textAlign: 'center' }}>
              <h2>Welcome to Ionic + React!</h2>
              <p style={{ fontSize: '48px', margin: '20px 0' }}>{count}</p>
              <IonButton 
                expand="block" 
                onClick={() => setCount(count + 1)}
                style={{ marginBottom: '10px' }}
              >
                Click Me
              </IonButton>
              <IonButton 
                expand="block" 
                color="danger" 
                onClick={() => setCount(0)}
              >
                Reset
              </IonButton>
            </IonCardContent>
          </IonCard>
          
          <IonCard>
            <IonCardContent>
              <h3>Features:</h3>
              <ul>
                <li>✅ Built with Ionic React</li>
                <li>✅ Native Android APK</li>
                <li>✅ GitHub Actions CI/CD</li>
                <li>✅ Material Design UI</li>
              </ul>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}

export default App;