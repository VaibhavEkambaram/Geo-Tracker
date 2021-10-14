import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './ViewActivity.css';
import {useHistory} from "react-router-dom";
import {arrowBack} from "ionicons/icons";
import {MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet'
import React, {useEffect} from "react";
import {Fragment} from "ionicons/dist/types/stencil-public-runtime";



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
                        <IonCardTitle>Map</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <MapContainer whenCreated={(map) =>
                            setInterval(() => {
                                map.invalidateSize();
                            }, 0)
                        } style={{ height: "350px" ,width: "350px"}}  center={[-41.286018, 174.776206]} zoom={50} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline color={'blue'} positions={[[-41.289989, 174.767781], [-41.288141, 174.768240], [-41.287278, 174.768723], [-41.287278, 174.768723], [-41.286372,174.767604]]}/>
                        </MapContainer>
                    </IonCardContent>
                </IonCard>



            </IonContent>
        </IonPage>
    );
};

export default ViewActivity;
