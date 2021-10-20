import {
    IonCard, IonCardContent,
    IonCardHeader,
    IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonPage, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from "react";

const Settings: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>About</IonCardTitle>
                        <IonCardSubtitle color="primary">Geo Tracker Version "TEST"</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText color="danger"><i>Cordova Libraries Used:</i></IonText>
                        <IonText><br/>- Android Permissions<br/>- Geolocation<br/>- Geocoder<br/>- Insomnia<br/>- Native Storage
                        </IonText>a
                        <br/>
                        <IonText color="danger"><i>External Components Used:</i></IonText>
                        <br/>
                        <IonText>OpenStreetMap with React Leaflet</IonText>

                    </IonCardContent>
                </IonCard>


            </IonContent>
        </IonPage>
    );
};

export default Settings;
