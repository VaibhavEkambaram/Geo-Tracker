import {useHistory} from "react-router-dom";
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
    IonToolbar
} from "@ionic/react";
import React from "react";
import {ActivitySummaryView} from "../../components/ActivitySummaryView";

export function SummaryView(props: {executeSave: any,totalTime: any, startTime: any, endTime: any, totalDistance: any, averageSpeed: any, positions: any, latOrigin: any, lonOrigin: any, latDest: any, lonDest: any,locality: any, altitudes: any, activityType: any }) {
    let {executeSave, totalTime, startTime, endTime, totalDistance, averageSpeed, positions, latOrigin, lonOrigin, latDest, lonDest, locality, altitudes, activityType} = props;
    let history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Summary</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Summary</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* Save or discard card */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Actions</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            executeSave();
                            history.push("/activitylist");
                        }}>Save Activity</IonButton>
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            history.push("/dashboard");
                        }}>Discard Activity</IonButton>
                    </IonCardContent>
                </IonCard>
                {/* Defer to summary view by passing down information */}
                <ActivitySummaryView totalTime={totalTime} startTime={startTime} endTime={endTime} totalDistance={totalDistance}
                             averageSpeed={averageSpeed} positions={positions} latOrigin={latOrigin}
                             lonOrigin={lonOrigin} latDest={latDest} lonDest={lonDest} locality={locality}
                             altitudes={altitudes} type={activityType}/>
            </IonContent>
        </IonPage>
    );
}
