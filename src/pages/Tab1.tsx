import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useHistory } from "react-router-dom";


const Tab1: React.FC = () => {
  let history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Today</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Trends</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Recent Activities</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <IonButton expand="block" onClick={(e) => {
              e.preventDefault();
              history.push("/AddActivity");
            }}>Record New Activity</IonButton>

          </IonCardContent>

        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
