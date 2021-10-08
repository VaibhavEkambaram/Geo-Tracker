import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddActivity.css';
import { useHistory } from "react-router-dom";



const AddActivity: React.FC = () => {
  let history = useHistory();


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Activity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Activity</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard onClick={(e) => {
              e.preventDefault();
              history.push("/StartRecording");
            }}>
          <IonCardHeader>
            <IonCardTitle>Auto Detect</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Walking</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Running</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Cycling</IonCardTitle>
          </IonCardHeader>
        </IonCard>

      
      </IonContent>
    </IonPage>
  );
};

export default AddActivity;
