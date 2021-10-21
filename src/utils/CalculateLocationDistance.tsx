export default function CalculateLocationDistance(firstLat: number, firstLon: number, secondLat: number, secondLon: number) {
    const v1 = secondLat * Math.PI / 180;
    const v2 = firstLat * Math.PI / 180;
    const v3 = (firstLat - secondLat) * Math.PI / 180;
    const v4 = (firstLon - secondLon) * Math.PI / 180;

    const a = Math.sin(v3 / 2) * Math.sin(v3 / 2) + Math.cos(v1) * Math.cos(v2) * Math.sin(v4 / 2) * Math.sin(v4 / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (6371e3 * c);
}
