import {IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './AddActivity.css';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {Storage} from "@ionic/storage";


interface ActivityInformation {
    index: number;
    startingTime: string,
    endingTime: string;
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
    const [totalTime, setTotalTime] = useState(0);
    const [stringToSet, setStringToSet] = useState("");


    let totalActivityTime;
    const saveInformation = async (activityToBeAdded: ActivityInformation) => {
        const store = new Storage();
        await store.create();

        console.log(await store.get("storedActivities"));
        let arr = JSON.parse(await store.get("storedActivities"))
        console.log(arr.length);
        activityToBeAdded.index = (arr.length);
        //arr.push(activityToBeAdded)
        arr.unshift(activityToBeAdded)
        setStringToSet(JSON.stringify(arr));
        //await store.set("storedActivities", JSON.stringify(arr))
    }

    async function executeSave() {
        console.log("Saving");
        const store = new Storage();
        await store.create();
        await store.set("storedActivities", stringToSet);
    }

    useIonViewWillEnter(() => {
        totalActivityTime = history.location.state.totalTime
        setTotalTime(totalActivityTime)
        saveInformation(history.location.state);

    });

    console.log("String to set: " + stringToSet);

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
                    executeSave();
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
