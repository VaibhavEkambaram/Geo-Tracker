import {
    IonCard, IonCardSubtitle, IonCardTitle, IonContent,
    IonFab,
    IonFabButton, IonHeader,
    IonIcon, IonItem, IonPage, IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import {add, walk} from 'ionicons/icons';
import './Tab2.css';
import {useHistory} from "react-router-dom";
import {Storage} from "@ionic/storage";
import React, {useState} from "react";


const ActivityListScreen: React.FC = () => {
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

    console.log("Number of elements: " + entities.length);
    console.log(entities[0])
    console.log(entities[1])

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


                {
                    entities?.flatMap(({index, totalTime, startingTime, endingTime}) => {


                        return (

                            <IonCard key={index} onClick={(e) => {
                                e.preventDefault();
                                console.log("I: " + index)
                                history.push({
                                    pathname: '/ViewActivity',
                                    state: index,

                                })
                            }}>


                                <IonItem>
                                    <IonCardTitle>{('0' + Math.floor((totalTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                                        :{('0' + Math.floor(totalTime / 6000)).slice(-2)}
                                        :{('0' + Math.floor((totalTime / 100) % 60)).slice(-2)}
                                        :{('0' + Math.floor(totalTime % 100)).slice(-2)}</IonCardTitle>
                                    <IonIcon slot="end" icon={walk}/>
                                </IonItem>
                                <IonItem>
                                    <IonCardSubtitle>{startingTime}</IonCardSubtitle>
                                </IonItem>
                            </IonCard>

                        )
                    })
                }


            </IonContent>
        </IonPage>
    );
};

export default ActivityListScreen;