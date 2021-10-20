import {IonCardTitle, IonIcon, IonItem} from "@ionic/react";
import React from "react";
import {bicycle, colorWand, pulse, walk} from "ionicons/icons";

/**
 * Secondary Timer Component, Just for Displaying the Clock View.
 * @param props time number
 */
export const TimerComponent = (props: {totalTime: number}) => {
    let {totalTime} = props; // Get totalTime Drop

    return (
        <IonCardTitle>
            {('0' + Math.floor((totalTime / (1000 * 60 * 60)) % 24)).slice(-2)}
            :{('0' + Math.floor(totalTime / 6000)).slice(-2)}
            :{('0' + Math.floor((totalTime / 100) % 60)).slice(-2)}
            :{('0' + Math.floor(totalTime % 100)).slice(-2)}
        </IonCardTitle>
    );
};

/**
 * Timer View Card. This includes the timer itself, as well as an icon to identify the activity.
 * @param props time number, type string
 * @constructor
 */
export function TimerView(props: { totalTime: number,type: string }) {
    let {totalTime, type} = props;

    // If auto detect type use the wand icon and add timer
    if(type==="Auto Detect") {
        return (
            <IonItem>
                <TimerComponent totalTime={totalTime}/>
                <IonIcon slot="end" icon={colorWand}/>
            </IonItem>
        );
    // If walking type then use the walking icon and add timer
    } else if(type==="Walking") {
        return (
            <IonItem>
                <TimerComponent totalTime={totalTime}/>
                <IonIcon slot="end" icon={walk}/>
            </IonItem>
        );
    // If running type then use the pulse icon and add timer
    } else if(type==="Running"){
        return (
            <IonItem>
                <TimerComponent totalTime={totalTime}/>
                <IonIcon slot="end" icon={pulse}/>
            </IonItem>
        );
    // If cycling type then use the bicycle icon and add timer
    } else if(type==="Cycling"){
        return (
            <IonItem>
                <TimerComponent totalTime={totalTime}/>
                <IonIcon slot="end" icon={bicycle}/>
            </IonItem>
        );
    // Otherwise, if no valid types are inputted, just return null.     
    } else {
        return null;
    }
}
