import React from "react";
import {useIonAlert} from '@ionic/react';
import {Storage} from "@ionic/storage";
import {SettingsView} from "./SettingsView";

/**
 * Settings Screen - I did not really implement much here apart from the delete all activities button and about cards.
 */
const Settings: React.FC = () => {
    // Alert presenter state
    const [present] = useIonAlert();

    /**
     * Show warning message when the delete button for this activity has been pressed.
     * @param key key of the current activity
     * @param e event handler
     */
    const deleteThisActivity = async (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        present({
            header: 'Deleting All Activities!',
            message: 'Are you sure you want to delete all activities?',
            buttons: [
                'Cancel',
                {text: 'Delete', handler: () => executeDelete(e)},
            ],
        })
    }

    /**
     * Function to actually delete the activity instance. Once deleted from Ionic storage, the app returns to the Activity List screen.
     * @param key key of the current activity
     * @param e event handler
     */
    const executeDelete = async (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        // Get stored activity JSON file from storage
        const store = new Storage();
        await store.create();

        // Convert updated array to string and update Ionic storage
        await store.set("storedActivities", "[]");
    }

    return (
        <SettingsView deleteThisActivity={deleteThisActivity}/>
    );
};

export default Settings;
