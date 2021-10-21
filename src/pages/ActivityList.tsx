import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {IonCard, IonCardSubtitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import {Storage} from "@ionic/storage";
import {add} from 'ionicons/icons';
import {TimerView} from "../components/TimerView";

/**
 * Activity List - Show saved activities.
 */
const ActivityList: React.FC = () => {
    let history = useHistory(); // history navigation prop
    const store = new Storage(); // Ionic storage prop

    // State to store all activity entities
    const [entities, setEntities] = useState([]);

    /**
     * On entering the page then get activities from storage.
     */
    useIonViewWillEnter(() => {
        getFromStorage(store);
    });

    /**
     * Get stored activities from storage.
     * @param store storage prop to be used
     */
    const getFromStorage = async (store: Storage) => {
        await store.create();
        const name = await store.get('storedActivities');
        // parse JSON storage back to an array
        let arr = JSON.parse(name)
        setEntities(arr);
    }

    return (
        <IonPage>
            {/* Header */}
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

                {/* Add Activity Floating Action Button */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={(e) => {
                        e.preventDefault();
                        history.push("/AddActivity");
                    }}>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>

                {/* List Stored Entities */}
                <IonList>
                    {
                        entities?.flatMap(({totalTime, startingTime, key, type}) => {
                            return (
                                // When clicked then go to the individual activity page
                                <IonCard key={key} onClick={(e) => {
                                    e.preventDefault();
                                    history.push({
                                        pathname: '/ActivityView',
                                        state: key,
                                    })
                                }}>
                                    {/* View Time and Activity Type*/}
                                    <TimerView totalTime={totalTime} type={type}/>
                                    <IonItem>
                                        {/* View Starting Time */}
                                        <IonCardSubtitle>{new Date(startingTime).toLocaleString()}</IonCardSubtitle>
                                    </IonItem>
                                </IonCard>
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ActivityList;
