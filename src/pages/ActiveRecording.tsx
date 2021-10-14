import {
    IonButton,
    useIonAlert,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    IonText, IonItem, useIonViewWillEnter, IonCardSubtitle, useIonViewDidEnter
} from '@ionic/react';
import './AddActivity.css';
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {DeviceMotion, DeviceMotionAccelerationData} from "@ionic-native/device-motion";
import {interval, Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";





interface ActivityInformation {
    totalTime: number;
}


const ActiveRecording: React.FC = () => {

    let history = useHistory();

    // let deviceMotion = new DeviceMotion;

    const [accelerationX, setAccelerationX] = useState(0);
    const [accelerationY, setAccelerationY] = useState(0);
    const [accelerationZ, setAccelerationZ] = useState(0);

    const [time, setTime] = useState(0);
    const [watchOn, setWatchOn] = useState(false);
    const [status, setStatus] = useState(0);


    let source: Observable<number>;
    let subscribe: { unsubscribe: () => void; };

    useEffect(() => {
        source = interval(1000);
        subscribe = source.subscribe(refreshInformation)


        const unsubscribe = new Subject();
        interval(10)
            .pipe(takeUntil(unsubscribe))
            .subscribe(() => {
                if (watchOn) {
                    setTime(val => val + 1);
                }
            });
        return () => {
            unsubscribe.next(1)
            unsubscribe.complete();
        };
    }, [watchOn]);

    function refreshInformation() {
        DeviceMotion.getCurrentAcceleration().then(
            (acceleration: DeviceMotionAccelerationData) => {
                setAccelerationX(acceleration.x)
                setAccelerationY(acceleration.y)
                setAccelerationZ(acceleration.z)
            },
            (error: any) => console.log(error)
        );
    }


    const handleStart = () => {
        setWatchOn(prevState => !prevState);
        setStatus(1);
    }


    const handleResume = () => {
        handleStart();
    }


    const handleStop = () => {
        if (time !== 0) {
            setWatchOn(false);
        }
        setStatus(2);
    }


    const handleReset = () => {
        setTime(0);
        setWatchOn(false);
        setStatus(0);
    }

    const getLocation = async () => {

    };

    useIonViewWillEnter(() => {
        handleReset();
        handleStart();
    });

    useIonViewDidEnter( () => {
        getLocation();

    });

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
                        <IonCardTitle>
                            {('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}
                            :{('0' + Math.floor(time / 6000)).slice(-2)}
                            :{('0' + Math.floor((time / 100) % 60)).slice(-2)}
                            :{('0' + Math.floor(time % 100)).slice(-2)}
                        </IonCardTitle>
                    </IonCardHeader>
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
                        <IonButton expand="block" onClick={async (e) => {handleResume()}}>Pause/Resume Timer</IonButton>
                        <IonButton expand="block" onClick={(e) => {
                            handleStop();
                            e.preventDefault();

                            let activityInformation: ActivityInformation = {
                                totalTime: time,
                            };
                            console.log(activityInformation)


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
