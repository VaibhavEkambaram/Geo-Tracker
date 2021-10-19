export default function convertToSeconds(time: number){
    let h = (('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2));
    let hs = parseInt(h) * 3600;
    let m = ('0' + Math.floor(time / 6000)).slice(-2);
    let ms = parseInt(m) * 60;
    let s = ('0' + Math.floor((time / 100) % 60)).slice(-2);
    let ss = parseInt(s);
    let n = ('0' + Math.floor(time % 100)).slice(-2);
    let ns = parseInt(n) / 100;

    return hs + ms + ss + ns;
}
