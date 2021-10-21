import React from "react";
import {IonCard, IonCardSubtitle, IonCardTitle, IonIcon, IonItem} from "@ionic/react";
import {help} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {TimerView} from "./TimerView";

/**
 * Last Activity Screen for the Dashboard VView
 * @param props entities - entities array
 */
export function LastActivity(props: { entities: any }) {
    let {entities} = props; // entities array
    let history = useHistory(); // history navigation prop

    // If there exists at least one entry in the entities list, then show the most recent one
    if (entities.length > 0) {
        return (
        <IonCard onClick={(e) => {
                e.preventDefault();
                history.push({
                    pathname: '/Activity',
                    state: entities[0].key,
                })
            }}>
            {/* When clicking the card, transition to the relevant activity view */}

            {/* Use TimerView to show the time and activity type */}
            <TimerView totalTime={entities[0].totalTime} type={entities[0].type}/>
                <IonItem>
                    {/* Show activity starting time */}
                    <IonCardSubtitle>{new Date(entities[0].startingTime).toLocaleString()}</IonCardSubtitle>
                </IonItem>
            </IonCard>
        );
    // If no recorded activities exist, then show a messaging stating the lack of activities
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
