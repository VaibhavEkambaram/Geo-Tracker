import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import {MapContainer, Polyline, TileLayer, useMap} from "react-leaflet";
import React from "react";


export class MapView extends React.Component<{ positions: any, lat: number, lon: number }> {
    render() {
        let {positions, lat, lon} = this.props;

        if(lat!=0 && lon!=0){
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
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline color={'blue'} positions={positions}/>
                        </MapContainer>
                    </IonCardContent>
                </IonCard>

            )
        } else {
            return null;
        }



    }
}

