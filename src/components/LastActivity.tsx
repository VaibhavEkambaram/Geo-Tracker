import React from "react";
import {IonCard, IonCardSubtitle, IonCardTitle, IonIcon, IonItem} from "@ionic/react";
import {help} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {TimerView} from "./TimerView";

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

                <TimerView totalTime={entities[0].totalTime} type={entities[0].type}/>
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
