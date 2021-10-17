import {
    AlertButton,
    AlertOptions,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar, useIonAlert,
    useIonViewWillEnter
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {useHistory} from "react-router-dom";
import {Storage} from '@ionic/storage';
import React, {useState} from "react";
import {HookOverlayOptions} from '@ionic/react/dist/types/hooks/HookOverlayOptions';
import { AndroidPermissions } from '@ionic-native/android-permissions';

const initialStorageCheck = async (store: Storage, present: { (message: string, buttons?: AlertButton[] | undefined): void; (options: AlertOptions & HookOverlayOptions): void; (arg0: { cssClass: string; header: string; message: string; buttons: (string | { text: string; handler: (d: any) => void; })[]; onDidDismiss: (e: any) => void; }): void; }) => {
    await store.create();

    let arrayFromStorage = await store.get("storedActivities");

    if (arrayFromStorage === null) {
        await store.set('storedActivities', "[]");

        present({
            header: 'Welcome to Assignment 3!',
            message: 'This application makes use of your devices GPS to record your activities. This data is only used when actively recording. Permission to read and write data to your device is also required in order to store activity information.',
            buttons: [
                {text: 'Ok'},
            ],
        })
    }
}



const DashboardScreen: React.FC = () => {
    let history = useHistory();
    const store = new Storage();

    const [present] = useIonAlert();


    const [entities, setEntities] = useState([]);

    useIonViewWillEnter(() => {
        initialStorageCheck(store, present);
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Dashboard</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Today</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Trends</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Recent Activities</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            history.push("/AddActivity");
                        }}>Record New Activity</IonButton>

                    </IonCardContent>

                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default DashboardScreen;
