import {
    IonCard, IonCardSubtitle, IonCardTitle, IonContent,
    IonFab,
    IonFabButton, IonHeader,
    IonIcon, IonItem, IonList, IonPage, IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import {add, walk} from 'ionicons/icons';
import {useHistory} from "react-router-dom";
import {Storage} from "@ionic/storage";
import React, {useState} from "react";
import {TimerView} from "../../components/TimerView";


const ActivityList: React.FC = () => {
    let history = useHistory();
    const store = new Storage();

    const [entities, setEntities] = useState([]);


    useIonViewWillEnter(() => {
        makeStorage(store);
    });

    const makeStorage = async (store: Storage) => {
        await store.create();
        const name = await store.get('storedActivities');
        let arr = JSON.parse(name)
        setEntities(arr);
    }



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

                <IonList>
                {
                    entities?.flatMap(({totalTime, startingTime, key, type}) => {


                        return (

                            <IonCard key={key} onClick={(e) => {
                                e.preventDefault();
                                history.push({
                                    pathname: '/ActivityView',
                                    state: key,

                                })
                            }}>

                                <TimerView totalTime={totalTime} type={type}/>
                                <IonItem>
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
