import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddActivity.css';
import { useHistory } from "react-router-dom";



const ActiveRecording: React.FC = () => {

  let history = useHistory();

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
            <IonTitle size="large">Start Recording</IonTitle>
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
