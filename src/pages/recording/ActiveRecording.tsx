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
    useIonViewWillEnter, IonCardSubtitle, useIonViewDidLeave
} from '@ionic/react';
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {DeviceMotion, DeviceMotionAccelerationData} from "@ionic-native/device-motion";
import {interval, Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Geolocation} from '@ionic-native/geolocation';
import {Insomnia} from '@ionic-native/insomnia';
import {TimerView} from "../../components/TimerView";
import TimeToSeconds from '../../util/TimeToSeconds';
import {MapView} from "../../components/MapView";

interface ActivityInformation {
    index: number;
    key: number;
    startingTime: string;
    endingTime: string;
    totalTime: number;
    totalDistance: number;
    locations: LocationSnippet[];
}

interface LocationSnippet {
    latitude: number;
    longitude: number;
    altitude: number;
}

function getAcceleration() {

}


const ActiveRecording: React.FC = () => {

    let history = useHistory();



    const [accelerationX, setAccelerationX] = useState(0);
    const [accelerationY, setAccelerationY] = useState(0);
    const [accelerationZ, setAccelerationZ] = useState(0);

    const [stepCount, setStepCount] = useState(0);

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [altitude, setAltitude] = useState(0);

    const [averageSpeed, setAverageSpeed] = useState(0);

    const [totalDistance, setTotalDistance] = useState(0);
    const [locations, setLocations] = useState<Array<LocationSnippet>>([]);

    const [time, setTime] = useState(0);

    const [startDate, setStartDate] = useState("");
    const [timerStatus, setTimerStatus] = useState(false);
    const [activityType, setActivityType] = useState("");

    const timerSubscription = new Subject();


    useIonViewWillEnter(() => {
        Insomnia.keepAwake();
        // @ts-ignore
        setActivityType(history.location.state);
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


    useEffect(() => {
        interval(10)
            .pipe(takeUntil(timerSubscription))
            .subscribe(() => {
                if (timerStatus) {


                    let h = ('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2);
                    let m = ('0' + Math.floor(time / 6000)).slice(-2);
                    let s = ('0' + Math.floor((time / 100) % 60)).slice(-2);
                    let n = ('0' + Math.floor(time % 100)).slice(-2);

                    if ((parseInt(s) % 2 === 0) && (parseInt(n) === 0)) {
                        getLocation();
                    }

                    getAccelerometerData();


                    setTime(timer => timer + 1);

                }
            });
        return () => {
            timerSubscription.next(1)
            timerSubscription.complete();
        };
    }, [time, timerStatus, locations]);


    const getAccelerometerData = () => {
        DeviceMotion.getCurrentAcceleration().then(
            (acceleration: DeviceMotionAccelerationData) => {
                setAccelerationX(acceleration.x)
                setAccelerationY(acceleration.y)
                setAccelerationZ(acceleration.z)
            },
            (error: any) => console.log(error)
        );
    }


    const getLocation = async () => {
        let options = {enableHighAccuracy: true, timeout: 1000, maximumAge: 0};
        const coordinates = await Geolocation.getCurrentPosition(options);



        let newDistance = 0;
        if (latitude !== 0 && longitude !== 0) {

            const R = 6371e3; // metres
            const φ1 = latitude * Math.PI / 180; // φ, λ in radians
            const φ2 = coordinates.coords.latitude * Math.PI / 180;
            const Δφ = (coordinates.coords.latitude - latitude) * Math.PI / 180;
            const Δλ = (coordinates.coords.longitude - longitude) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const d = R * c; // in metres
            newDistance = totalDistance + d;
            setTotalDistance(newDistance);
        }


        let cumulativeSeconds = TimeToSeconds(time);

        let avgSpeed = newDistance / cumulativeSeconds;
        setAverageSpeed(avgSpeed);

        if (coordinates.coords.altitude !== 0) {
            let locationInstance: LocationSnippet = {
                latitude: coordinates.coords.latitude,
                longitude: coordinates.coords.longitude,
                altitude: coordinates.coords.altitude,
            }
            let arr = locations;
            arr.push(locationInstance);
            setLocations(arr);
        } else {
            let locationInstance: LocationSnippet = {
                latitude: coordinates.coords.latitude,
                longitude: coordinates.coords.longitude,
                altitude: 0,
            }
            let arr = locations;
            arr.push(locationInstance);
            setLocations(arr);
        }


        setLatitude(coordinates.coords.latitude)
        setLongitude(coordinates.coords.longitude)
        if (coordinates.coords.altitude !== undefined) {
            setAltitude(coordinates.coords.altitude)
        }
    };


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
                        <TimerView totalTime={time}/>
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
                        <IonCardSubtitle> Total Average Speed: {averageSpeed} m/s
                            ({averageSpeed * 3.6} km/h)</IonCardSubtitle>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Accelerometer</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardSubtitle>X Axis: {accelerationX}</IonCardSubtitle>
                        <IonCardSubtitle> Y Axis: {accelerationY}</IonCardSubtitle>
                        <IonCardSubtitle> Z Axis: {accelerationZ}</IonCardSubtitle>
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
