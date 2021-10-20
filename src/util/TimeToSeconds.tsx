/**
 * Utility method to convert clock time to seconds
 * @param time time in seconds
 */
export default function convertToSeconds(time: number) {
    return (((Math.floor((time / (1000 * 60 * 60)) % 24))) * 3600) +
        ((Math.floor(time / 6000)) * 60) +
        ((Math.floor((time / 100) % 60))) +
        ((Math.floor(time % 100)) / 100);
}
