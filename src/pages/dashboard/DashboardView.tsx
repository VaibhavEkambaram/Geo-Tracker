import {
    IonBadge, IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {LastActivity} from "../../components/LastActivity";
import React from "react";
import {useHistory} from "react-router-dom";

/**
 * Dashboard View.
 */
export function DashboardView(props: { dailyTime: any, dailyDistance: any, trendsTime: any, trendsDistance: any, entities: any }) {
    let {dailyTime, dailyDistance, trendsTime, trendsDistance, entities} = props;

    let history = useHistory();
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
}
