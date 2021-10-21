import React, {useState} from "react";
import {IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import {useHistory} from "react-router-dom";
import {Storage} from '@ionic/storage';
import {LastActivity} from "../components/LastActivity";

/**
 * Dashboard - This is the main home screen for the app. Shows basic trends stats and most recent activity.
 */
const Dashboard: React.FC = () => {
    let history = useHistory();
    const store = new Storage();

    // Array of the currently stored entities
    const [entities, setEntities] = useState([]);

    // Trends stats
    const [trendsTime, setTrendsTime] = useState(0);
    const [trendsDistance, setTrendsDistance] = useState(0);
    const [dailyTime, setDailyTime] = useState(0);
    const [dailyDistance, setDailyDistance] = useState(0);

    /**
     * On entering the page perform a storage check to make sure the filesystem has been set up
     */
    useIonViewWillEnter(() => {
        initialStorageCheck(store);
    });

    /**
     * Perform a storage check, setup the filesystem if not done already, then assign the entities accordingly
     * @param store
     */
    const initialStorageCheck = async (store: Storage) => {
        await store.create();

        let arrayFromStorage = await store.get("storedActivities");

        if (arrayFromStorage === null) {
            arrayFromStorage = await store.set('storedActivities', "[]");
        }
        let arrayParsed = JSON.parse(arrayFromStorage);
        calculateTrends(arrayParsed);
        setEntities(arrayParsed);
    }

    /**
     * Compute trends using the currently available data.
     * @param arrayParsed parsed activities array
     */
    const calculateTrends = (arrayParsed: any[]) => {

        // Variables to assign
        let cumulativeTime = 0;
        let cumulativeDistance = 0;
        let dailyTime = 0;
        let dailyDistance = 0;

        // Get current date
        let currentDate = new Date();

        // Loop through all activity records
        for (let i = 0; i < arrayParsed.length; i++) {
            // Add to total time and distance
            cumulativeTime += arrayParsed[i].totalTime;
            cumulativeDistance += arrayParsed[i].totalDistance;

            // Check if the date of the entry is the same as the current one
            let isSameDate = true;
            if (new Date(arrayParsed[i].startingTime).getDate() !== currentDate.getDate()) isSameDate = false;
            if (new Date(arrayParsed[i].startingTime).getMonth() !== currentDate.getMonth()) isSameDate = false;
            if (new Date(arrayParsed[i].startingTime).getFullYear() !== currentDate.getFullYear()) isSameDate = false;

            if(isSameDate){
                // if same date then add to the time and distance
                dailyTime += arrayParsed[i].totalTime;
                dailyDistance += arrayParsed[i].totalDistance;
            }
        }

        // Set states
        setTrendsTime(cumulativeTime);
        setTrendsDistance(cumulativeDistance);
        setDailyTime(dailyTime);
        setDailyDistance(dailyDistance);
    }


    return (
        <IonPage>
            <IonHeader>
                {/* Header */}
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
                    {/* Today Trends View */}
                    <IonCardHeader>
                        <IonCardTitle>Today</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonBadge>
                            Activity Time Today: {('0' + Math.floor((dailyTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                            :{('0' + Math.floor(dailyTime / 6000)).slice(-2)}
                            :{('0' + Math.floor((dailyTime / 100) % 60)).slice(-2)}
                            :{('0' + Math.floor(dailyTime % 100)).slice(-2)}</IonBadge><br/>
                        <IonBadge>Distance Covered Today: {Math.round(dailyDistance * 100) / 100} m</IonBadge>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    {/* Overall Trends View */}
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
                        {/* Most Recent Activity */}
                        <IonCardSubtitle>Last Activity</IonCardSubtitle>

                        <LastActivity entities={entities}/>
                        {/* Most Recent Activity */}

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
