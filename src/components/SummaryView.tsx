import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel} from "@ionic/react";
import {TimerView} from "./TimerView";
import {MapView} from "./MapView";
import React, {Fragment} from "react";
import {Line} from 'react-chartjs-2';

/**
 * Activity Summary View.
 * This is shown when viewing the summary screen, or when viewing an individual activity.
 * @param props properties inherited from the summary or view screens
 */
export function SummaryView(props: { totalTime: any, startTime: any, endTime: any, totalDistance: any, averageSpeed: any, positions: any, latOrigin: any, lonOrigin: any, latDest: any, lonDest: any, locality: any, altitudes: any, type: any }) {
    let {totalTime, startTime, endTime, totalDistance, averageSpeed, positions, latOrigin, lonOrigin, latDest, lonDest, locality, altitudes, type,} = props;

    // Compute the number of labels required for the altitude bar chart
    let altitudeLabels = [];
    for (let i = 0; i <= altitudes.length; i++) {
        altitudeLabels.push(i);
    }

    // Information for the altitude bar chart
    const barChartData = {
        labels: altitudeLabels,
        datasets: [
            {
                label: 'Altitude',
                backgroundColor: 'rgba(139,195,74,1)',
                borderColor: 'rgba(139,195,74,1)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(139,195,74,1)',
                hoverBorderColor: 'rgba(139,195,74,1)',
                data: altitudes,
            }
        ]
    };
    return (
        <Fragment>
            {/* Time Card */}
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Total Time:</IonCardSubtitle>
                    <TimerView totalTime={totalTime} type={type}/>
                </IonCardHeader>
                <IonCardContent>
                    <IonLabel>Start Time: {startTime}</IonLabel>
                    <div/>
                    <IonLabel>End Time: {endTime}</IonLabel>
                </IonCardContent>
            </IonCard>

            {/* Distance and Speed Card */}
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Total Distance:</IonCardSubtitle>
                    <IonCardTitle>{Math.round(totalDistance * 100) / 100} m</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonLabel>Average Speed (m/s): {Math.round(averageSpeed * 100) / 100} m/s</IonLabel>
                    <div/>
                    <IonLabel>Average Speed (km/h): {Math.round((averageSpeed * 3.6) * 100) / 100} km/h</IonLabel>
                </IonCardContent>
            </IonCard>

            {/* Map */}
            <MapView positions={positions} lat={latOrigin} lon={lonOrigin} latDest={latDest} lonDest={lonDest}
                     locality={locality}/>

            {/* Altitude Line Chart */}
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Altitude</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <Line data={barChartData} options={{maintainAspectRatio: true}}/>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </Fragment>
    );
}
