import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import React from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

export class MapView extends React.Component<{ positions: any, lat: number, lon: number, latDest: number, lonDest: number, locality: string }> {
    render() {
        let {positions, lat, lon, locality, latDest, lonDest} = this.props;

        if (lat !== 0 && lon !== 0 && ((latDest === 0 && lonDest === 0) || (lat===latDest && lon===lonDest) )) {
            return (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Map</IonCardTitle>
                        <IonCardSubtitle>{locality}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent style={{height: "50vh", paddingInlineEnd: "3vw"}}>
                        <MapContainer whenCreated={(map) =>
                            setInterval(() => {
                                map.invalidateSize();
                            }, 0)
                        } style={{height: "100%", width: "100%"}} center={[lat, lon]} zoom={50}
                                      scrollWheelZoom={false}>
                            <TileLayer
                                attribution={' <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline color={'blue'} positions={positions}/>
                            <Marker position={[lat, lon]}
                                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                <Popup>
                                    Starting Position
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </IonCardContent>
                </IonCard>

            )
        } else if (lat !== 0 && lon !== 0 && latDest !== 0 && lonDest !== 0) {
            return (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Map</IonCardTitle>
                        <IonCardSubtitle>{locality}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent style={{height: "50vh", paddingInlineEnd: "3vw"}}>
                        <MapContainer whenCreated={(map) =>
                            setInterval(() => {
                                map.invalidateSize();
                            }, 0)
                        } style={{height: "100%", width: "100%"}} center={[lat, lon]} zoom={50}
                                      scrollWheelZoom={false}>
                            <TileLayer
                                attribution={' <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline color={'blue'} positions={positions}/>
                            <Marker position={[lat, lon]}
                                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                <Popup>
                                    Starting Position
                                </Popup>
                            </Marker>
                            <Marker position={[latDest, lonDest]}
                                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                <Popup>
                                    Ending Position
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </IonCardContent>
                </IonCard>

            )
        } else {

            if(locality==="none"){
                console.log("this one + " +  lat + " " + lon);
                return (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Map</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent style={{height: "50vh", paddingInlineEnd: "3vw"}}>
                            <MapContainer whenCreated={(map) =>
                                setInterval(() => {
                                    map.invalidateSize();
                                }, 0)
                            } style={{height: "100%", width: "100%"}} center={[lat, lon]} zoom={50}
                                          scrollWheelZoom={false}>
                                <TileLayer
                                    attribution={' <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        </IonCardContent>
                    </IonCard>
                );
            } else {
                return null;
            }
        }
    }
}

