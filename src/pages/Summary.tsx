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
import {Storage} from "@ionic/storage";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";
import L, { LatLngExpression } from 'leaflet';


interface ActivityInformation {
    totalTime: number;
    locations: LocationSnippet[];
}


interface LocationSnippet {
    latitude: number;
    longitude: number;
    altitude: number;
}


const makeStorage = async (store: Storage, totalTime: number, totalLocations: LocationSnippet[]) => {
    await store.create();

}

const Summary: React.FC = () => {
    let history = useHistory<ActivityInformation>();
    const store = new Storage();
    const [totalTime, setTotalTime] = useState(0);

    const [totalTimeState, setTotalTimeState] = useState([]);

    let totalActivityTime;
    let totalLocations;

    let mapArray: Array<LatLngExpression> = [];

    useIonViewWillEnter(() => {
        totalActivityTime = history.location.state.totalTime
        setTotalTime(totalActivityTime)
        totalLocations = history.location.state.locations;

        for (let i = 0; i < totalLocations.length; i++) {

            console.log(totalLocations[i].latitude + " " + totalLocations[i].longitude);
            var latng = new L.LatLng(totalLocations[i].latitude, totalLocations[i].longitude);
            //mapArray.push(latng);
        //    totalTimeState.push(latng);

        }

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
