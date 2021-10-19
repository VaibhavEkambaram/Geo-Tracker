import React, {useState} from "react";
import {
    AlertButton,
    AlertOptions, IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonViewWillEnter
} from '@ionic/react';
import {useHistory} from "react-router-dom";
import {Storage} from '@ionic/storage';
import {HookOverlayOptions} from '@ionic/react/dist/types/hooks/HookOverlayOptions';
import {LastActivity} from "../../components/LastActivity";
import TimeToSeconds from "../../util/TimeToSeconds";


const Dashboard: React.FC = () => {
    let history = useHistory();
    const store = new Storage();

    const [present] = useIonAlert();


    const [entities, setEntities] = useState([]);
    const [trendsTime, setTrendsTime] = useState(0);
    const [trendsDistance, setTrendsDistance] = useState(0);
    const [dailyTime, setDailyTime] = useState(0);
    const [dailyDistance, setDailyDistance] = useState(0);



    useIonViewWillEnter(() => {
        initialStorageCheck(store, present);
    });

    const initialStorageCheck = async (store: Storage, present: { (message: string, buttons?: AlertButton[] | undefined): void; (options: AlertOptions & HookOverlayOptions): void; (arg0: { cssClass: string; header: string; message: string; buttons: (string | { text: string; handler: (d: any) => void; })[]; onDidDismiss: (e: any) => void; }): void; }) => {
        await store.create();

        let arrayFromStorage = await store.get("storedActivities");

        if (arrayFromStorage === null) {
            arrayFromStorage = await store.set('storedActivities', "[]");

            present({
                header: 'Welcome to Assignment 3!',
                message: 'This application makes use of your devices GPS to record your activities. This data is only used when actively recording. Permission to read and write data to your device is also required in order to store activity information.',
                buttons: [
                    {text: 'Ok'},
                ],
            })
        }
        let arrayParsed = JSON.parse(arrayFromStorage);

        calculateTrends(arrayParsed);


        setEntities(arrayParsed);

    }

    const calculateTrends = (arrayParsed: any[]) => {

        let cumulativeTime = 0;
        let cumulativeDistance = 0;

        let dailyTime = 0;
        let dailyDistance = 0;

        let currentDate = new Date();

        for (let i = 0; i < arrayParsed.length; i++) {
            cumulativeTime += arrayParsed[i].totalTime;
            cumulativeDistance += arrayParsed[i].totalDistance;


            let isSameDate = true;


            if (new Date(arrayParsed[i].startingTime).getDate() !== currentDate.getDate()) {
                isSameDate = false;
            }

            if (new Date(arrayParsed[i].startingTime).getMonth() !== currentDate.getMonth()) {
                isSameDate = false;
            }


            if (new Date(arrayParsed[i].startingTime).getFullYear() !== currentDate.getFullYear()) {
                isSameDate = false;
            }

            if(isSameDate){
                dailyTime += arrayParsed[i].totalTime;
                dailyDistance += arrayParsed[i].totalDistance;
            }
        }

        setTrendsTime(cumulativeTime);
        setTrendsDistance(cumulativeDistance);
        setDailyTime(dailyTime);
        setDailyDistance(dailyDistance);

    }


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
                        <IonBadge>
                            Activity Time Today: {('0' + Math.floor((trendsTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                            :{('0' + Math.floor(trendsTime / 6000)).slice(-2)}
                            :{('0' + Math.floor((trendsTime / 100) % 60)).slice(-2)}
                            :{('0' + Math.floor(trendsTime % 100)).slice(-2)}</IonBadge><br/>
                        <IonBadge>Distance Covered Today: {Math.round(dailyDistance * 100) / 100} m</IonBadge>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Trends</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonBadge>Total
                            Time: {('0' + Math.floor((trendsTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                            :{('0' + Math.floor(trendsTime / 6000)).slice(-2)}
                            :{('0' + Math.floor((trendsTime / 100) % 60)).slice(-2)}
                            :{('0' + Math.floor(trendsTime % 100)).slice(-2)}</IonBadge><br/>

                        <IonBadge>Total Distance: {Math.round(trendsDistance * 100) / 100} m</IonBadge>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Activities</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardSubtitle>Last Activity</IonCardSubtitle>

                        <LastActivity entities={entities}/>


                        <IonCardSubtitle>Actions</IonCardSubtitle>

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

export default Dashboard;
