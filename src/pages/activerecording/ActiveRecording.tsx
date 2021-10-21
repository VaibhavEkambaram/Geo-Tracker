import {
    useIonViewWillEnter,
    useIonViewDidLeave
} from '@ionic/react';
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Geolocation} from '@ionic-native/geolocation';
import {Insomnia} from '@ionic-native/insomnia';
import TimeToSeconds from '../../utils/TimeToSeconds';
import {LocationInterface} from "../../models/LocationInterface";
import CalculateLocationDistance from "../../utils/CalculateLocationDistance";
import {ActiveRecordingView} from "./ActiveRecordingView";

/**
 * Record Activity Screen.
 */
const ActiveRecording: React.FC = () => {
    // History navigation prop
    let history = useHistory();

    // States for Information to collect
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [altitude, setAltitude] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [locations, setLocations] = useState<Array<LocationInterface>>([]);

    // States for Timer
    const [time, setTime] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [timerStatus, setTimerStatus] = useState(false);

    // Timer RXJS subject
    const timerSubscription = new Subject();

    // Location detection options
    const options = {enableHighAccuracy: true, timeout: 1000, maximumAge: 0};

    // Type of activity (dictates the icon used on the timer view box)
    let type = history.location.state + "";

    /**
     * On entering reset all relevant states
     */
    useIonViewWillEnter(() => {
        Insomnia.keepAwake(); // Activate insomnia plugin to keep the screen awake and not sleep
        setLatitude(0);
        setLongitude(0);
        setAltitude(0);
        setTotalDistance(0);
        setAverageSpeed(0);

        setLocations([]);
        // get start date at this time
        setStartDate(new Date().toString());

        // start the timer
        handleTimerReset();
        handleTimerStart();
    });

    // On leaving perform some cleanup work
    useIonViewDidLeave(() => {
        Insomnia.allowSleepAgain(); // Disable to insomnia plugin to allow the device to sleep again
        timerSubscription.unsubscribe();
    });

    /**
     * Get the users location as well as performing some calculations such as distance and speed.
     */
    const getLocation = async () => {
        // Get location using Cordova/Capacitor plugin
        const coordinates = await Geolocation.getCurrentPosition(options);

        let newDistance = 0;
        // Calculate distance covered by the last coordinate change
        if (latitude !== 0 && longitude !== 0) {
            newDistance = totalDistance + CalculateLocationDistance(coordinates.coords.latitude, coordinates.coords.longitude, latitude, longitude);
            setTotalDistance(newDistance);
        }

        // Calculate speed
        let cumulativeSeconds = TimeToSeconds(time);
        let avgSpeed = newDistance / cumulativeSeconds;
        setAverageSpeed(avgSpeed);

        // Create location instance object for easy storage
        let locationInstance: LocationInterface = {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
            altitude: coordinates.coords.altitude,
        }

        // Altitude override if no data is available
        if (coordinates.coords.altitude === null) {
            locationInstance.altitude = 0;
        }

        // Add information to their relative states
        let arr = locations;
        arr.push(locationInstance);
        setLocations(arr);


        setLatitude(locationInstance.latitude)
        setLongitude(coordinates.coords.longitude)
        setAltitude(locationInstance.altitude)

    };

    /**
     * Timer Method, Runs the System Stopwatch.
     * Note: This may have a bug in some situations where the timer fails to maintain accurate time.
     * Unfortunately I am not too sure what could be the cause of this.
     */
    useEffect(() => {
        interval(10)
            .pipe(takeUntil(timerSubscription))
            .subscribe(() => {
                if (timerStatus) {
                    setTime(time + 1);
                    // perform a GPS check every 3 seconds on the timer
                    if ((Math.floor((time / 100) % 60) % 3 === 0 && (Math.floor(time % 100)) === 0)) {
                        getLocation();
                    }
                }
            });
        return () => {
            timerSubscription.next(1)
            timerSubscription.complete();
        };
    }, [getLocation, time, timerStatus, timerSubscription]);

    /**
     * Start Timer Assist Function.
     */
    const handleTimerStart = () => {
        setTimerStatus(prevState => !prevState);
    }

    /**
     * Resume Timer Assist Function.
     */
    const handleTimerResume = () => {
        handleTimerStart();
    }

    /**
     * Stop Timer Assist Function.
     */
    const handleTimerStop = () => {
        if (time !== 0) setTimerStatus(false);
    }

    /**
     * Reset Timer Assist Function.
     */
    const handleTimerReset = () => {
        setTime(0);
        setTimerStatus(false);
    }

    return (
        <ActiveRecordingView time={time} type={type} latitude={latitude} longitude={longitude} altitude={altitude}
                             totalDistance={totalDistance} averageSpeed={averageSpeed}
                             handleTimerResume={handleTimerResume} getLocation={getLocation}
                             handleTimerStop={handleTimerStop} startDate={startDate} locations={locations}/>
    );
};

export default ActiveRecording;
