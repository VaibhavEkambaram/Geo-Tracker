import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage, IonText,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddActivity.css';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";



interface ActivityInformation {
    totalTime: number;
}

const Summary: React.FC = () => {
    let history = useHistory<ActivityInformation>();

    const [totalTime, setTotalTime] = useState(0);

    let activityArray;

    useIonViewWillEnter(() => {
        activityArray = history.location.state.totalTime
        setTotalTime(activityArray)
        console.log(activityArray)
    });

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
                        <IonTitle size="large">Summary</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Total Time:</IonCardSubtitle>
                        <IonCardTitle>
                            {('0' + Math.floor((totalTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                            :{('0' + Math.floor(totalTime / 6000)).slice(-2)}
                            :{('0' + Math.floor((totalTime / 100) % 60)).slice(-2)}
                            :{('0' + Math.floor(totalTime % 100)).slice(-2)}
                        </IonCardTitle>
                    </IonCardHeader>
                </IonCard>



                <IonButton expand="block" onClick={(e) => {
                    e.preventDefault();
                    history.push("/tab2");
                }}>Save Activity</IonButton>
                <IonButton expand="block" onClick={(e) => {
                    e.preventDefault();
                    history.push("/tab1");
                }}>Discard Activity</IonButton>


            </IonContent>
        </IonPage>
    );
};

export default Summary;
