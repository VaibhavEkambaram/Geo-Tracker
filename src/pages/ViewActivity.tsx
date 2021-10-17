import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar, useIonAlert, useIonViewWillEnter
} from '@ionic/react';
import './ViewActivity.css';
import {useHistory} from "react-router-dom";
import {arrowBack} from "ionicons/icons";
import {MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet'
import React, {useEffect, useState} from "react";
import {Fragment} from "ionicons/dist/types/stencil-public-runtime";

import {LatLng, latLng, LatLngExpression} from "leaflet";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {Storage} from "@ionic/storage";
import {MapView} from "../components/MapView";


const ViewActivity: React.FC = () => {


    let history = useHistory();
    let pos;
    //let pos = [latLng(-41.289989, 174.767781), latLng(-41.288141, 174.768240), latLng(-41.287278, 174.768723), latLng(-41.287278, 174.768723), latLng(-41.286372,174.767604)];

    const [present] = useIonAlert();

    const [positions, setPositions] = useState<LatLng[]>([]);
    const [latOrigin, setLatOrigin] = useState(0);
    const [lonOrigin, setLonOrigin] = useState(0);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [key, setKey] = useState(0);


    const deleteActivity = async (key: number, e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {

        present({
            header: 'Deleting Activity!',
            message: 'Are you sure you want to delete this activity?' +
                ' Once this activity has been removed it can NOT be recovered.' +
                ' After deletion, you will be returned to the My Activities Screen',
            buttons: [
                'Cancel',
                {text: 'Delete', handler: (d) => executeDelete(key, e)},
            ],
            // onDidDismiss: (e) => console.log('did dismiss'),
        })

    }

    const executeDelete = async (key: number, e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {

        const store = new Storage();
        await store.create();
        const name = await store.get('storedActivities');

        pos = [];

        console.log("Stored Activities: " + name)

        let arr = JSON.parse(name)
        console.log("Array Length: " + arr.length);

        let index = 0;

        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].key) === key) {
                index = i;
            }
        }

        arr.splice(index, 1);
        let updatedString = JSON.stringify(arr);
        await store.set("storedActivities", updatedString);

        e.preventDefault();
        history.goBack();
    }


    const saveInformation = async (key: number) => {
        const store = new Storage();
        await store.create();
        const name = await store.get('storedActivities');

        pos = [];

        console.log("Stored Activities: " + name)

        let arr = JSON.parse(name)
        console.log("Array Length: " + arr.length);

        let index = 0;

        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].key) === key) {
                index = i;
            }
        }

        setStartTime(arr[index].startingTime);
        setEndTime(arr[index].endingTime);
        setTotalTime(arr[index].totalTime);

        for (let i = 0; i < arr[index].locations.length; i++) {
            if (i === 0) {
                setLatOrigin(arr[index].locations[i].latitude)
                setLonOrigin(arr[index].locations[i].longitude)
            }

            console.log(arr[index].locations[i].latitude + " " + arr[index].locations[i].longitude);
            pos.push(latLng(arr[index].locations[i].latitude, arr[index].locations[i].longitude));
        }
        setPositions(pos);


    }


    useIonViewWillEnter(() => {


        let key = history.location.state;
        if (key !== undefined) {
            if (typeof key === "number") {
                setKey(key);
                saveInformation(key);
            }
        }


    });


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
                        <IonIcon icon={arrowBack}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">View Activity</IonTitle>
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
                    <IonCardContent>
                        <IonLabel>Start Time: {startTime}</IonLabel>
                        <div></div>
                        <IonLabel>End Time: {endTime}</IonLabel>
                    </IonCardContent>
                </IonCard>

                <MapView positions={positions} lat={latOrigin} lon={lonOrigin}/>


                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Actions</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={(e) => {
                            // Passes favourite information to AddFavourite

                            deleteActivity(key, e);
                        }}>Delete Activity</IonButton>


                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default ViewActivity;
