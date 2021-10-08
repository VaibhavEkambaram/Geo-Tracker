import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddActivity.css';
import { useHistory } from "react-router-dom";



const Summary: React.FC = () => {

  let history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary</IonTitle>
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
              history.push("/tab2");
            }}>Save Activity</IonButton>

      
      </IonContent>
    </IonPage>
  );
};

export default Summary;
