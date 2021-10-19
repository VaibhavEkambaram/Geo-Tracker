import {IonCard, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {help, walk, warning} from "ionicons/icons";
import React from "react";
import {useHistory} from "react-router-dom";

export function LastActivity(props: { entities: any }) {
    let {entities} = props;
    let history = useHistory();


    if (entities.length > 0) {
        return (
            <IonCard onClick={(e) => {
                e.preventDefault();
                history.push({
                    pathname: '/ActivityView',
                    state: entities[0].key,

                })
            }}>


                <IonItem>
                    <IonCardTitle>{('0' + Math.floor((entities[0].totalTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                        :{('0' + Math.floor(entities[0].totalTime / 6000)).slice(-2)}
                        :{('0' + Math.floor((entities[0].totalTime / 100) % 60)).slice(-2)}
                        :{('0' + Math.floor(entities[0].totalTime % 100)).slice(-2)}</IonCardTitle>
                    <IonIcon slot="end" icon={walk}/>
                </IonItem>
                <IonItem>
                    <IonCardSubtitle>{new Date(entities[0].startingTime).toLocaleString()}</IonCardSubtitle>
                </IonItem>
            </IonCard>
        );
    } else {
        return (
            <IonCard>
                <IonItem>
                    <IonCardTitle>No Activities Recorded</IonCardTitle>
                    <IonIcon slot="end" icon={help}/>
                </IonItem>

            </IonCard>
        );
    }


}
