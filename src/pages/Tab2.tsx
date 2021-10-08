import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useHistory } from "react-router-dom";


const Tab2: React.FC = () => {
  let history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={(e) => {
              e.preventDefault();
              history.push("/AddActivity");
            }}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonButton expand="block" onClick={(e) => {
              e.preventDefault();
              history.push("/ViewActivity");
            }}>View Activity</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
