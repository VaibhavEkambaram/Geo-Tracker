import {useIonViewWillEnter} from '@ionic/react';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {StartRecordingView} from "./StartRecordingView";

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
        <StartRecordingView activityType={activityType} startProgressBar={startProgressBar} startRecordingButtonHandler={startRecordingButtonHandler}/>
    );
};

export default StartRecording;
