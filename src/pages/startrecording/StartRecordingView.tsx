import {useHistory} from "react-router-dom";
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage, IonProgressBar,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import React from "react";

export function StartRecordingView(props: {activityType: any,startProgressBar: any, startRecordingButtonHandler: any }) {
    let {activityType, startProgressBar, startRecordingButtonHandler} = props;
    let history = useHistory();
    return (
        <IonPage>
            {/* Header and Back Button */}
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Start Recording</IonTitle>
                    <IonButton slot="start" onClick={(e) => {
                        e.preventDefault();
                        history.goBack();
                    }}>
                        <IonIcon icon={arrowBack}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Start Recording</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* Main Info Card Button */}
                <IonCard>
                    <IonCardContent>
                        <IonCardTitle>Click the button below to begin recording.</IonCardTitle>
                        <IonCardSubtitle>Recording will begin after a 3 second countdown.</IonCardSubtitle>
                        <br/>
                        <IonCardSubtitle>Your Selected Activity: {activityType}</IonCardSubtitle>

                        <br/>
                        {/* Progress Bar */}
                        <IonProgressBar value={startProgressBar}/><br/>
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            startRecordingButtonHandler();
                        }}>Start Recording Activity</IonButton>
                    </IonCardContent>
                </IonCard>
                {/* Advisory Notice */}
                <IonCard>
                    <IonCardContent>
                        <IonCardSubtitle>If you would like to change your activity selection, then please use the back
                            button to return to the previous screen.</IonCardSubtitle>
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    );
}
