import {IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonProgressBar, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {arrowBack} from "ionicons/icons";

/**
 * Pre-recording screen where recording can be started.
 */
const StartRecording: React.FC = () => {

    // History prop for navigation
    let history = useHistory();

    // State to track progress bar
    const [startProgressBar, setStartProgressBar] = useState(0);
    // State to assign activity type
    const [activityType, setActivityType] = useState("");

    // When entering this page then set the activity type sent in from the add activity screen, and reset progress bar
    useIonViewWillEnter(() => {
        // @ts-ignore
        setActivityType(history.location.state);
        setStartProgressBar(0);
    });

    /**
     * Handler function to increment the countdown loading screen.
     */
    async function startRecordingButtonHandler() {
        // wait 1 second and add 1/3rd to the progress bar
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStartProgressBar(0.333);
        // wait 1 second and add another 1/3rd to the progress bar
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStartProgressBar(0.666);
        // wait second and add another 1/3rd to the progress bar
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStartProgressBar(0.999);
        // transition to the active recording screen, this will start the recording.
        history.push({pathname: "/activeRecording", state: activityType});
    }

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
};

export default StartRecording;
