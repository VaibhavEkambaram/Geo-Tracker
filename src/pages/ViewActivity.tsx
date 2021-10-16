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
    IonToolbar, useIonViewWillEnter
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

    const [positions, setPositions] = useState<LatLng[]>([]);
    const [latOrigin, setLatOrigin] = useState(0);
    const [lonOrigin, setLonOrigin] = useState(0);

    const [totalTime, setTotalTime] = useState(0);


    const saveInformation = async (index: number) => {
        const store = new Storage();
        await store.create();
        const name = await store.get('storedActivities');

        pos = [];

        console.log("Stored Activities: " + name)

        let arr = JSON.parse(name)
        console.log("Array Length: "+  arr.length);

        setTotalTime(arr[index].totalTime)

        for(let i=0; i < arr[index].locations.length; i++){
            if(i===0){
                setLatOrigin(arr[index].locations[i].latitude)
                setLonOrigin(arr[index].locations[i].longitude)
            }

            console.log(arr[index].locations[i].latitude + " " + arr[index].locations[i].longitude);
            pos.push(latLng(arr[index].locations[i].latitude,arr[index].locations[i].longitude));
        }
        setPositions(pos);



    }


    useIonViewWillEnter(() => {


        let index = history.location.state;
        if(index!==undefined){
            if (typeof index === "number") {
                saveInformation(index);
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
                </IonCard>

                <MapView positions={positions} lat={latOrigin} lon={lonOrigin}/>




            </IonContent>
        </IonPage>
    );
};

export default ViewActivity;
