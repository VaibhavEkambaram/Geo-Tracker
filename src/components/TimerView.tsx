import {IonCardTitle, IonItem} from "@ionic/react";
import React from "react";

export function TimerView(props: { totalTime: number }) {
    let {totalTime} = props;
    return (
        <IonItem>
            <IonCardTitle>
                {('0' + Math.floor((totalTime / (1000 * 60 * 60)) % 24)).slice(-2)}
                :{('0' + Math.floor(totalTime / 6000)).slice(-2)}
                :{('0' + Math.floor((totalTime / 100) % 60)).slice(-2)}
                :{('0' + Math.floor(totalTime % 100)).slice(-2)}
            </IonCardTitle>
        </IonItem>
    );
}
