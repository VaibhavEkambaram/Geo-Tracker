import {LocationInterface} from "./LocationInterface";

/**
 * Instance used to parse activity information.
 */
export interface ActivityInformation {
    index: number;
    key: number;
    startingTime: string,
    endingTime: string;
    totalTime: number;
    totalDistance: number;
    type: string,
    locations: LocationInterface[];
}
