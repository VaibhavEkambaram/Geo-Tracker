import React from "react";
import {useHistory} from "react-router-dom";
import {IonButton, IonCard, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {arrowBack, bicycle, colorWand, pulse, walk} from "ionicons/icons";

/**
 * Add Activity Screen.
 */
const AddActivity: React.FC = () => {
    // History prop for navigation
    let history = useHistory();

    return (
        <IonPage>
            {/* Viewport Header */}
            <IonHeader>
                <IonToolbar>
                    {/* Title and Back Button */}
                    <IonTitle>Add Activity</IonTitle>
                    <IonButton slot="start" onClick={(e) => {
                        // Return to the previous screen if the back button has been pressed
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
                        <IonTitle size="large">Add Activity</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {/* Auto Detect Card */}
                <IonCard onClick={(e) => {
                    // Go to start recording screen in auto detect mode
                    e.preventDefault();
                    history.push({pathname: "/StartRecording", state: "Auto Detect"})
                }}>
                    <IonItem>
                        <IonCardTitle>Auto Detect</IonCardTitle>
                        <IonIcon slot="end" icon={colorWand}/>
                    </IonItem>
                </IonCard>

                {/* Walking */}
                <IonCard onClick={(e) => {
                    // Go to start recording screen in walking mode
                    e.preventDefault();
                    history.push({pathname: "/StartRecording", state: "Walking"})
                }}>
                    <IonItem>
                        <IonCardTitle>Walking</IonCardTitle>
                        <IonIcon slot="end" icon={walk}/>
                    </IonItem>
                </IonCard>

                {/* Running */}
                <IonCard onClick={(e) => {
                    // Go to start recording screen in running mode
                    e.preventDefault();
                    history.push({pathname: "/StartRecording", state: "Running"})
                }}>
                    <IonItem>
                        <IonCardTitle>Running</IonCardTitle>
                        <IonIcon slot="end" icon={pulse}/>
                    </IonItem>
                </IonCard>

                {/* Cycling */}
                <IonCard onClick={(e) => {
                    // Go to start recording screen in cycling mode
                    e.preventDefault();
                    history.push({pathname: "/StartRecording", state: "Cycling"})
                }}>
                    <IonItem>
                        <IonCardTitle>Cycling</IonCardTitle>
                        <IonIcon slot="end" icon={bicycle}/>
                    </IonItem>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AddActivity;
