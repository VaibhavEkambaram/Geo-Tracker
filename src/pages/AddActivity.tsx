import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddActivity.css';
import {useHistory} from "react-router-dom";
import {arrowBack, bicycle, colorWand, pulse, walk} from "ionicons/icons";
import React from "react";


const AddActivity: React.FC = () => {
    let history = useHistory();


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Activity</IonTitle>

                    <IonButton slot="start" onClick={(e) => {
                        // Passes favourite information to AddFavourite
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

                <IonCard onClick={(e) => {
                    e.preventDefault();
                    history.push("/StartRecording");
                }}>
                        <IonItem>
                            <IonCardTitle>Auto Detect</IonCardTitle>
                            <IonIcon slot="end" icon={colorWand}/>
                        </IonItem>
                </IonCard>

                <IonCard>
                        <IonItem>
                            <IonCardTitle>Walking</IonCardTitle>
                            <IonIcon slot="end" icon={walk}/>
                        </IonItem>
                </IonCard>

                <IonCard>
                        <IonItem>
                            <IonCardTitle>Running</IonCardTitle>
                            <IonIcon slot="end" icon={pulse}/>
                        </IonItem>
                </IonCard>

                <IonCard>
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
