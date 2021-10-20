import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon, IonPage,
    IonTitle,
    IonToolbar, useIonAlert, useIonViewWillEnter
} from '@ionic/react';
import {useHistory} from "react-router-dom";
import {arrowBack} from "ionicons/icons";
import React, {useState} from "react";
import {LatLng, latLng} from "leaflet";
import {Storage} from "@ionic/storage";
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder';
import TimeToSeconds from '../../util/TimeToSeconds';
import {SummaryView} from '../../components/SummaryView';

/**
 * Shows Information about an Activity
 * @constructor
 */
const ActivityView: React.FC = () => {
    // History navigation state
    let history = useHistory();
    // Alert presenter state
    const [present] = useIonAlert();

    // Activity Instance Key
    const [key, setKey] = useState(0);
    const [activityType, setActivityType] = useState("");


    // Positions states
    const [positions, setPositions] = useState<LatLng[]>([]);
    const [altitudes, setAltitudes] = useState<number[]>([]);

    const [latOrigin, setLatOrigin] = useState(0);
    const [lonOrigin, setLonOrigin] = useState(0);
    const [latDest, setLatDest] = useState(0);
    const [lonDest, setLonDest] = useState(0);
    const [locality, setLocality] = useState("");

    // Time states
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [totalTime, setTotalTime] = useState(0);

    // Distance and Speed
    const [totalDistance, setTotalDistance] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);

    /**
     * Get key from previous activity list state.
     */
    useIonViewWillEnter(() => {
        let key = history.location.state;
        if (key !== undefined) {
            if (typeof key === "number") {
                setKey(key);
                setActivityInformation(key);
            }
        }
    });

    /**
     * Get the activity information from Ionic storage, and then set all relevant fields.
     * @param key epoch based key of the activity we want to retrieve
     */
    const setActivityInformation = async (key: number) => {
        const store = new Storage();
        await store.create();
        const name = await store.get('storedActivities');

        let arr = JSON.parse(name)
        let index = 0;

        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].key) === key) index = i;
        }

        setActivityType(arr[index].activityType);

        // Time
        setStartTime(new Date(arr[index].startingTime).toLocaleString());
        setEndTime(new Date(arr[index].endingTime).toLocaleString());
        setTotalTime(arr[index].totalTime);
        setActivityType(arr[index].type);

        // Speed and Distance
        setTotalDistance(arr[index].totalDistance);
        calculateAverageSpeed(arr[index]);

        // Map Information
        calculateMapPositions(arr[index]);
        calculateGeocode(arr[index]);
    }

    /**
     * Calculate average speed from the total distance and total time.
     * @param activityInstance instance with all the activity information
     */
    const calculateAverageSpeed = (activityInstance: { totalTime: number; totalDistance: number; }) => {
        let cumulativeSeconds = TimeToSeconds(activityInstance.totalTime);
        let avgSpeed = activityInstance.totalDistance / cumulativeSeconds;
        setAverageSpeed(avgSpeed);
    }

    /**
     * Calculate map positions for OpenStreetMap viewer.
     * @param activityInstance instance with all the activity information
     */
    const calculateMapPositions = (activityInstance: { locations: string | any[]; }) => {
        let positionArray = [];
        let altitudeArray = [];

        for (let i = 0; i < activityInstance.locations.length; i++) {
            if (i === 0) {
                setLatOrigin(activityInstance.locations[i].latitude)
                setLonOrigin(activityInstance.locations[i].longitude)
            } else {
                if (i === (activityInstance.locations.length - 1)) {
                    setLatDest(activityInstance.locations[i].latitude)
                    setLonDest(activityInstance.locations[i].longitude)
                }
            }
            positionArray.push(latLng(activityInstance.locations[i].latitude, activityInstance.locations[i].longitude));

            altitudeArray.push(activityInstance.locations[i].altitude);
        }
        setPositions(positionArray);
        setAltitudes(altitudeArray);
    }

    /**
     * Get geocode from the starting location and set the locality to the resulting string.
     * @param activityInstance instance with all the activity information
     */
    const calculateGeocode = (activityInstance: { locations: { latitude: number, longitude: number }[]; }) => {
        // Geocode options
        let options: NativeGeocoderOptions = {useLocale: true, maxResults: 1};
        // Retrieve geocode string from lat/long locations
        NativeGeocoder.reverseGeocode(activityInstance.locations[0].latitude, activityInstance.locations[0].longitude, options)
            .then((result: NativeGeocoderResult[]) => setLocality(result[0].subLocality + ", " + result[0].locality))
            .catch((error: any) => console.log("Geocode is only supported on Android and iOS"));
    }

    /**
     * Show warning message when the delete button for this activity has been pressed.
     * @param key key of the current activity
     * @param e event handler
     */
    const deleteThisActivity = async (key: number, e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        present({
            header: 'Deleting Activity!',
            message: 'Are you sure you want to delete this activity?' +
                ' Once this activity has been removed it can NOT be recovered.' +
                ' After deletion, you will be returned to the My Activities Screen',
            buttons: [
                'Cancel',
                {text: 'Delete', handler: () => executeDelete(key, e)},
            ],
        })
    }

    /**
     * Function to actually delete the activity instance. Once deleted from Ionic storage, the app returns to the Activity List screen.
     * @param key key of the current activity
     * @param e event handler
     */
    const executeDelete = async (key: number, e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        // Get stored activity JSON file from storage
        const store = new Storage();
        await store.create();
        const name = await store.get('storedActivities');

        // parse JSON file
        let arr = JSON.parse(name)

        // Retrieve index of activity to delete
        let index = 0;

        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].key) === key) {
                index = i;
            }
        }

        // Remove current activity using the found index
        arr.splice(index, 1);

        // Convert updated array to string and update Ionic storage
        let updatedString = JSON.stringify(arr);
        await store.set("storedActivities", updatedString);

        // Return to the previous screen
        e.preventDefault();
        history.goBack();
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>View Activity</IonTitle>
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
                        <IonTitle size="large">View Activity</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <SummaryView totalTime={totalTime} startTime={startTime} endTime={endTime} totalDistance={totalDistance}
                             averageSpeed={averageSpeed} positions={positions} latOrigin={latOrigin}
                             lonOrigin={lonOrigin} latDest={latDest} lonDest={lonDest} locality={locality} altitudes={altitudes} type={activityType}/>


                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Actions</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={(e) => {
                            deleteThisActivity(key, e)
                        }}>Delete Activity</IonButton>


                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default ActivityView;
