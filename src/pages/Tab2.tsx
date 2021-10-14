import {
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import {add} from 'ionicons/icons';
import './Tab2.css';
import {useHistory} from "react-router-dom";
import {Storage} from "@ionic/storage";
import React from "react";
import {Motion} from "@capacitor/motion";

let arr = [];

const makeStorage = async (store: Storage) => {
    await store.create();
    const name = await store.get('activityList');
    console.log("Name: " + name.key111.time)

}


const Tab2: React.FC = () => {
    let history = useHistory();
    const store = new Storage();

    useIonViewWillEnter(() => {
        makeStorage(store);
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Activities</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={(e) => {
                        e.preventDefault();
                        history.push("/AddActivity");
                    }}>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>

                <IonButton expand="block" onClick={(e) => {
                    e.preventDefault();
                    history.push("/ViewActivity");
                }}>View Activity</IonButton>





            </IonContent>
        </IonPage>
    );
};

export default Tab2;
