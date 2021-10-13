import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './AddActivity.css';
import { useHistory } from "react-router-dom";
import {arrowBack} from "ionicons/icons";





const ViewActivity: React.FC = () => {

  let history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Activity</IonTitle>
            <IonButton slot="start" onClick={(e) => {
                // Passes favourite information to AddFavourite
                e.preventDefault();
                history.goBack();
            }}>
                <IonIcon icon={arrowBack} />
            </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">View Activity</IonTitle>
          </IonToolbar>
        </IonHeader>



      </IonContent>
    </IonPage>
  );
};

export default ViewActivity;
