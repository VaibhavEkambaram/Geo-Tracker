
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonProgressBar,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {arrowBack} from "ionicons/icons";


const StartRecording: React.FC = () => {

    let history = useHistory();
    const [startProgressBar, setStartProgressBar] = useState(0);

    useIonViewWillEnter(() => {
        setStartProgressBar(0);
    });

    async function startRecordingButtonHandler() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStartProgressBar(0.333);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStartProgressBar(0.666);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStartProgressBar(0.999);
        history.push("/activeRecording");
    }


    return (
        <IonPage>
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

                <IonCard>
                    <IonCardContent>
                        <IonCardTitle>Click the button below to begin recording.</IonCardTitle>
                        <IonCardSubtitle>Recording will begin after a 3 second countdown.</IonCardSubtitle>
                        <br/>
                        <IonProgressBar value={startProgressBar}/><br/>
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            startRecordingButtonHandler();
                        }}>Start Recording Activity</IonButton>
                    </IonCardContent>
                </IonCard>

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
