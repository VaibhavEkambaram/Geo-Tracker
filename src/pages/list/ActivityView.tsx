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
import {useHistory} from "react-router-dom";
import {arrowBack} from "ionicons/icons";
import {MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet'
import React, {useEffect, useState} from "react";
import {Fragment} from "ionicons/dist/types/stencil-public-runtime";

import {LatLng, latLng, LatLngExpression} from "leaflet";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {Storage} from "@ionic/storage";
import {MapView} from "../../components/MapView";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


const ActivityView: React.FC = () => {


    let history = useHistory();
    let pos;

    const [present] = useIonAlert();

    const [positions, setPositions] = useState<LatLng[]>([]);
    const [latOrigin, setLatOrigin] = useState(0);
    const [lonOrigin, setLonOrigin] = useState(0);

    const [latDest, setLatDest] = useState(0);
    const [lonDest, setLonDest] = useState(0);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);

    const [locality, setLocality] = useState("");


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
        setTotalDistance(arr[index].totalDistance);

        for (let i = 0; i < arr[index].locations.length; i++) {
            if (i === 0) {
                setLatOrigin(arr[index].locations[i].latitude)
                setLonOrigin(arr[index].locations[i].longitude)
            } else {
                if(i === (arr[index].locations.length - 1)){
                    setLatDest(arr[index].locations[i].latitude)
                    setLonDest(arr[index].locations[i].longitude)
                }
            }

            console.log(arr[index].locations[i].latitude + " " + arr[index].locations[i].longitude);
            pos.push(latLng(arr[index].locations[i].latitude, arr[index].locations[i].longitude));
        }
        setPositions(pos);

        let h = (('0' + Math.floor((arr[index].totalTime / (1000 * 60 * 60)) % 24)).slice(-2));
        let hs = parseInt(h) * 3600;
        let m = ('0' + Math.floor(arr[index].totalTime / 6000)).slice(-2);
        let ms = parseInt(m) * 60;
        let s = ('0' + Math.floor((arr[index].totalTime / 100) % 60)).slice(-2);
        let ss = parseInt(s);
        let n = ('0' + Math.floor(arr[index].totalTime % 100)).slice(-2);
        let ns = parseInt(n) / 100;

        let cumulativeSeconds = (hs + ms + ss + ns);
        let avgSpeed = arr[index].totalDistance / cumulativeSeconds;
        setAverageSpeed(avgSpeed);

        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        NativeGeocoder.reverseGeocode(arr[index].locations[0].latitude, arr[index].locations[0].longitude, options)
            .then((result: NativeGeocoderResult[]) => setLocality(result[0].subLocality + ", " + result[0].locality))
            .catch((error: any) => console.log(error));


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
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Total Distance:</IonCardSubtitle>
                        <IonCardTitle>{totalDistance} m</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonLabel>Average Speed (m/s): {averageSpeed} m/s</IonLabel>
                        <div></div>
                        <IonLabel>Average Speed (km/h): {averageSpeed*3.6} km/h</IonLabel>
                    </IonCardContent>
                </IonCard>

                <MapView positions={positions} lat={latOrigin} lon={lonOrigin} latDest={latDest} lonDest={lonDest} locality={locality}/>


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

export default ActivityView;
