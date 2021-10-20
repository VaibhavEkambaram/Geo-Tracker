import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader, IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {Storage} from "@ionic/storage";
import {LatLng, latLng} from "leaflet";
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from "@ionic-native/native-geocoder";
import TimeToSeconds from "../../util/TimeToSeconds";
import {SummaryView} from "../../components/SummaryView";

interface ActivityInformation {
    index: number;
    key: number;
    startingTime: string,
    endingTime: string;
    totalTime: number;
    totalDistance: number;
    type: string,
    locations: LocationSnippet[];
}


interface LocationSnippet {
    latitude: number;
    longitude: number;
    altitude: number;
}

const Summary: React.FC = () => {
    let history = useHistory<ActivityInformation>();
    const [stringToSet, setStringToSet] = useState("");
    const [activityType, setActivityType] = useState("");


    // Positions states
    const [positions, setPositions] = useState<LatLng[]>([]);
    const [latOrigin, setLatOrigin] = useState(0);
    const [lonOrigin, setLonOrigin] = useState(0);
    const [latDest, setLatDest] = useState(0);
    const [lonDest, setLonDest] = useState(0);
    const [locality, setLocality] = useState("");

    const [altitudes, setAltitudes] = useState<number[]>([]);


    // Time states
    const [totalTime, setTotalTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    // Distance and Speed
    const [totalDistance, setTotalDistance] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);

    let type;


    let totalActivityTime;
    const saveInformation = async (activityToBeAdded: ActivityInformation) => {
        const store = new Storage();
        await store.create();

        let arr = JSON.parse(await store.get("storedActivities"))
        activityToBeAdded.index = (arr.length);
        arr.unshift(activityToBeAdded)
        setStringToSet(JSON.stringify(arr));
    }

    async function executeSave() {
        const store = new Storage();
        await store.create();
        await store.set("storedActivities", stringToSet);
    }

    useIonViewWillEnter(() => {
        totalActivityTime = history.location.state.totalTime
        setTotalTime(totalActivityTime)
        saveInformation(history.location.state);
        setActivityType(history.location.state.type);

        // Time
        // @ts-ignore
        setStartTime(new Date(history.location.state.startingTime).toLocaleString());
        // @ts-ignore
        setEndTime(new Date(history.location.state.endingTime).toLocaleString());
        setTotalTime(history.location.state.totalTime);

        setActivityType(history.location.state.type);

        // Speed and Distance
        setTotalDistance(history.location.state.totalDistance);
        calculateAverageSpeed(history.location.state);

        // Map Information
        calculateMapPositions(history.location.state);
        calculateGeocode(history.location.state);
    });

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Summary</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Summary</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Actions</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            executeSave();
                            history.push("/tab2");
                        }}>Save Activity</IonButton>
                        <IonButton expand="block" onClick={(e) => {
                            e.preventDefault();
                            history.push("/tab1");
                        }}>Discard Activity</IonButton>
                    </IonCardContent>
                </IonCard>


                <SummaryView totalTime={totalTime} startTime={startTime} endTime={endTime} totalDistance={totalDistance}
                             averageSpeed={averageSpeed} positions={positions} latOrigin={latOrigin}
                             lonOrigin={lonOrigin} latDest={latDest} lonDest={lonDest} locality={locality} altitudes={altitudes} type={activityType}/>


            </IonContent>
        </IonPage>
    );
};

export default Summary;
