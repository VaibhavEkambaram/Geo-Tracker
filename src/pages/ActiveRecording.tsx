import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddActivity.css';
import { useHistory } from "react-router-dom";
import { useState, useRef } from 'react';
import React from 'react';



const ActiveRecording: React.FC = () => {

  let history = useHistory();

  const [startDate, setStartDate] = useState(new Date());
  const [diff, setDiff] = useState("00:00:00");
  const [timer, setTimer] = useState();



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Active Recording</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Recording</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton expand="block" onClick={(e) => {
              e.preventDefault();
              history.push("/Summary");
            }}>Finish Recording</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ActiveRecording;
