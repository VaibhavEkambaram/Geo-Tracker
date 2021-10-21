import {
    IonButton,
    IonCard, IonCardContent,
    IonCardHeader,
    IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {TimerView} from "../../components/TimerView";
import {ActivityInformation} from "../../models/ActivityInterface";
import React from "react";
import {useHistory} from "react-router-dom";

/**
 * Active Recording View.
 */
export function ActiveRecordingView(props: { time: number, type: string, latitude: number, longitude: number, altitude: number, totalDistance: number, averageSpeed: number, handleTimerResume: any, getLocation: any, handleTimerStop: any, startDate: any, locations: any }) {
    let {
        time,
        type,
        latitude,
        longitude,
        altitude,
        totalDistance,
        averageSpeed,
        handleTimerResume,
        getLocation,
        handleTimerStop,
        startDate,
        locations
    } = props;
    let history = useHistory();
    return (
        <IonPage>
            {/* Header and Back Button */}
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
                {/* Total Elapsed Time and Activity Type */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Total Elapsed Time:</IonCardSubtitle>
                        <TimerView totalTime={time} type={type}/>
                    </IonCardHeader>
                </IonCard>
                {/* Location Card */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Location</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardSubtitle>Coordinates: {latitude} {longitude}</IonCardSubtitle>
                        <IonCardSubtitle> Altitude: {altitude}</IonCardSubtitle>
                        <IonCardSubtitle> Total Distance Covered: {totalDistance} m</IonCardSubtitle>
                        <IonCardSubtitle> Total Average Speed: {averageSpeed * 3.6} km/h</IonCardSubtitle>
                    </IonCardContent>
                </IonCard>
                {/* Pause and Complete Activity Buttons */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Actions</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={async () => {
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

}
