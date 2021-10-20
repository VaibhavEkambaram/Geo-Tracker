import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    IonCardSubtitle,
    useIonViewDidLeave
} from '@ionic/react';
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Geolocation} from '@ionic-native/geolocation';
import {Insomnia} from '@ionic-native/insomnia';
import {TimerView} from "../../components/TimerView";
import TimeToSeconds from '../../util/TimeToSeconds';

interface ActivityInformation {
    index: number;
    key: number;
    startingTime: string;
    endingTime: string;
    totalTime: number;
    totalDistance: number;
    type: string;
    locations: LocationSnippet[];
}

interface LocationSnippet {
    latitude: number;
    longitude: number;
    altitude: number;
}


const ActiveRecording: React.FC = () => {

    let history = useHistory();

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [altitude, setAltitude] = useState(0);

    const [averageSpeed, setAverageSpeed] = useState(0);

    const [totalDistance, setTotalDistance] = useState(0);
    const [locations, setLocations] = useState<Array<LocationSnippet>>([]);

    const [time, setTime] = useState(0);

    const [startDate, setStartDate] = useState("");
    const [timerStatus, setTimerStatus] = useState(false);

    const timerSubscription = new Subject();

    const options = {enableHighAccuracy: true, timeout: 1000, maximumAge: 0};
    let type = history.location.state + "";


    useIonViewWillEnter(() => {
        Insomnia.keepAwake();
        // @ts-ignore
        setLatitude(0);
        setLongitude(0);
        setAltitude(0);
        setTotalDistance(0);
        setAverageSpeed(0);

        setLocations([]);
        setStartDate(new Date().toString());
        handleTimerReset();
        handleTimerStart();
    });


    useIonViewDidLeave(() => {
        Insomnia.allowSleepAgain();
        timerSubscription.unsubscribe();
    });


    const getLocation = async () => {
        const coordinates = await Geolocation.getCurrentPosition(options);

        let newDistance = 0;
        if (latitude !== 0 && longitude !== 0) {

            const v1 = latitude * Math.PI / 180;
            const v2 = coordinates.coords.latitude * Math.PI / 180;
            const v3 = (coordinates.coords.latitude - latitude) * Math.PI / 180;
            const v4 = (coordinates.coords.longitude - longitude) * Math.PI / 180;

            const a = Math.sin(v3 / 2) * Math.sin(v3 / 2) +
                Math.cos(v1) * Math.cos(v2) *
                Math.sin(v4 / 2) * Math.sin(v4 / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            newDistance = totalDistance + (6371e3 * c);
            setTotalDistance(newDistance);
        }


        let cumulativeSeconds = TimeToSeconds(time);

        let avgSpeed = newDistance / cumulativeSeconds;
        setAverageSpeed(avgSpeed);


        let locationInstance: LocationSnippet = {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
            altitude: coordinates.coords.altitude,
        }

        if (coordinates.coords.altitude === null) {
            locationInstance.altitude = 0;
        }


        let arr = locations;
        arr.push(locationInstance);
        setLocations(arr);


        setLatitude(locationInstance.latitude)
        setLongitude(coordinates.coords.longitude)
        setAltitude(locationInstance.altitude)

    };


    useEffect(() => {
        interval(10)
            .pipe(takeUntil(timerSubscription))
            .subscribe(() => {
                if (timerStatus) {
                    setTime(time + 1);

                    if ((Math.floor((time / 100) % 60) % 3 === 0 && (Math.floor(time % 100)) === 0)) {
                        getLocation();
                    }
                }
            });
        return () => {
            timerSubscription.next(1)
            timerSubscription.complete();
        };
    }, [getLocation, time, timerStatus, timerSubscription]);


    const handleTimerStart = () => {
        setTimerStatus(prevState => !prevState);
    }

    const handleTimerResume = () => {
        handleTimerStart();
    }

    const handleTimerStop = () => {
        if (time !== 0) setTimerStatus(false);
    }

    const handleTimerReset = () => {
        setTime(0);
        setTimerStatus(false);
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Active Recording</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Recording</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Total Elapsed Time:</IonCardSubtitle>
                        <TimerView totalTime={time} type={type}/>
                    </IonCardHeader>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Location</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardSubtitle>Coordinates: {latitude} {longitude}</IonCardSubtitle>
                        <IonCardSubtitle> Altitude: {altitude}</IonCardSubtitle>
                        <IonCardSubtitle> Total Distance Covered: {totalDistance} m</IonCardSubtitle>
                        <IonCardSubtitle> Total Average Speed: ({averageSpeed * 3.6} km/h)</IonCardSubtitle>
                    </IonCardContent>
                </IonCard>


                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Actions</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={async (e) => {
                            handleTimerResume()
                        }}>Pause/Resume Timer</IonButton>
                        <IonButton expand="block" onClick={(e) => {
                            let endDate = new Date().toString();
                            getLocation();
                            handleTimerStop();
                            e.preventDefault();
                            let epochTime = Date.now();


                            let activityInformation: ActivityInformation = {
                                index: 0,
                                key: epochTime,
                                startingTime: startDate,
                                endingTime: endDate,
                                totalTime: time,
                                totalDistance: totalDistance,
                                type: type,
                                locations: locations,
                            };

                            history.push({
                                pathname: '/Summary',
                                state: activityInformation,
                            })
                        }}>Complete Activity</IonButton>


                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default ActiveRecording;
