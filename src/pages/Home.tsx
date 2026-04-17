import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Calculator from '../components/Calculator';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ backgroundColor: '#1c1c1c' }}>
        <Calculator />
      </IonContent>
    </IonPage>
  );
};

export default Home;
