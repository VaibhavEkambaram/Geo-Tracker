import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel} from "@ionic/react";
import {TimerView} from "./TimerView";
import {MapView} from "./MapView";
import React, {Fragment} from "react";

export function SummaryView(props: { totalTime: any, startTime: any, endTime: any, totalDistance: any, averageSpeed: any, positions: any, latOrigin: any, lonOrigin: any, latDest: any, lonDest: any, locality: any }) {
    let {
        totalTime,
        startTime,
        endTime,
        totalDistance,
        averageSpeed,
        positions,
        latOrigin,
        lonOrigin,
        latDest,
        lonDest,
        locality,
    } = props;
    return (
        <Fragment>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Total Time:</IonCardSubtitle>
                    <TimerView totalTime={totalTime}/>
                </IonCardHeader>
                <IonCardContent>
                    <IonLabel>Start Time: {startTime}</IonLabel>
                    <div/>
                    <IonLabel>End Time: {endTime}</IonLabel>
                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Total Distance:</IonCardSubtitle>
                    <IonCardTitle>{Math.round(totalDistance * 100) / 100} m</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonLabel>Average Speed (m/s): {Math.round(averageSpeed * 100) /100} m/s</IonLabel>
                    <div/>
                    <IonLabel>Average Speed (km/h): {Math.round((averageSpeed * 3.6)*100) / 100} km/h</IonLabel>
                </IonCardContent>
            </IonCard>


            <MapView positions={positions} lat={latOrigin} lon={lonOrigin} latDest={latDest} lonDest={lonDest}
                     locality={locality}/>
        </Fragment>
    );
}
