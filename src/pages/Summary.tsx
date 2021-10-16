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
import './AddActivity.css';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {Storage} from "@ionic/storage";
import L, {LatLngExpression} from 'leaflet';
import {Filesystem, Directory, Encoding} from '@capacitor/filesystem';


interface ActivityInformation {
    index: number;
    startingTime: string,
    totalTime: number;
    locations: LocationSnippet[];
}


interface LocationSnippet {
    latitude: number;
    longitude: number;
    altitude: number;
}

const Summary: React.FC = () => {
    let history = useHistory<ActivityInformation>();
    const store = new Storage();
    const [totalTime, setTotalTime] = useState(0);

    const [totalTimeState, setTotalTimeState] = useState([]);

    let totalActivityTime;
    let totalLocations;

    let mapArray: Array<LatLngExpression> = [];


    const saveInformation = async (activityToBeAdded: ActivityInformation) => {
        const store = new Storage();
        await store.create();






        console.log(await store.get("storedActivities"));
        let arr = JSON.parse(await store.get("storedActivities"))
        console.log(arr.length);
        activityToBeAdded.index = (arr.length);
        arr.push(activityToBeAdded)
        await store.set("storedActivities", JSON.stringify(arr))



    }


    useIonViewWillEnter(() => {
        totalActivityTime = history.location.state.totalTime
        setTotalTime(totalActivityTime)

        let activityToBeAdded = history.location.state;

        saveInformation(activityToBeAdded);
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
