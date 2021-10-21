import {useHistory} from "react-router-dom";
import {
    IonButton,
    IonCard,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";

export function SettingsView(props: {deleteThisActivity: any}) {
    let {deleteThisActivity} = props;
    let history = useHistory();
    return (
        <IonPage>
            {/* Header */}
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
                {/* Data */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Data</IonCardTitle>
                        <IonButton expand="block" onClick={(e) => {
                            deleteThisActivity(e)
                        }}>Delete All Activities</IonButton>
                    </IonCardHeader>
                </IonCard>
                {/* About */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>About</IonCardTitle>
                        <IonCardSubtitle color="primary">Geo Tracker Version 1.0</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>


            </IonContent>
        </IonPage>
    );
}
