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
                        <IonCardTitle>Data</IonCardTitle>
                        <IonCardSubtitle color="primary">Geo Tracker Version "TEST"</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>About</IonCardTitle>
                        <IonCardSubtitle color="primary">Geo Tracker Version "TEST"</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>


            </IonContent>
        </IonPage>
    );
};

export default Settings;
